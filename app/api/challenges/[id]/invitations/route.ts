import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const challengeId = params.id;
  const endpoint = `/api/challenges/${challengeId}/invitations`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy danh sách lời mời thử thách thất bại');
}
