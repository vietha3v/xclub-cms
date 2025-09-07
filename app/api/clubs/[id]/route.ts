import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clubId = params.id;
    const result = await callBackendApi(request, `/api/clubs/${clubId}`);
    return createNextResponse(result, 'Lấy thông tin CLB thất bại');
  } catch (error) {
    console.error('Error fetching club:', error);
    return NextResponse.json(
      { error: 'Failed to fetch club' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clubId = params.id;
    const body = await request.json();
    
    const result = await callBackendApi(request, `/api/clubs/${clubId}`, {
      method: 'PUT',
      body,
    });

    return createNextResponse(result, 'Cập nhật CLB thất bại');
  } catch (error) {
    console.error('Error updating club:', error);
    return NextResponse.json(
      { error: 'Failed to update club' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clubId = params.id;
    
    const result = await callBackendApi(request, `/api/clubs/${clubId}`, {
      method: 'DELETE',
    });

    return createNextResponse(result, 'Xóa CLB thất bại');
  } catch (error) {
    console.error('Error deleting club:', error);
    return NextResponse.json(
      { error: 'Failed to delete club' },
      { status: 500 }
    );
  }
}