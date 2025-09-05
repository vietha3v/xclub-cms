import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const endpoint = `/api/api/activities/${id}`;
    
    const result = await callBackendApi(request, endpoint);
    return createNextResponse(result, 'Lấy thông tin hoạt động thất bại');
    
  } catch (error) {
    console.error('Get activity API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server' },
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
    
    const result = await callBackendApi(request, `/api/activities/${id}`, {
      method: 'PATCH',
      body,
    });
    
    return createNextResponse(result, 'Cập nhật hoạt động thất bại');
    
  } catch (error) {
    console.error('Update activity API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server' },
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
    
    const result = await callBackendApi(request, `/api/activities/${id}`, {
      method: 'DELETE',
    });
    
    return createNextResponse(result, 'Xóa hoạt động thất bại');
    
  } catch (error) {
    console.error('Delete activity API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
}