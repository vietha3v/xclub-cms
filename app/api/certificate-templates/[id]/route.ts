import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const result = await callBackendApi(request, `/api/certificate-templates/${params.id}`);
  return createNextResponse(result, 'Lấy thông tin mẫu giấy chứng nhận thất bại');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  
  const result = await callBackendApi(request, `/api/certificate-templates/${params.id}`, {
    method: 'PUT',
    body,
  });
  
  return createNextResponse(result, 'Cập nhật mẫu giấy chứng nhận thất bại');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const result = await callBackendApi(request, `/api/certificate-templates/${params.id}`, {
    method: 'DELETE',
  });
  
  return createNextResponse(result, 'Xóa mẫu giấy chứng nhận thất bại');
}
