import { rooms } from '../../../../src/data/rooms';
import { successResponse } from '../../../../src/lib/response';
import { withErrorHandler } from '../../../../src/middleware/errorHandler';

export const GET = withErrorHandler(async (request) => {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  
  const filtered = rooms.filter(r => 
    r.title?.toLowerCase().includes(q) || r.location?.toLowerCase().includes(q)
  );
  
  return successResponse(filtered);
});
