import connectToDatabase from '../../../../src/lib/mongodb';
import User from '../../../../src/models/User';
import bcrypt from 'bcryptjs';
import { successResponse, errorResponse } from '../../../../src/lib/response';

export async function POST(request) {
  try {
    await connectToDatabase();
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return errorResponse("Name, email, and password are required", 400);
    }

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
