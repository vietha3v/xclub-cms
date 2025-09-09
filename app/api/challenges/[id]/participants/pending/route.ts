import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const endpoint = `/api/challenges/${id}/participants/pending`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy danh sách người tham gia chờ duyệt thất bại');
}
