import connectToDatabase from '../../../src/lib/mongodb';
import Review from '../../../src/models/Review';
import { successResponse, errorResponse } from '../../../src/lib/response';
import { withErrorHandler } from '../../../src/middleware/errorHandler';

export const GET = withErrorHandler(async () => {
  await connectToDatabase();
  const reviews = await Review.find({});
  return successResponse(reviews);
});

export const POST = withErrorHandler(async (request) => {
  await connectToDatabase();
  const body = await request.json();
  const { roomId, user, comment, rating } = body;
  
  if (!roomId || !user || !comment || !rating) {
    return errorResponse("Missing required fields", 400);
  }
  
  const newReview = await Review.create(body);
  return successResponse(newReview, 201);
});
