import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const endpoint = `/api/races${queryString ? `?${queryString}` : ''}`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy danh sách giải chạy thất bại');
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const result = await callBackendApi(request, '/api/races', {
    method: 'POST',
    body,
  });
  
  return createNextResponse(result, 'Tạo giải chạy thất bại');
}