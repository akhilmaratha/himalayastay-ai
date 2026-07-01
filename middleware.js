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

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
