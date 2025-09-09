import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const challengeId = params.id;
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const endpoint = `/api/challenges/${challengeId}/leaderboard/teams/top${queryString ? `?${queryString}` : ''}`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy top teams thất bại');
}
