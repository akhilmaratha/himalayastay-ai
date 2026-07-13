import connectToDatabase from '../../../../src/lib/mongodb';
import User from '../../../../src/models/User';
import bcrypt from 'bcryptjs';
import { successResponse, errorResponse } from '../../../../src/lib/response';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    // Validate with Zod
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.errors[0].message, 400);
    }

    const { name, email, password } = validationResult.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse("User already exists", 409);
    }

    // Check if this is the first user
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? 'admin' : 'user';

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const userObj = newUser.toObject();
    delete userObj.password;

    return successResponse(userObj, 201);
  } catch (error) {
    console.error("Register Error:", error);
    return errorResponse("Internal server error", 500);
  }
}
