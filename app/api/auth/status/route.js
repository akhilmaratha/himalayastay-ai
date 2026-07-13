import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getToken } from 'next-auth/jwt';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_for_development_only'
);

export async function GET(request) {
  try {
    // Check Custom JWT
    const customToken = request.cookies.get('token')?.value;
    if (customToken) {
      try {
        await jwtVerify(customToken, JWT_SECRET);
        return NextResponse.json({ isAuthenticated: true });
      } catch (error) {
        // ignore and fallback to NextAuth
      }
    }

    // Check NextAuth token
    const nextAuthToken = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (nextAuthToken) {
      return NextResponse.json({ isAuthenticated: true });
    }

    return NextResponse.json({ isAuthenticated: false });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false });
  }
}
