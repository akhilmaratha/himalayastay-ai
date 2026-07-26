import connectToDatabase from '../../../../src/lib/mongodb';
import Booking from '../../../../src/models/Booking';
import { successResponse, errorResponse } from '../../../../src/lib/response';
import { withErrorHandler } from '../../../../src/middleware/errorHandler';

export const PUT = withErrorHandler(async (request, { params }) => {
  await connectToDatabase();
  const { id } = params;
  const body = await request.json();
  
  const updatedBooking = await Booking.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  if (!updatedBooking) {
    return errorResponse("Booking not found", 404);
  }
  return successResponse(updatedBooking);
});

export const DELETE = withErrorHandler(async (request, { params }) => {
  await connectToDatabase();
  const { id } = params;
  
  const deletedBooking = await Booking.findByIdAndDelete(id);
  if (!deletedBooking) {
    return errorResponse("Booking not found", 404);
  }
  return successResponse({ message: "Booking deleted successfully" });
});
