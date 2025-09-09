import { callBackendApi } from '@/lib/backend-api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return callBackendApi(request, `/api/challenges/${id}/publish`);
}
