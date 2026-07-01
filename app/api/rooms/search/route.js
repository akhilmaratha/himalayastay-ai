import connectToDatabase from '../../../../src/lib/mongodb';
import Room from '../../../../src/models/Room';
import { successResponse } from '../../../../src/lib/response';
import { withErrorHandler } from '../../../../src/middleware/errorHandler';

export const GET = withErrorHandler(async (request) => {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  
  const regex = new RegExp(q, 'i');
  
  const filtered = await Room.find({
    $or: [
      { title: { $regex: regex } },
      { location: { $regex: regex } }
    ]
  });
  
  return successResponse(filtered);
});
