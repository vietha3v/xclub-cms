import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> }
) {
  try {
    const { id: clubId, userId } = await params;
    const body = await request.json();
    
    const result = await callBackendApi(request, `/api/clubs/${clubId}/members/${userId}`, {
      method: 'PUT',
      body,
    });
    
    return createNextResponse(result, 'Cập nhật thành viên thất bại');
  } catch (error) {
    console.error('Update club member API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi cập nhật thành viên' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> }
) {
  try {
    const { id: clubId, userId } = await params;
    const body = await request.json();
    
    const result = await callBackendApi(request, `/api/clubs/${clubId}/members/${userId}`, {
      method: 'DELETE',
      body,
    });
    
    return createNextResponse(result, 'Xóa thành viên thất bại');
  } catch (error) {
    console.error('Remove club member API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi xóa thành viên' },
      { status: 500 }
    );
  }
}
