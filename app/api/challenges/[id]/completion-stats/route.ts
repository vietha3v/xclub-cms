import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const endpoint = `/api/challenges/${id}/completion-stats`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy thống kê hoàn thành thử thách thất bại');
}
