import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi } from '@/lib/backend-api';

export async function DELETE(request: NextRequest) {
  try {
    console.log('Strava disconnect API: Received request');
    
    const result = await callBackendApi(request, '/api/integrations/strava/disconnect', {
      method: 'DELETE',
    });
    
    console.log('Strava disconnect API: Backend result', result);
    
    if (result.success) {
      console.log('Strava disconnect API: Success');
      return NextResponse.json(result.data);
    } else {
      console.log('Strava disconnect API: Error from backend', result.error);
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }
  } catch (error) {
    console.error('Error in strava disconnect route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
