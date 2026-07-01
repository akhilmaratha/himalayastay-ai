import connectToDatabase from '../../../src/lib/mongodb';
import Booking from '../../../src/models/Booking';
import { successResponse, errorResponse } from '../../../src/lib/response';
import { withErrorHandler } from '../../../src/middleware/errorHandler';

export const GET = withErrorHandler(async () => {
  await connectToDatabase();
  const bookings = await Booking.find({});
  return successResponse(bookings);
});

export const POST = withErrorHandler(async (request) => {
  await connectToDatabase();
  const body = await request.json();
  const { roomId, user, dates } = body;
  
  if (!roomId || !user || !dates) {
    return errorResponse("Missing required fields", 400);
  }
  
  const newBooking = await Booking.create(body);
  return successResponse(newBooking, 201);
});
