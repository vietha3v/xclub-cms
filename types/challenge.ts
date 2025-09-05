export interface Challenge {
  id: string;
  challengeCode: string;
  title: string;
  description?: string;
  type: ChallengeType;
  status: ChallengeStatus;
  clubId?: string;
  createdBy: string;
  startDate: string;
  endDate: string;
  targetDistance?: number;
  targetDuration?: number;
  targetActivities?: number;
  rules?: string;
  rewards?: string;
  imageUrl?: string;
  bannerUrl?: string;
  isPublic: boolean;
  maxParticipants?: number;
  currentParticipants: number;
  settings?: any;
  isDeleted: boolean;
  deletedAt?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export enum ChallengeType {
  DISTANCE = 'distance',
  DURATION = 'duration',
  ACTIVITIES = 'activities',
  STREAK = 'streak',
  CUSTOM = 'custom'
}

export enum ChallengeStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface QueryChallengeDto {
  page?: number;
  limit?: number;
  search?: string;
  type?: ChallengeType;
  status?: ChallengeStatus;
  clubId?: string;
  createdBy?: string;
  isPublic?: boolean;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface CreateChallengeDto {
  title: string;
  description?: string;
  type: ChallengeType;
  clubId?: string;
  startDate: string;
  endDate: string;
  targetDistance?: number;
  targetDuration?: number;
  targetActivities?: number;
  rules?: string;
  rewards?: string;
  imageUrl?: string;
  bannerUrl?: string;
  isPublic: boolean;
  maxParticipants?: number;
  settings?: any;
}

export interface UpdateChallengeDto {
  title?: string;
  description?: string;
  type?: ChallengeType;
  status?: ChallengeStatus;
  startDate?: string;
  endDate?: string;
  targetDistance?: number;
  targetDuration?: number;
  targetActivities?: number;
  rules?: string;
  rewards?: string;
  imageUrl?: string;
  bannerUrl?: string;
  isPublic?: boolean;
  maxParticipants?: number;
  settings?: any;
}
