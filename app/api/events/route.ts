import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const endpoint = `/api/events${queryString ? `?${queryString}` : ''}`;
    
    const result = await callBackendApi(request, endpoint);
    return createNextResponse(result, 'Lấy danh sách sự kiện thất bại');
  } catch (error) {
    console.error('Get events error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi lấy danh sách sự kiện' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await callBackendApi(request, '/api/events', {
      method: 'POST',
      body,
    });
    return createNextResponse(result, 'Tạo sự kiện thất bại');
  } catch (error) {
    console.error('Create event error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi tạo sự kiện' },
      { status: 500 }
    );
  }
}