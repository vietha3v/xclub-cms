import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  try {
    // Lấy user ID từ token (sẽ được xử lý bởi middleware)
    const result = await callBackendApi(request, '/api/users/me', {
      method: 'GET',
    });
    
    return createNextResponse(result, 'Failed to fetch profile');
  } catch (error) {
    console.error('Error in user profile route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await callBackendApi(request, '/api/users/me', {
      method: 'PUT',
      body,
    });
    
    return createNextResponse(result, 'Failed to update profile');
  } catch (error) {
    console.error('Error in user profile update route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
