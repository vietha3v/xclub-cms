import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi } from '@/lib/backend-api';

export async function POST(request: NextRequest) {
  try {
    console.log('Strava callback API: Received request');
    
    // Debug headers
    const authHeader = request.headers.get('authorization');
    console.log('Strava callback API: Auth header', authHeader ? 'Present' : 'Missing');
    
    const body = await request.json();
    const { code, state } = body;
    
    console.log('Strava callback API: Body received', { code: !!code, state: !!state });
    
    // Validate required parameters
    if (!code || !state) {
      console.log('Strava callback API: Missing parameters');
      return NextResponse.json(
        { error: 'Missing required parameters: code and state' },
        { status: 400 }
      );
    }

    console.log('Strava callback API: Calling backend API');
    const result = await callBackendApi(request, '/api/integrations/strava/callback', {
      method: 'POST',
      body: { code, state },
    });
    
    console.log('Strava callback API: Backend result', result);
    
    if (result.success) {
      console.log('Strava callback API: Success, returning data');
      return NextResponse.json(result.data);
    } else {
      console.log('Strava callback API: Error from backend', result.error);
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }
  } catch (error) {
    console.error('Error in strava callback route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
