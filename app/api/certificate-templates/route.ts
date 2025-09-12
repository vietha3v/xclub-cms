import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const endpoint = `/api/certificate-templates${queryString ? `?${queryString}` : ''}`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy danh sách mẫu giấy chứng nhận thất bại');
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const result = await callBackendApi(request, '/api/certificate-templates', {
    method: 'POST',
    body,
  });
  
  return createNextResponse(result, 'Tạo mẫu giấy chứng nhận thất bại');
}
