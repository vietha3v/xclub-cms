import { NextRequest, NextResponse } from 'next/server';
import { callBackendApi, createNextResponse } from './backend-api';

/**
 * Helper function để tạo API route cho user settings
 * @param endpoint - Backend endpoint (ví dụ: '/api/user/me/notifications')
 * @returns Object chứa GET và PUT handlers
 */
export function createUserSettingsRoute(endpoint: string) {
  return {
    async GET(request: NextRequest) {
      const result = await callBackendApi(request, endpoint, {
        method: 'GET',
      });
      
      return createNextResponse(result, 'Failed to fetch settings');
    },

    async PUT(request: NextRequest) {
      const body = await request.json();
      const result = await callBackendApi(request, endpoint, {
        method: 'PUT',
        body,
      });
      
      return createNextResponse(result, 'Failed to update settings');
    }
  };
}

/**
 * Helper function để tạo API route cho user profile
 * @param endpoint - Backend endpoint (ví dụ: '/api/user/me/profile')
 * @returns Object chứa GET và PUT handlers
 */
export function createUserProfileRoute(endpoint: string) {
  return {
    async GET(request: NextRequest) {
      const result = await callBackendApi(request, endpoint, {
        method: 'GET',
      });
      
      return createNextResponse(result, 'Failed to fetch profile');
    },

    async PUT(request: NextRequest) {
      const body = await request.json();
      const result = await callBackendApi(request, endpoint, {
        method: 'PUT',
        body,
      });
      
      return createNextResponse(result, 'Failed to update profile');
    }
  };
}

/**
 * Helper function để tạo API route cho CRUD operations
 * @param baseEndpoint - Backend base endpoint (ví dụ: '/api/clubs')
 * @param errorMessages - Custom error messages
 * @returns Object chứa GET, POST, PUT, DELETE handlers
 */
export function createCrudRoute(
  baseEndpoint: string, 
  errorMessages: {
    get?: string;
    post?: string;
    put?: string;
    delete?: string;
  } = {}
) {
  return {
    async GET(request: NextRequest) {
      const { searchParams } = new URL(request.url);
      const queryString = searchParams.toString();
      const endpoint = `${baseEndpoint}${queryString ? `?${queryString}` : ''}`;
      
      const result = await callBackendApi(request, endpoint, {
        method: 'GET',
      });
      
      return createNextResponse(result, errorMessages.get || 'Failed to fetch data');
    },

    async POST(request: NextRequest) {
      const body = await request.json();
      const result = await callBackendApi(request, baseEndpoint, {
        method: 'POST',
        body,
      });
      
      return createNextResponse(result, errorMessages.post || 'Failed to create data');
    },

    async PUT(request: NextRequest) {
      const body = await request.json();
      const result = await callBackendApi(request, baseEndpoint, {
        method: 'PUT',
        body,
      });
      
      return createNextResponse(result, errorMessages.put || 'Failed to update data');
    },

    async DELETE(request: NextRequest) {
      const result = await callBackendApi(request, baseEndpoint, {
        method: 'DELETE',
      });
      
      return createNextResponse(result, errorMessages.delete || 'Failed to delete data');
    }
  };
}

/**
 * Helper function để tạo API route cho resource với ID
 * @param baseEndpoint - Backend base endpoint (ví dụ: '/api/clubs')
 * @param errorMessages - Custom error messages
 * @returns Object chứa GET, PUT, DELETE handlers
 */
export function createResourceRoute(
  baseEndpoint: string,
  errorMessages: {
    get?: string;
    put?: string;
    delete?: string;
  } = {}
) {
  return {
    async GET(request: NextRequest, { params }: { params: { id: string } }) {
      const endpoint = `${baseEndpoint}/${params.id}`;
      const result = await callBackendApi(request, endpoint, {
        method: 'GET',
      });
      
      return createNextResponse(result, errorMessages.get || 'Failed to fetch resource');
    },

    async PUT(request: NextRequest, { params }: { params: { id: string } }) {
      const body = await request.json();
      const endpoint = `${baseEndpoint}/${params.id}`;
      const result = await callBackendApi(request, endpoint, {
        method: 'PUT',
        body,
      });
      
      return createNextResponse(result, errorMessages.put || 'Failed to update resource');
    },

    async DELETE(request: NextRequest, { params }: { params: { id: string } }) {
      const endpoint = `${baseEndpoint}/${params.id}`;
      const result = await callBackendApi(request, endpoint, {
        method: 'DELETE',
      });
      
      return createNextResponse(result, errorMessages.delete || 'Failed to delete resource');
    }
  };
}
