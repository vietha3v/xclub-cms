import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  try {
    const result = await callBackendApi(request, '/api/clubs/my-clubs');
    return createNextResponse(result, 'Không thể lấy danh sách CLB của bạn');
    
  } catch (error) {
    console.error('My clubs API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi lấy danh sách CLB' },
      { status: 500 }
    );
  }
}
