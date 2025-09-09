import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { invitationId: string } }
) {
  const invitationId = params.invitationId;
  const endpoint = `/api/challenges/invitations/${invitationId}`;
  
  const result = await callBackendApi(request, endpoint);
  return createNextResponse(result, 'Lấy thông tin lời mời thất bại');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { invitationId: string } }
) {
  const invitationId = params.invitationId;
  const endpoint = `/api/challenges/invitations/${invitationId}`;
  
  const result = await callBackendApi(request, endpoint, {
    method: 'DELETE',
  });
  
  if (result.success) {
    return new NextResponse(null, { status: 204 });
  }
  
  return createNextResponse(result, 'Xóa lời mời thất bại');
}
