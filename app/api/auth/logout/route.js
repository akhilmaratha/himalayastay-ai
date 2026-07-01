import { successResponse } from '../../../../src/lib/response';
import { cookies } from 'next/headers';

export async function POST() {
  (await cookies()).delete('token');
  return successResponse({ success: true, message: "Logged out successfully" });
}
