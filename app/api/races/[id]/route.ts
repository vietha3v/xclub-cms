import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const result = await callBackendApi(request, `/api/races/${id}`);
    return createNextResponse(result, 'Lấy thông tin giải chạy thất bại');
  } catch (error) {
    console.error('Get race detail error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi lấy thông tin giải chạy' },
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
    const result = await callBackendApi(request, `/api/races/${id}`, {
      method: 'PATCH',
      body,
    });
    return createNextResponse(result, 'Cập nhật giải chạy thất bại');
  } catch (error) {
    console.error('Update race error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi cập nhật giải chạy' },
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
    const result = await callBackendApi(request, `/api/races/${id}`, {
      method: 'DELETE',
    });
    return createNextResponse(result, 'Xóa giải chạy thất bại');
  } catch (error) {
    console.error('Delete race error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi xóa giải chạy' },
      { status: 500 }
    );
  }
}