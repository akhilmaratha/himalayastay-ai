import { rooms } from '../../../src/data/rooms';
import { successResponse, errorResponse } from '../../../src/lib/response';
import { withErrorHandler } from '../../../src/middleware/errorHandler';

export const GET = withErrorHandler(async () => {
  return successResponse(rooms);
});

export const POST = withErrorHandler(async (request) => {
  const body = await request.json();
  const { title, location, price } = body;
  
  if (!title || !location || !price) {
    return errorResponse("Missing required fields", 400);
  }
  
  const newRoom = { id: String(Date.now()), ...body };
  rooms.push(newRoom);
  return successResponse(newRoom, 201);
});
