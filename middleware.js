import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getToken } from 'next-auth/jwt';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_for_development_only'
);

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Helper to check for a valid session from either custom JWT or NextAuth
  async function getSessionRole() {
    // Check Custom JWT
    const customToken = request.cookies.get('token')?.value;
    if (customToken) {
      try {
        const { payload } = await jwtVerify(customToken, JWT_SECRET);
        return payload.role;
      } catch (error) {
        // ignore and fallback to NextAuth
      }
    }

    // Check NextAuth token
    const nextAuthToken = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (nextAuthToken) {
      return nextAuthToken.role;
    }

    return null;
  }
  
  // Protect all /admin routes except /admin/login
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const role = await getSessionRole();

    if (!role) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
      
    // Check if user is admin
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
      
    return NextResponse.next();
  }

  // Prevent logged-in users from accessing the login page again
  if (path === '/admin/login') {
    const role = await getSessionRole();
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // API Route Protection
  if (path.startsWith('/api/') && !path.startsWith('/api/auth')) {
    // Keep GET public where appropriate (rooms, reviews)
    const isPublicGet = request.method === 'GET' && (path.startsWith('/api/rooms') || path.startsWith('/api/reviews'));

    if (!isPublicGet) {
      const role = await getSessionRole();

      if (!role) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // Protect Admin APIs (Secure POST, PUT, DELETE for rooms/upload)
      const isAdminApi = path.startsWith('/api/rooms') || path.startsWith('/api/upload');
      if (isAdminApi && ['POST', 'PUT', 'DELETE'].includes(request.method)) {
        if (role !== 'admin') {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
      }
    }
  }

  // Frontend Protected Routes
  const isProtectedFrontendRoute = 
    path.startsWith('/dashboard') || 
    path.startsWith('/rooms') || 
    path.startsWith('/bookings') ||
    path.startsWith('/booking');

  if (isProtectedFrontendRoute) {
    const role = await getSessionRole();

    if (!role) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*', 
    '/api/:path*', 
    '/dashboard/:path*', 
    '/rooms/:path*', 
    '/bookings/:path*',
    '/booking/:path*'
  ],
};
