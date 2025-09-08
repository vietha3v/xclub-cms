import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const endpoint = `/api/events/my-events${queryString ? `?${queryString}` : ''}`;
    
    const result = await callBackendApi(request, endpoint);
    return createNextResponse(result, 'Lấy danh sách sự kiện của tôi thất bại');
    
  } catch (error) {
    console.error('My events API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
}
