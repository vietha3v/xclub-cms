import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const result = await callBackendApi(request, `/api/clubs/${id}`);
    return createNextResponse(result, 'Lấy thông tin CLB thất bại');
  } catch (error) {
    console.error('Get club detail error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi lấy thông tin CLB' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const result = await callBackendApi(request, `/api/clubs/${id}`, {
      method: 'PUT',
      body,
    });
    return createNextResponse(result, 'Cập nhật CLB thất bại');
  } catch (error) {
    console.error('Update club error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi cập nhật CLB' },
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
    const result = await callBackendApi(request, `/api/clubs/${id}`, {
      method: 'DELETE',
    });
    return createNextResponse(result, 'Xóa CLB thất bại');
  } catch (error) {
    console.error('Delete club error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi xóa CLB' },
      { status: 500 }
    );
  }
}