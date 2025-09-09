import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const endpoint = `/api/challenges/${id}/leave`;
  
  const result = await callBackendApi(request, endpoint, {
    method: 'POST',
  });
  
  return createNextResponse(result, 'Rút lui khỏi thử thách thất bại');
}
