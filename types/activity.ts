export interface Activity {
  id: string;
  activityCode: string;
  name: string;
  description?: string;
  type: ActivityType;
  sportType: string;
  status: ActivityStatus;
  visibility: ActivityVisibility;
  isPublic: boolean;
  userId: string;
  source: string;
  sourceActivityId: string;
  lastSyncedAt?: Date;
  startTime: Date;
  endTime?: Date;
  duration: number;
  elapsedTime: number;
  movingTime?: number;
  distance: number;
  averageSpeed?: number;
  maxSpeed?: number;
  averagePace?: number;
  averageHeartRate?: number;
  maxHeartRate?: number;
  calories?: number;
  elevationGain?: number;
  elevationLoss?: number;
  totalElevationGain?: number;
  maxElevation?: number;
  minElevation?: number;
  kilojoules?: number;
  averageWatts?: number;
  maxWatts?: number;
  weightedAverageWatts?: number;
  deviceWatts?: boolean;
  startLatitude?: number;
  startLongitude?: number;
  endLatitude?: number;
  endLongitude?: number;
  startLocation?: string;
  endLocation?: string;
  equipment?: string;
  gearId?: string;
  deviceName?: string;
  uploadId?: string;
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  roadCondition?: string;
  trainer?: boolean;
  commute?: boolean;
  manual?: boolean;
  private?: boolean;
  flagged?: boolean;
  workoutType?: number;
  gpsData?: any;
  heartRateData?: any;
  powerData?: any;
  cadenceData?: any;
  speedData?: any;
  elevationData?: any;
  weather?: any;
  challengeId?: string;
  eventId?: string;
  raceId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ActivityType {
  RUNNING = 'running',
  CYCLING = 'cycling',
  SWIMMING = 'swimming',
  WALKING = 'walking',
  HIKING = 'hiking',
  YOGA = 'yoga',
  WEIGHT_TRAINING = 'weight_training',
  OTHER = 'other'
}

export enum ActivityStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DRAFT = 'draft'
}

export enum ActivityVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  FRIENDS = 'friends',
  CLUB_ONLY = 'club_only'
}

export interface CreateActivityDto {
  name: string;
  description?: string;
  type: ActivityType;
  sportType: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  elapsedTime: number;
  movingTime?: number;
  distance: number;
  averageSpeed?: number;
  maxSpeed?: number;
  averagePace?: number;
  averageHeartRate?: number;
  maxHeartRate?: number;
  calories?: number;
  elevationGain?: number;
  elevationLoss?: number;
  totalElevationGain?: number;
  maxElevation?: number;
  minElevation?: number;
  kilojoules?: number;
  averageWatts?: number;
  maxWatts?: number;
  weightedAverageWatts?: number;
  deviceWatts?: boolean;
  startLatitude?: number;
  startLongitude?: number;
  endLatitude?: number;
  endLongitude?: number;
  startLocation?: string;
  endLocation?: string;
  equipment?: string;
  gearId?: string;
  deviceName?: string;
  uploadId?: string;
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  roadCondition?: string;
  trainer?: boolean;
  commute?: boolean;
  manual?: boolean;
  private?: boolean;
  flagged?: boolean;
  workoutType?: number;
  gpsData?: any;
  heartRateData?: any;
  powerData?: any;
  cadenceData?: any;
  speedData?: any;
  elevationData?: any;
  weather?: any;
  challengeId?: string;
  eventId?: string;
  raceId?: string;
}

export interface UpdateActivityDto extends Partial<CreateActivityDto> {
  status?: ActivityStatus;
  visibility?: ActivityVisibility;
  isPublic?: boolean;
}

export interface QueryActivityDto {
  page?: number;
  limit?: number;
  search?: string;
  type?: ActivityType;
  sportType?: string;
  status?: ActivityStatus;
  visibility?: ActivityVisibility;
  userId?: string;
  source?: string;
  startDate?: string;
  endDate?: string;
  minDistance?: number;
  maxDistance?: number;
  minDuration?: number;
  maxDuration?: number;
  challengeId?: string;
  eventId?: string;
  raceId?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface ActivityStats {
  totalActivities: number;
  totalDistance: number;
  totalDuration: number;
  totalCalories: number;
  averageDistance: number;
  averageDuration: number;
  averagePace: number;
  bestPace: number;
  longestDistance: number;
  longestDuration: number;
  activitiesByType: Record<ActivityType, number>;
  activitiesByMonth: Array<{
    month: string;
    count: number;
    distance: number;
    duration: number;
  }>;
  recentActivities: Activity[];
}

export interface ActivityResponse {
  activities: Activity[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
