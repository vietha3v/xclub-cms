import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> }
) {
  try {
    const { id: clubId, userId } = await params;
    const body = await request.json();
    
    const result = await callBackendApi(request, `/api/clubs/${clubId}/members/${userId}/role`, {
      method: 'PUT',
      body,
    });
    
    return createNextResponse(result, 'Cập nhật vai trò thành viên thất bại');
  } catch (error) {
    console.error('Update member role API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi cập nhật vai trò thành viên' },
      { status: 500 }
    );
  }
}
