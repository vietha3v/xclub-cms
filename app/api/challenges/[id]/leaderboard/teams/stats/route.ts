import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const challengeId = params.id;
  const endpoint = `/api/challenges/${challengeId}/leaderboard/teams/stats`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy thống kê bảng xếp hạng team thất bại');
}
