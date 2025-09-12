import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ challengeCode: string }> }
) {
  const { challengeCode } = await params;
  const endpoint = `/api/challenges/code/${challengeCode}`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy thử thách theo mã thất bại');
}
