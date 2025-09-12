// Activity Types

export enum ActivityType {
  CHALLENGE = 'challenge',
  ACHIEVEMENT = 'achievement',
  TEAM_JOIN = 'team_join',
  TEAM_LEAVE = 'team_leave',
  CHALLENGE_COMPLETE = 'challenge_complete',
  CHALLENGE_WIN = 'challenge_win',
  MEDAL_EARNED = 'medal_earned',
  CERTIFICATE_EARNED = 'certificate_earned',
  STREAK_ACHIEVED = 'streak_achieved',
  MILESTONE_REACHED = 'milestone_reached',
  CUSTOM = 'custom'
}

export enum ActivityStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived'
}

export interface Activity {
  id: string;
  name: string;
  description?: string;
  type: ActivityType;
  status: ActivityStatus;
  points: number;
  requirements: ActivityRequirements;
  rewards: ActivityRewards;
  isPublic: boolean;
  isRepeatable: boolean;
  maxAttempts?: number;
  cooldownHours?: number;
  startDate?: string;
  endDate?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityRequirements {
  minLevel?: number;
  maxLevel?: number;
  requiredChallenges?: string[];
  requiredAchievements?: string[];
  requiredTeams?: string[];
  minScore?: number;
  minDistance?: number;
  minTime?: number;
  minStreak?: number;
  custom?: Record<string, any>;
}

export interface ActivityRewards {
  points: number;
  medals?: string[];
  certificates?: string[];
  badges?: string[];
  titles?: string[];
  custom?: Record<string, any>;
}

export interface CreateActivityDto {
  name: string;
  description?: string;
  type: ActivityType;
  points: number;
  requirements: ActivityRequirements;
  rewards: ActivityRewards;
  isPublic?: boolean;
  isRepeatable?: boolean;
  maxAttempts?: number;
  cooldownHours?: number;
  startDate?: string;
  endDate?: string;
}

export interface UpdateActivityDto {
  name?: string;
  description?: string;
  type?: ActivityType;
  points?: number;
  requirements?: ActivityRequirements;
  rewards?: ActivityRewards;
  isPublic?: boolean;
  isRepeatable?: boolean;
  maxAttempts?: number;
  cooldownHours?: number;
  startDate?: string;
  endDate?: string;
  status?: ActivityStatus;
}

export interface QueryActivityDto {
  page?: number;
  limit?: number;
  search?: string;
  type?: ActivityType;
  status?: ActivityStatus;
  isPublic?: boolean;
  isRepeatable?: boolean;
  createdBy?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface ActivityProgress {
  id: string;
  activityId: string;
  userId: string;
  teamId?: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  completedAt?: string;
  attempts: number;
  lastAttemptAt?: string;
  nextAttemptAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityCompletion {
  id: string;
  activityId: string;
  userId: string;
  teamId?: string;
  completedAt: string;
  pointsEarned: number;
  rewardsEarned: ActivityRewards;
  metadata?: Record<string, any>;
}

export interface ActivityStats {
  totalActivities: number;
  activeActivities: number;
  completedActivities: number;
  totalPoints: number;
  averageProgress: number;
  topActivities: Activity[];
  recentCompletions: ActivityCompletion[];
}