import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; teamId: string } }
) {
  const { id: challengeId, teamId } = params;
  const endpoint = `/api/challenges/${challengeId}/teams/${teamId}/members`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy danh sách thành viên team thất bại');
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; teamId: string } }
) {
  const { id: challengeId, teamId } = params;
  const body = await request.json();
  
  const result = await callBackendApi(request, `/api/challenges/${challengeId}/teams/${teamId}/members`, {
    method: 'POST',
    body,
  });
  
  return createNextResponse(result, 'Thêm thành viên team thất bại');
}
