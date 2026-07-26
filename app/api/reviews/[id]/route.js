import connectToDatabase from '../../../../src/lib/mongodb';
import Review from '../../../../src/models/Review';
import { successResponse, errorResponse } from '../../../../src/lib/response';
import { withErrorHandler } from '../../../../src/middleware/errorHandler';

export const PUT = withErrorHandler(async (request, { params }) => {
  await connectToDatabase();
  const { id } = params;
  const body = await request.json();
  
  const updatedReview = await Review.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  if (!updatedReview) {
    return errorResponse("Review not found", 404);
  }
  return successResponse(updatedReview);
});

export const DELETE = withErrorHandler(async (request, { params }) => {
  await connectToDatabase();
  const { id } = params;
  
  const deletedReview = await Review.findByIdAndDelete(id);
  if (!deletedReview) {
    return errorResponse("Review not found", 404);
  }
  return successResponse({ message: "Review deleted successfully" });
});
