import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  
  const result = await callBackendApi(request, `/api/challenges/${id}/status`, {
    method: 'PATCH',
    body,
  });
  
  return createNextResponse(result, 'Thay đổi trạng thái thử thách thất bại');
}
