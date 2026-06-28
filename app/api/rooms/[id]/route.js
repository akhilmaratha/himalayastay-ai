import { rooms } from '../../../../src/data/rooms';
import { successResponse, errorResponse } from '../../../../src/lib/response';
import { withErrorHandler } from '../../../../src/middleware/errorHandler';

export const GET = withErrorHandler(async (request, { params }) => {
  const id = (await params).id;
  const room = rooms.find(r => r.id === id);
  if (!room) return errorResponse("Room not found", 404);
  return successResponse(room);
});

export const PUT = withErrorHandler(async (request, { params }) => {
  const id = (await params).id;
  const roomIndex = rooms.findIndex(r => r.id === id);
  if (roomIndex === -1) return errorResponse("Room not found", 404);
  
  const body = await request.json();
  rooms[roomIndex] = { ...rooms[roomIndex], ...body };
  return successResponse(rooms[roomIndex]);
});

export const DELETE = withErrorHandler(async (request, { params }) => {
  const id = (await params).id;
  const roomIndex = rooms.findIndex(r => r.id === id);
  if (roomIndex === -1) return errorResponse("Room not found", 404);
  
  rooms.splice(roomIndex, 1);
  return successResponse({ success: true });
});
