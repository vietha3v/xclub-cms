import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const limit = searchParams.get('limit') || '10';
    
    if (!q) {
      return NextResponse.json(
        { error: 'Từ khóa tìm kiếm không được để trống' }, 
        { status: 400 }
      );
    }
    
    const endpoint = `/api/clubs/search?q=${q}&limit=${limit}`;
    const result = await callBackendApi(request, endpoint);
    return createNextResponse(result, 'Tìm kiếm CLB thất bại');
    
  } catch (error) {
    console.error('Clubs search API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server' }, 
      { status: 500 }
    );
  }
}
