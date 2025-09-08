import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const endpoint = `/api/events/${id}`;
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy thông tin sự kiện thất bại');
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const result = await callBackendApi(request, `/api/events/${id}`, {
    method: 'PATCH',
    body,
  });
  return createNextResponse(result, 'Cập nhật sự kiện thất bại');
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await callBackendApi(request, `/api/events/${id}`, {
    method: 'DELETE',
  });
  return createNextResponse(result, 'Xóa sự kiện thất bại');
}

