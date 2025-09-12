import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const endpoint = `/api/challenges/${id}/publish`;
  
  const result = await callBackendApi(request, endpoint, {
    method: 'POST',
  });
  
  return createNextResponse(result, 'Publish thử thách thất bại');
}
