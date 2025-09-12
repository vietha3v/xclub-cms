import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const endpoint = `/api/challenges/${id}/join`;
  
  const result = await callBackendApi(request, endpoint, {
    method: 'POST',
    body,
  });
  
  return createNextResponse(result, 'Tham gia thử thách thất bại');
}
