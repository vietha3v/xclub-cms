import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; teamId: string; userId: string } }
) {
  const { id: challengeId, teamId, userId } = params;
  const endpoint = `/api/challenges/${challengeId}/teams/${teamId}/members/${userId}`;
  
  const result = await callBackendApi(request, endpoint, {
    method: 'DELETE',
  });
  
  if (result.success) {
    return new NextResponse(null, { status: 204 });
  }
  
  return createNextResponse(result, 'Xóa thành viên team thất bại');
}
