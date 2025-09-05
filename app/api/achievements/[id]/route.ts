import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const result = await callBackendApi(request, `/api/achievements/${id}`);
    return createNextResponse(result, 'Lấy thông tin thành tích thất bại');
  } catch (error) {
    console.error('Get achievement detail error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi lấy thông tin thành tích' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const result = await callBackendApi(request, `/api/achievements/${id}`, {
      method: 'PATCH',
      body,
    });
    return createNextResponse(result, 'Cập nhật thành tích thất bại');
  } catch (error) {
    console.error('Update achievement error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi cập nhật thành tích' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const result = await callBackendApi(request, `/api/achievements/${id}`, {
      method: 'DELETE',
    });
    return createNextResponse(result, 'Xóa thành tích thất bại');
  } catch (error) {
    console.error('Delete achievement error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi xóa thành tích' },
      { status: 500 }
    );
  }
}
