import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const result = await callBackendApi(request, '/api/auth/oauth/callback', {
    method: 'POST',
    body,
  });
  
  return createNextResponse(result, 'OAuth callback thất bại');
}
