import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function POST(request: NextRequest) {
  try {
    const endpoint = '/api/activities/stats/sync';
    
    const result = await callBackendApi(request, endpoint);
    return createNextResponse(result, 'Đồng bộ thống kê thất bại');
    
  } catch (error) {
    console.error('Sync Stats API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
}
