import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from '@/lib/backend-api';
import { mockActivities } from '@/data/mockData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const endpoint = `/api/activities${queryString ? `?${queryString}` : ''}`;
    
    try {
      const result = await callBackendApi(request, endpoint);
      return createNextResponse(result, 'Lấy danh sách hoạt động thất bại');
    } catch (backendError) {
      // Fallback to mock data when backend is not available
      console.log('Backend not available, using mock data');
      
      // Parse query parameters for filtering
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '20');
      const search = searchParams.get('search') || '';
      const type = searchParams.get('type') || '';
      const status = searchParams.get('status') || '';
      const source = searchParams.get('source') || '';
      
      // Transform mock data to match Activity interface
      const transformedActivities = mockActivities.map(activity => ({
        id: activity.id,
        activityCode: `MOCK_${activity.id}`,
        name: activity.route,
        description: activity.notes,
        type: 'Run',
        sportType: 'Run',
        status: 'synced',
        visibility: 'private',
        isPublic: false,
        userId: activity.userId,
        source: 'mock',
        sourceActivityId: activity.id,
        lastSyncedAt: activity.createdAt,
        uploadId: null,
        clubId: null,
        challengeId: null,
        eventId: null,
        raceId: null,
        startTime: activity.createdAt,
        endTime: new Date(new Date(activity.createdAt).getTime() + activity.duration * 1000).toISOString(),
        duration: activity.duration.toString(),
        elapsedTime: activity.duration,
        distance: activity.distance.toString(),
        averageSpeed: (activity.distance / (activity.duration / 3600)).toFixed(2),
        averagePace: activity.pace.toString(),
        maxSpeed: null,
        averageHeartRate: null,
        maxHeartRate: null,
        calories: activity.calories.toString(),
        elevationGain: null,
        totalElevationGain: '0.00',
        elevationLoss: null,
        maxElevation: null,
        minElevation: null,
        startLatitude: null,
        startLongitude: null,
        endLatitude: null,
        endLongitude: null,
        startLocation: activity.location,
        endLocation: activity.location,
        gpsData: null,
        heartRateData: null,
        speedData: null,
        elevationData: null,
        cadenceData: null,
        powerData: null,
        weather: activity.weather,
        temperature: null,
        humidity: null,
        windSpeed: null,
        roadCondition: null,
        equipment: null,
        gearId: null,
        kilojoules: null,
        averageWatts: null,
        maxWatts: null,
        weightedAverageWatts: null,
        manual: false,
        private: false,
        flagged: false,
        workoutType: null,
        notes: activity.notes,
        tags: null,
        settings: null,
        metadata: null,
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
        createdAt: activity.createdAt,
        updatedAt: activity.createdAt
      }));

      // Filter transformed data
      let filteredActivities = transformedActivities;
      
      if (search) {
        filteredActivities = filteredActivities.filter(activity => 
          activity.name?.toLowerCase().includes(search.toLowerCase()) ||
          activity.startLocation?.toLowerCase().includes(search.toLowerCase()) ||
          activity.notes?.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      if (type) {
        filteredActivities = filteredActivities.filter(activity => 
          activity.type === type
        );
      }
      
      if (status) {
        filteredActivities = filteredActivities.filter(activity => 
          activity.status === status
        );
      }
      
      if (source) {
        filteredActivities = filteredActivities.filter(activity => 
          activity.source === source
        );
      }
      
      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedActivities = filteredActivities.slice(startIndex, endIndex);
      
      return NextResponse.json({
        data: paginatedActivities,
        total: filteredActivities.length,
        page,
        limit,
        totalPages: Math.ceil(filteredActivities.length / limit)
      });
    }
    
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