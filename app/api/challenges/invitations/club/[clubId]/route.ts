import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { clubId: string } }
) {
  const clubId = params.clubId;
  const endpoint = `/api/challenges/invitations/club/${clubId}`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy danh sách lời mời của club thất bại');
}
