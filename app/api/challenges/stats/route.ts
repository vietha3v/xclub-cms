import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  const endpoint = '/api/challenges/stats';
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy thống kê thử thách thất bại');
}
