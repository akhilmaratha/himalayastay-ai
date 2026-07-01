import connectToDatabase from '../../../../src/lib/mongodb';
import User from '../../../../src/models/User';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { successResponse, errorResponse } from '../../../../src/lib/response';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_for_development_only'
);

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();

    if (!email || !password) {
      return errorResponse("Email and password are required", 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse("Invalid credentials", 401);
    }

    // Generate JWT token
    const token = await new SignJWT({
      id: user._id.toString(),
      role: user.role,
      email: user.email,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(JWT_SECRET);

    // Set HTTP-only cookie
    (await cookies()).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    const userObj = user.toObject();
    delete userObj.password;

    return successResponse(userObj, 200);
  } catch (error) {
    console.error("Login Error:", error);
    return errorResponse("Internal server error", 500);
  }
}
