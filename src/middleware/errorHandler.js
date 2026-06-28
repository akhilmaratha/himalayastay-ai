import { errorResponse } from '../lib/response';

export function withErrorHandler(handler) {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      console.error(error);
      return errorResponse("Internal Server Error", 500);
    }
  };
}
