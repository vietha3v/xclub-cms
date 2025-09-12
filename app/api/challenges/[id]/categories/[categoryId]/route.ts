import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; categoryId: string } }
) {
  const result = await callBackendApi(request, `/api/challenges/${params.id}/categories/${params.categoryId}`);
  return createNextResponse(result, 'Lấy thông tin danh mục thử thách thất bại');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; categoryId: string } }
) {
  const body = await request.json();
  
  const result = await callBackendApi(request, `/api/challenges/${params.id}/categories/${params.categoryId}`, {
    method: 'PUT',
    body,
  });
  
  return createNextResponse(result, 'Cập nhật danh mục thử thách thất bại');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; categoryId: string } }
) {
  const result = await callBackendApi(request, `/api/challenges/${params.id}/categories/${params.categoryId}`, {
    method: 'DELETE',
  });
  
  return createNextResponse(result, 'Xóa danh mục thử thách thất bại');
}
