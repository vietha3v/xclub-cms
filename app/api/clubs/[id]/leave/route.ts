import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clubId } = await params;
    const body = await request.json();
    
    const result = await callBackendApi(request, `/api/clubs/${clubId}/leave`, {
      method: 'DELETE',
      body,
    });
    
    return createNextResponse(result, 'Rời CLB thất bại');
  } catch (error) {
    console.error('Leave club API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi rời CLB' },
      { status: 500 }
    );
  }
}
