import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const endpoint = `/api/events${queryString ? `?${queryString}` : ''}`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy danh sách sự kiện thất bại');
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const result = await callBackendApi(request, '/api/events', {
    method: 'POST',
    body,
  });
  
  return createNextResponse(result, 'Tạo sự kiện thất bại');
}

