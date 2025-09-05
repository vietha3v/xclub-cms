export interface Achievement {
  id: string;
  achievementCode: string;
  name: string;
  description: string;
  type: AchievementType;
  category: AchievementCategory;
  level: AchievementLevel;
  icon: string;
  badge: string;
  points: number;
  requirements: AchievementRequirement[];
  rewards: AchievementReward[];
  isActive: boolean;
  isPublic: boolean;
  isRepeatable: boolean;
  maxCompletions?: number;
  cooldownPeriod?: number; // in days
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export enum AchievementType {
  DISTANCE = 'distance',
  TIME = 'time',
  SPEED = 'speed',
  FREQUENCY = 'frequency',
  STREAK = 'streak',
  SOCIAL = 'social',
  CHALLENGE = 'challenge',
  EVENT = 'event',
  SPECIAL = 'special'
}

export enum AchievementCategory {
  RUNNING = 'running',
  CYCLING = 'cycling',
  SWIMMING = 'swimming',
  GENERAL = 'general',
  SOCIAL = 'social',
  CLUB = 'club',
  EVENT = 'event'
}

export enum AchievementLevel {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum',
  DIAMOND = 'diamond'
}

export interface AchievementRequirement {
  id: string;
  type: RequirementType;
  operator: RequirementOperator;
  value: number;
  unit?: string;
  period?: string; // daily, weekly, monthly, yearly, all_time
  conditions?: Record<string, any>;
}

export enum RequirementType {
  DISTANCE = 'distance',
  TIME = 'time',
  SPEED = 'speed',
  PACE = 'pace',
  FREQUENCY = 'frequency',
  STREAK = 'streak',
  CALORIES = 'calories',
  ELEVATION = 'elevation',
  ACTIVITIES = 'activities',
  PARTICIPANTS = 'participants',
  SOCIAL_INTERACTIONS = 'social_interactions'
}

export enum RequirementOperator {
  EQUALS = 'equals',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  GREATER_THAN_OR_EQUAL = 'greater_than_or_equal',
  LESS_THAN_OR_EQUAL = 'less_than_or_equal',
  BETWEEN = 'between',
  CONTAINS = 'contains'
}

export interface AchievementReward {
  id: string;
  type: RewardType;
  value: number;
  description: string;
  isActive: boolean;
}

export enum RewardType {
  POINTS = 'points',
  BADGE = 'badge',
  TITLE = 'title',
  DISCOUNT = 'discount',
  GIFT = 'gift',
  CUSTOM = 'custom'
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  achievement: Achievement;
  progress: number;
  isCompleted: boolean;
  completedAt?: Date;
  progressData: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAchievementDto {
  name: string;
  description: string;
  type: AchievementType;
  category: AchievementCategory;
  level: AchievementLevel;
  icon: string;
  badge: string;
  points: number;
  requirements: Omit<AchievementRequirement, 'id'>[];
  rewards: Omit<AchievementReward, 'id'>[];
  isActive: boolean;
  isPublic: boolean;
  isRepeatable: boolean;
  maxCompletions?: number;
  cooldownPeriod?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface UpdateAchievementDto extends Partial<CreateAchievementDto> {}

export interface QueryAchievementDto {
  page?: number;
  limit?: number;
  search?: string;
  type?: AchievementType;
  category?: AchievementCategory;
  level?: AchievementLevel;
  isActive?: boolean;
  isPublic?: boolean;
  isRepeatable?: boolean;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface AchievementResponse {
  achievements: Achievement[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserAchievementResponse {
  userAchievements: UserAchievement[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AchievementStats {
  totalAchievements: number;
  activeAchievements: number;
  completedAchievements: number;
  totalPoints: number;
  achievementsByType: Record<AchievementType, number>;
  achievementsByCategory: Record<AchievementCategory, number>;
  achievementsByLevel: Record<AchievementLevel, number>;
  recentAchievements: UserAchievement[];
}
