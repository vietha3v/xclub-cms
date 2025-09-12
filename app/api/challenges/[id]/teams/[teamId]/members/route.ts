import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; teamId: string } }
) {
  const result = await callBackendApi(request, `/api/challenges/${params.id}/teams/${params.teamId}/members`);
  return createNextResponse(result, 'Lấy danh sách thành viên team thất bại');
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; teamId: string } }
) {
  const body = await request.json();
  const result = await callBackendApi(request, `/api/challenges/${params.id}/teams/${params.teamId}/members`, {
    method: 'POST',
    body,
  });
  return createNextResponse(result, 'Thêm thành viên team thất bại');
}
