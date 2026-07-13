import connectToDatabase from '../../../../src/lib/mongodb';
import User from '../../../../src/models/User';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { successResponse, errorResponse } from '../../../../src/lib/response';
import { cookies } from 'next/headers';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_for_development_only'
);

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    // Validate with Zod
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.errors[0].message, 400);
    }

    const { email, password } = validationResult.data;

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
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

    // Set HTTP-only cookie
    (await cookies()).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
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
