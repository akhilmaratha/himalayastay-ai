import { bookings } from '../../../src/data/bookings';
import { successResponse } from '../../../src/lib/response';
import { withErrorHandler } from '../../../src/middleware/errorHandler';

export const GET = withErrorHandler(async () => {
  return successResponse(bookings);
});
