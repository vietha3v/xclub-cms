import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi } from '@/lib/backend-api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await callBackendApi(request, '/api/integrations/sync/strava', {
      method: 'POST',
      body,
    });
    
    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }
  } catch (error) {
    console.error('Error in strava sync route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
