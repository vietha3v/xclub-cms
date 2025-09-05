import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  try {
    const result = await callBackendApi(request, '/api/clubs/stats');
    return createNextResponse(result, 'Lấy thống kê CLB thất bại');
    
  } catch (error) {
    console.error('Clubs stats API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
}
