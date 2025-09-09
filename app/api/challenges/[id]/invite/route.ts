import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const challengeId = params.id;
  const body = await request.json();
  
  const result = await callBackendApi(request, `/api/challenges/${challengeId}/invite`, {
    method: 'POST',
    body,
  });
  
  return createNextResponse(result, 'Gửi lời mời thử thách thất bại');
}
