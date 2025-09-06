import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source') || 'strava'; // Mặc định dùng Strava
    const queryString = searchParams.toString();
    const endpoint = `/api/activities/stats${queryString ? `?${queryString}` : ''}`;
    
    const result = await callBackendApi(request, endpoint);
    return createNextResponse(result, 'Lấy thống kê hoạt động thất bại');
    
  } catch (error) {
    console.error('Activity Stats API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
}