// Achievement Types

export enum AchievementType {
  CHALLENGE = 'challenge',
  ACTIVITY = 'activity',
  STREAK = 'streak',
  MILESTONE = 'milestone',
  SPECIAL = 'special',
  CUSTOM = 'custom'
}

export enum AchievementStatus {
  EARNED = 'earned',
  PENDING = 'pending',
  LOCKED = 'locked'
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  achievementName: string;
  achievementDescription?: string;
  achievementType: AchievementType;
  status: AchievementStatus;
  earnedAt?: string;
  points: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface TeamAchievement {
  id: string;
  teamId: string;
  achievementId: string;
  achievementName: string;
  achievementDescription?: string;
  achievementType: AchievementType;
  status: AchievementStatus;
  earnedAt?: string;
  points: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description?: string;
  type: AchievementType;
  points: number;
  icon?: string;
  color?: string;
  requirements: AchievementRequirements;
  rewards: AchievementRewards;
  isPublic: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface AchievementRequirements {
  minLevel?: number;
  maxLevel?: number;
  requiredChallenges?: string[];
  requiredActivities?: string[];
  requiredTeams?: string[];
  minScore?: number;
  minDistance?: number;
  minTime?: number;
  minStreak?: number;
  minWins?: number;
  custom?: Record<string, any>;
}

export interface AchievementRewards {
  points: number;
  medals?: string[];
  certificates?: string[];
  badges?: string[];
  titles?: string[];
  custom?: Record<string, any>;
}

export interface CreateAchievementDto {
  name: string;
  description?: string;
  type: AchievementType;
  points: number;
  icon?: string;
  color?: string;
  requirements: AchievementRequirements;
  rewards: AchievementRewards;
  isPublic?: boolean;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateAchievementDto {
  name?: string;
  description?: string;
  type?: AchievementType;
  points?: number;
  icon?: string;
  color?: string;
  requirements?: AchievementRequirements;
  rewards?: AchievementRewards;
  isPublic?: boolean;
  isActive?: boolean;
  sortOrder?: number;
}

export interface QueryAchievementDto {
  page?: number;
  limit?: number;
  search?: string;
  type?: AchievementType;
  isPublic?: boolean;
  isActive?: boolean;
  userId?: string;
  teamId?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface AchievementProgress {
  id: string;
  achievementId: string;
  userId: string;
  teamId?: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AchievementStats {
  totalAchievements: number;
  earnedAchievements: number;
  pendingAchievements: number;
  lockedAchievements: number;
  totalPoints: number;
  averageProgress: number;
  topAchievements: Achievement[];
  recentEarnings: (UserAchievement | TeamAchievement)[];
}

export interface AchievementDisplay {
  id: string;
  name: string;
  description?: string;
  type: AchievementType;
  points: number;
  icon?: string;
  color?: string;
  status: AchievementStatus;
  earnedAt?: string;
  progress?: number;
  maxProgress?: number;
  isCompleted: boolean;
  metadata?: Record<string, any>;
}