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
    const endpoint = `/api/clubs/${id}/members${queryString ? `?${queryString}` : ''}`;
    
    const result = await callBackendApi(request, endpoint);
    return createNextResponse(result, 'Lấy danh sách thành viên CLB thất bại');
  } catch (error) {
    console.error('Get club members error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi lấy danh sách thành viên CLB' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const result = await callBackendApi(request, `/api/clubs/${id}/members`, {
      method: 'POST',
      body,
    });
    return createNextResponse(result, 'Thêm thành viên CLB thất bại');
  } catch (error) {
    console.error('Add club member error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi thêm thành viên CLB' },
      { status: 500 }
    );
  }
}
