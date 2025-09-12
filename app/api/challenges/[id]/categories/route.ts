import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const endpoint = `/api/challenges/${params.id}/categories${queryString ? `?${queryString}` : ''}`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy danh sách danh mục thử thách thất bại');
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  
  const result = await callBackendApi(request, `/api/challenges/${params.id}/categories`, {
    method: 'POST',
    body,
  });
  
  return createNextResponse(result, 'Tạo danh mục thử thách thất bại');
}
