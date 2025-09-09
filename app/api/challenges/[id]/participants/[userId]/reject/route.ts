import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> }
) {
  const { id, userId } = await params;
  const endpoint = `/api/challenges/${id}/participants/${userId}/reject`;
  
  const result = await callBackendApi(request, endpoint, {
    method: 'POST',
  });
  
  return createNextResponse(result, 'Từ chối người tham gia thất bại');
}
