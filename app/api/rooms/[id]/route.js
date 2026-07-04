import mongoose from 'mongoose';
import connectToDatabase from '../../../../src/lib/mongodb';
import Room from '../../../../src/models/Room';
import { successResponse, errorResponse } from '../../../../src/lib/response';
import { withErrorHandler } from '../../../../src/middleware/errorHandler';

export const GET = withErrorHandler(async (request, { params }) => {
  await connectToDatabase();
  const id = (await params).id;
  
  try {
    let room;
    if (mongoose.Types.ObjectId.isValid(id)) {
      room = await Room.findById(id);
    } else {
      room = await Room.findOne({ slug: id });
    }
    if (!room) return errorResponse("Room not found", 404);
    return successResponse(room);
  } catch (err) {
    return errorResponse("Invalid Room ID or Slug", 400);
  }
});

export const PUT = withErrorHandler(async (request, { params }) => {
  await connectToDatabase();
  const id = (await params).id;
  const body = await request.json();
  
  try {
    const room = await Room.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!room) return errorResponse("Room not found", 404);
    return successResponse(room);
  } catch (err) {
    return errorResponse("Invalid update request", 400);
  }
});

export const PATCH = withErrorHandler(async (request, { params }) => {
  await connectToDatabase();
  const id = (await params).id;
  const body = await request.json();
  
  try {
    const room = await Room.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true });
    if (!room) return errorResponse("Room not found", 404);
    return successResponse(room);
  } catch (err) {
    return errorResponse("Invalid patch request", 400);
  }
});

export const DELETE = withErrorHandler(async (request, { params }) => {
  await connectToDatabase();
  const id = (await params).id;
  
  try {
    const room = await Room.findByIdAndDelete(id);
    if (!room) return errorResponse("Room not found", 404);
    return successResponse({ success: true });
  } catch (err) {
    return errorResponse("Invalid Room ID", 400);
  }
});
