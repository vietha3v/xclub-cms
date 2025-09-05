export interface Integration {
  id: string;
  userId: string;
  platform: 'strava' | 'garmin' | 'apple_health' | 'google_fit';
  status: 'connected' | 'disconnected' | 'error' | 'expired';
  accessToken?: string;
  refreshToken?: string;
  tokenExpiresAt?: Date;
  externalUserId?: string;
  profileData?: {
    name?: string;
    avatar?: string;
    totalActivities?: number;
    totalDistance?: number;
    totalTime?: number;
  };
  lastSyncTime?: Date;
  syncStatus?: 'active' | 'error' | 'syncing' | 'idle';
  syncSettings?: {
    autoSync: boolean;
    syncInterval: number; // minutes
    syncHistoryDays: number;
    syncActivities: boolean;
    syncProfile: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateIntegrationDto {
  platform: 'strava' | 'garmin' | 'apple_health' | 'google_fit';
  accessToken: string;
  refreshToken?: string;
  tokenExpiresAt?: Date;
  externalUserId?: string;
  profileData?: any;
}

export interface UpdateIntegrationDto {
  status?: 'connected' | 'disconnected' | 'error' | 'expired';
  accessToken?: string;
  refreshToken?: string;
  tokenExpiresAt?: Date;
  profileData?: any;
  syncSettings?: {
    autoSync?: boolean;
    syncInterval?: number;
    syncHistoryDays?: number;
    syncActivities?: boolean;
    syncProfile?: boolean;
  };
}

export interface QueryIntegrationDto {
  platform?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface IntegrationResponse {
  integrations: Integration[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SyncActivityDto {
  platform?: 'strava' | 'garmin';
  daysBack?: number;
  forceSync?: boolean;
}

export interface SyncActivityResponseDto {
  success: boolean;
  newActivities: number;
  updatedActivities: number;
  syncTime: string;
  duration: number;
  message: string;
  error?: string;
}

export interface ConnectIntegrationDto {
  platform: 'strava' | 'garmin';
  authorizationCode: string;
  state?: string;
}

export interface ConnectIntegrationResponseDto {
  success: boolean;
  integration: Integration;
  message: string;
  error?: string;
}
