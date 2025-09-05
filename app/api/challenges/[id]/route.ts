import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const endpoint = `/api/challenges/${params.id}`;
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy thông tin thử thách thất bại');
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const result = await callBackendApi(request, `/api/challenges/${params.id}`, {
    method: 'PATCH',
    body,
  });
  return createNextResponse(result, 'Cập nhật thử thách thất bại');
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const result = await callBackendApi(request, `/api/challenges/${params.id}`, {
    method: 'DELETE',
  });
  return createNextResponse(result, 'Xóa thử thách thất bại');
}

