import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const challengeId = params.id;
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const endpoint = `/api/challenges/${challengeId}/teams${queryString ? `?${queryString}` : ''}`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy danh sách teams thất bại');
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const challengeId = params.id;
  const body = await request.json();
  
  const result = await callBackendApi(request, `/api/challenges/${challengeId}/teams`, {
    method: 'POST',
    body,
  });
  
  return createNextResponse(result, 'Tạo team thất bại');
}
