import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clubId } = await params;
    const { searchParams } = new URL(request.url);
    const query = searchParams.toString();
    
    const result = await callBackendApi(request, `/api/clubs/${clubId}/members?${query}`);
    
    return createNextResponse(result, 'Lấy danh sách thành viên thất bại');
  } catch (error) {
    console.error('Get club members API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi lấy danh sách thành viên' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clubId } = await params;
    const body = await request.json();
    
    const result = await callBackendApi(request, `/api/clubs/${clubId}/members`, {
      method: 'POST',
      body,
    });
    
    return createNextResponse(result, 'Thêm thành viên thất bại');
  } catch (error) {
    console.error('Add club member API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi thêm thành viên' },
      { status: 500 }
    );
  }
}