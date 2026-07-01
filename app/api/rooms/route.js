import connectToDatabase from '../../../src/lib/mongodb';
import Room from '../../../src/models/Room';
import { successResponse, errorResponse } from '../../../src/lib/response';
import { withErrorHandler } from '../../../src/middleware/errorHandler';

export const GET = withErrorHandler(async () => {
  await connectToDatabase();
  const rooms = await Room.find({});
  return successResponse(rooms);
});

export const POST = withErrorHandler(async (request) => {
  await connectToDatabase();
  const body = await request.json();
  const { title, location, price } = body;
  
  if (!title || !location || !price) {
    return errorResponse("Missing required fields", 400);
  }
  
  const newRoom = await Room.create(body);
  return successResponse(newRoom, 201);
});
