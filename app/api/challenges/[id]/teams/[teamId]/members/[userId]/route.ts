import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; teamId: string; userId: string } }
) {
  const result = await callBackendApi(request, `/api/challenges/${params.id}/teams/${params.teamId}/members/${params.userId}`, {
    method: 'DELETE',
  });
  return createNextResponse(result, 'Xóa thành viên team thất bại');
}
