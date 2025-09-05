import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const endpoint = `/api/clubs/${id}/events${queryString ? `?${queryString}` : ''}`;
    
    const result = await callBackendApi(request, endpoint);
    return createNextResponse(result, 'Lấy danh sách sự kiện CLB thất bại');
  } catch (error) {
    console.error('Get club events error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi lấy danh sách sự kiện CLB' },
      { status: 500 }
    );
  }
}
