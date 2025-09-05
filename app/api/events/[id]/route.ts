import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const endpoint = `/api/events/${params.id}`;
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy thông tin sự kiện thất bại');
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const result = await callBackendApi(request, `/api/events/${params.id}`, {
    method: 'PATCH',
    body,
  });
  return createNextResponse(result, 'Cập nhật sự kiện thất bại');
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const result = await callBackendApi(request, `/api/events/${params.id}`, {
    method: 'DELETE',
  });
  return createNextResponse(result, 'Xóa sự kiện thất bại');
}

