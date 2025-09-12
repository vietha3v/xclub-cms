import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; teamId: string } }
) {
  const result = await callBackendApi(request, `/api/challenges/${params.id}/teams/${params.teamId}`);
  return createNextResponse(result, 'Lấy chi tiết team thất bại');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; teamId: string } }
) {
  const body = await request.json();
  const result = await callBackendApi(request, `/api/challenges/${params.id}/teams/${params.teamId}`, {
    method: 'PATCH',
    body,
  });
  return createNextResponse(result, 'Cập nhật team thất bại');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; teamId: string } }
) {
  const result = await callBackendApi(request, `/api/challenges/${params.id}/teams/${params.teamId}`, {
    method: 'DELETE',
  });
  return createNextResponse(result, 'Xóa team thất bại');
}
