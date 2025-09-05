import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const endpoint = `/api/activities${queryString ? `?${queryString}` : ''}`;
    
    const result = await callBackendApi(request, endpoint);
    return createNextResponse(result, 'Lấy danh sách hoạt động thất bại');
    
  } catch (error) {
    console.error('Activities API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
}

// POST method removed - Activities should only be created through integration sync
// Use /api/integrations/sync instead