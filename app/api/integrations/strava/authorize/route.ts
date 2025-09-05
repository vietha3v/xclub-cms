import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  try {
    const result = await callBackendApi(request, '/api/integrations/strava/authorize', {
      method: 'GET',
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
    console.error('Error in strava authorize route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
