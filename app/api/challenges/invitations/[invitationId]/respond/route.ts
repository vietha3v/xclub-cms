import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { invitationId: string } }
) {
  const invitationId = params.invitationId;
  const body = await request.json();
  
  const result = await callBackendApi(request, `/api/challenges/invitations/${invitationId}/respond`, {
    method: 'PATCH',
    body,
  });
  
  return createNextResponse(result, 'Phản hồi lời mời thất bại');
}
