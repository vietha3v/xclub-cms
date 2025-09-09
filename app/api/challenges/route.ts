import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const endpoint = `/api/challenges${queryString ? `?${queryString}` : ''}`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy danh sách thử thách thất bại');
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const result = await callBackendApi(request, '/api/challenges', {
    method: 'POST',
    body,
  });
  
  return createNextResponse(result, 'Tạo thử thách thất bại');
}

