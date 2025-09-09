export enum ParticipantStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  DROPPED = 'dropped',
  DISQUALIFIED = 'disqualified'
}

export interface ChallengeParticipant {
  id: string;
  challengeId: string;
  userId: string;
  status: ParticipantStatus;
  joinedAt: string;
  completedAt?: string;
  currentProgress: number;
  currentStreak: number;
  lastActivityAt?: string;
  finalRank?: number;
  finalScore?: number;
  completionTime?: number;
  relatedActivities?: string[];
  isDeleted: boolean;
  deletedAt?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Challenge {
  id: string;
  challengeCode: string;
  name: string;
  description?: string;
  type: ChallengeType;
  status: ChallengeStatus;
  difficulty: ChallengeDifficulty;
  visibility: ChallengeVisibility;
  category: ChallengeCategory;
  clubId?: string;
  eventId?: string;
  createdBy: string;
  startDate: string;
  endDate: string;
  registrationStartDate?: string;
  registrationEndDate?: string;
  maxParticipants?: number;
  minParticipants?: number;
  maxTeamMembers?: number;
  maxTeams?: number;
  minTracklogDistance?: number;
  maxIndividualContribution?: number;
  targetDistance?: number;
  targetTime?: number;
  targetFrequency?: number;
  targetStreak?: number;
  targetValue: number;
  targetUnit: string;
  timeLimit: number;
  minOccurrences?: number;
  minStreak?: number;
  minDistance?: number;
  maxDistance?: number;
  achievementId?: string;
  points?: number;
  conditions?: Record<string, unknown>;
  rewards?: Record<string, unknown>;
  rules?: string;
  coverImageUrl?: string;
  tags?: string[];
  participantCount: number;
  completedCount: number;
  allowRegistration: boolean;
  requireApproval: boolean;
  allowWithdrawal: boolean;
  isDeleted: boolean;
  deletedAt?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
  // Thông tin về trạng thái đăng ký của user (chỉ có khi gọi API với user đăng nhập)
  // null = chưa đăng ký, 'pending' = chờ duyệt, 'active' = đã đăng ký thành công, etc.
  userRegistrationStatus?: ParticipantStatus | null;
}

export enum ChallengeType {
  DISTANCE = 'distance',
  FREQUENCY = 'frequency',
  SPEED = 'speed',
  TIME = 'time',
  STREAK = 'streak',
  COMBINED = 'combined',
  CUSTOM = 'custom'
}

export enum ChallengeCategory {
  INDIVIDUAL = 'individual',
  TEAM = 'team'
}

export enum ChallengeStatus {
  UPCOMING = 'upcoming',
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  PUBLISHED = 'published'
}

export enum ChallengeDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert'
}

export enum ChallengeVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  CLUB_ONLY = 'club_only',
  INVITE_ONLY = 'invite_only'
}

// Team Challenge Types
export interface ChallengeTeam {
  id: string;
  challengeId: string;
  clubId: string;
  teamName: string;
  totalDistance: number;
  memberCount: number;
  finalRank?: number;
  finalScore?: number;
  isDeleted: boolean;
  deletedAt?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChallengeTeamMember {
  id: string;
  teamId: string;
  userId: string;
  contributedDistance: number;
  activityCount: number;
  isDeleted: boolean;
  joinedAt: string;
  updatedAt: string;
}

export interface ChallengeInvitation {
  id: string;
  challengeId: string;
  invitedClubId: string;
  invitedBy: string;
  status: InvitationStatus;
  expiresAt?: string;
  respondedAt?: string;
  isDeleted: boolean;
  deletedAt?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  EXPIRED = 'expired'
}

export interface ChallengeTeamLeaderboard {
  id: string;
  challengeId: string;
  rank: number;
  teamId: string;
  totalDistance: number;
  memberCount: number;
  averageDistance: number;
  lastUpdatedAt?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QueryChallengeDto {
  page?: number;
  limit?: number;
  search?: string;
  type?: ChallengeType;
  status?: ChallengeStatus;
  category?: ChallengeCategory;
  difficulty?: ChallengeDifficulty;
  visibility?: ChallengeVisibility;
  clubId?: string;
  createdBy?: string;
  startDateTo?: string;
  endDateFrom?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface CreateChallengeDto {
  name: string;
  description?: string;
  type?: ChallengeType;
  difficulty?: ChallengeDifficulty;
  visibility?: ChallengeVisibility;
  category?: ChallengeCategory;
  clubId?: string;
  eventId?: string;
  startDate: string;
  endDate: string;
  registrationStartDate?: string;
  registrationEndDate?: string;
  maxParticipants?: number;
  minParticipants?: number;
  maxTeamMembers?: number;
  maxTeams?: number;
  minTracklogDistance?: number;
  maxIndividualContribution?: number;
  targetDistance?: number;
  targetTime?: number;
  targetFrequency?: number;
  targetStreak?: number;
  targetValue: number;
  targetUnit: string;
  timeLimit: number;
  minOccurrences?: number;
  minStreak?: number;
  minDistance?: number;
  maxDistance?: number;
  achievementId?: string;
  points?: number;
  conditions?: Record<string, unknown>;
  rewards?: Record<string, unknown>;
  rules?: string;
  coverImageUrl?: string;
  tags?: string[];
  allowRegistration?: boolean;
  requireApproval?: boolean;
  allowWithdrawal?: boolean;
}

export interface UpdateChallengeDto {
  name?: string;
  description?: string;
  type?: ChallengeType;
  status?: ChallengeStatus;
  difficulty?: ChallengeDifficulty;
  visibility?: ChallengeVisibility;
  category?: ChallengeCategory;
  startDate?: string;
  endDate?: string;
  registrationStartDate?: string;
  registrationEndDate?: string;
  maxParticipants?: number;
  minParticipants?: number;
  maxTeamMembers?: number;
  maxTeams?: number;
  minTracklogDistance?: number;
  maxIndividualContribution?: number;
  targetDistance?: number;
  targetTime?: number;
  targetFrequency?: number;
  targetStreak?: number;
  targetValue?: number;
  targetUnit?: string;
  timeLimit?: number;
  minOccurrences?: number;
  minStreak?: number;
  minDistance?: number;
  maxDistance?: number;
  achievementId?: string;
  points?: number;
  conditions?: Record<string, unknown>;
  rewards?: Record<string, unknown>;
  rules?: string;
  coverImageUrl?: string;
  tags?: string[];
  allowRegistration?: boolean;
  requireApproval?: boolean;
  allowWithdrawal?: boolean;
}

// Team Challenge DTOs
export interface CreateTeamDto {
  teamName: string;
}

export interface AddMemberDto {
  userId: string;
}

export interface SendInvitationDto {
  clubId: string;
  expiresAt?: string;
}

export interface RespondInvitationDto {
  status: InvitationStatus;
}

export interface ChallengeResults {
  challenge: Challenge;
  participants: ChallengeParticipant[];
  leaderboard: ChallengeLeaderboard[];
  stats: {
    totalParticipants: number;
    completedParticipants: number;
    averageScore: number;
    highestScore: number;
    completionRate: number;
  };
}

export interface ChallengeCompletionStats {
  totalParticipants: number;
  completedParticipants: number;
  pendingParticipants: number;
  activeParticipants: number;
  completionRate: number;
  averageCompletionTime: number;
  fastestCompletion: number;
  slowestCompletion: number;
}