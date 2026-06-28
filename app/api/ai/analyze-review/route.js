import { successResponse } from '../../../../src/lib/response';
import { withErrorHandler } from '../../../../src/middleware/errorHandler';

export const POST = withErrorHandler(async () => {
  return successResponse({
    sentiment: "Positive",
    category: "Hospitality",
    reply: "Thank you for your valuable feedback."
  });
});
