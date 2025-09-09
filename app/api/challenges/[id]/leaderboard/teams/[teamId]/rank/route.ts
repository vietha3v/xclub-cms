import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; teamId: string } }
) {
  const { id: challengeId, teamId } = params;
  const endpoint = `/api/challenges/${challengeId}/leaderboard/teams/${teamId}/rank`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy xếp hạng team thất bại');
}
