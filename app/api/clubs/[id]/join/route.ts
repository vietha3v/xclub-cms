import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clubId } = await params;
    const body = await request.json();
    
    const result = await callBackendApi(request, `/api/clubs/${clubId}/join`, {
      method: 'POST',
      body,
    });
    
    return createNextResponse(result, 'Tham gia CLB thất bại');
  } catch (error) {
    console.error('Join club API error:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi tham gia CLB' },
      { status: 500 }
    );
  }
}
