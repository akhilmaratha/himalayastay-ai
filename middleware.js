import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_for_development_only'
);

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Protect all /admin routes except /admin/login
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      
      // Check if user is admin
      if (payload.role !== 'admin') {
        // If not admin, redirect to home or login
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      
      // Allow request to proceed
      return NextResponse.next();
    } catch (error) {
      // Invalid token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Prevent logged-in users from accessing the login page again
  if (path === '/admin/login') {
    const token = request.cookies.get('token')?.value;
    if (token) {
      try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        if (payload.role === 'admin') {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      } catch (error) {
        // Just ignore and let them access login
      }
    }
  }

  // API Route Protection
  if (path.startsWith('/api/') && !path.startsWith('/api/auth')) {
    // Keep GET public where appropriate (rooms, reviews)
    const isPublicGet = request.method === 'GET' && (path.startsWith('/api/rooms') || path.startsWith('/api/reviews'));

    if (!isPublicGet) {
      const token = request.cookies.get('token')?.value;

      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        
        // Protect Admin APIs (Secure POST, PUT, DELETE for rooms/upload)
        const isAdminApi = path.startsWith('/api/rooms') || path.startsWith('/api/upload');
        if (isAdminApi && ['POST', 'PUT', 'DELETE'].includes(request.method)) {
          if (payload.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
          }
        }
      } catch (error) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
    } catch (error) {
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
