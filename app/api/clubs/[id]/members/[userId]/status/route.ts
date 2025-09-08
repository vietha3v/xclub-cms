import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> }
) {
  try {
    const { id: clubId, userId } = await params;
    const body = await request.json();
    
    const result = await callBackendApi(request, `/api/clubs/${clubId}/members/${userId}/status`, {
      method: 'PUT',
      body,
    });
    
    return createNextResponse(result, 'Cập nhật trạng thái thành viên thất bại');
  } catch (error) {
    console.error('Update member status API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi cập nhật trạng thái thành viên' },
      { status: 500 }
    );
  }
}
