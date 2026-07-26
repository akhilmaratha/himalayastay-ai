import { getServerSession } from "next-auth";
import connectToDatabase from '../../../src/lib/mongodb';
import User from '../../../src/models/User';
import { successResponse, errorResponse } from '../../../src/lib/response';
import { withErrorHandler } from '../../../src/middleware/errorHandler';

export const GET = withErrorHandler(async () => {
  await connectToDatabase();
  
  let user = null;
  try {
    const session = await getServerSession();
    if (session?.user?.email) {
      user = await User.findOne({ email: session.user.email });
    }
  } catch (e) {
    // Ignore session errors
  }
  
  if (!user) {
    // Fallback to first admin for testing without auth
    user = await User.findOne({ role: 'admin' });
    if (!user) {
      user = await User.findOne({});
    }
  }

  if (!user) {
    return successResponse({
      name: "Default Admin",
      firstName: "Default",
      lastName: "Admin",
      email: "admin@example.com",
      bio: "Add a bio here."
    });
  }

  const nameParts = user.name ? user.name.split(' ') : ['Admin', 'User'];
  
  return successResponse({
    id: user._id,
    name: user.name,
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    email: user.email,
    image: user.image,
    bio: user.bio || "Passionate about sharing the beauty of the Himalayas. Over 10 years of experience in boutique hospitality."
  });
});

export const PUT = withErrorHandler(async (request) => {
  await connectToDatabase();
  const body = await request.json();
  
  let userEmail = body.email;
  try {
    const session = await getServerSession();
    if (session?.user?.email) {
      userEmail = session.user.email;
    }
  } catch (e) {}

  if (!userEmail) {
    const admin = await User.findOne({ role: 'admin' });
    if (admin) userEmail = admin.email;
  }
  
  if (!userEmail) {
    return errorResponse("User not found to update", 404);
  }

  const updatedUser = await User.findOneAndUpdate(
    { email: userEmail },
    { 
      name: `${body.firstName || ''} ${body.lastName || ''}`.trim(),
      bio: body.bio
    },
    { new: true }
  );

  return successResponse(updatedUser);
});
