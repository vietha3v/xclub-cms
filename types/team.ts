// Team Types - Independent from Clubs

export enum TeamStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISBANDED = 'disbanded'
}

export enum TeamRole {
  LEADER = 'leader',
  MEMBER = 'member',
  CO_LEADER = 'co_leader'
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  banner?: string;
  status: TeamStatus;
  isPublic: boolean;
  maxMembers?: number;
  currentMembers: number;
  leaderId: string;
  leaderName: string;
  leaderAvatar?: string;
  tags: string[];
  location?: string;
  website?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  stats: {
    totalChallenges: number;
    totalWins: number;
    totalMembers: number;
    averageScore: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  role: TeamRole;
  joinedAt: string;
  isActive: boolean;
  stats: {
    challengesParticipated: number;
    challengesWon: number;
    averageScore: number;
    contributionScore: number;
  };
}

export interface TeamInvitation {
  id: string;
  teamId: string;
  teamName: string;
  teamAvatar?: string;
  inviterId: string;
  inviterName: string;
  inviterAvatar?: string;
  inviteeId: string;
  inviteeName: string;
  inviteeAvatar?: string;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamDto {
  name: string;
  description?: string;
  avatar?: string;
  banner?: string;
  isPublic?: boolean;
  maxMembers?: number;
  tags?: string[];
  location?: string;
  website?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface UpdateTeamDto {
  name?: string;
  description?: string;
  avatar?: string;
  banner?: string;
  isPublic?: boolean;
  maxMembers?: number;
  tags?: string[];
  location?: string;
  website?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface QueryTeamDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: TeamStatus;
  isPublic?: boolean;
  tags?: string[];
  location?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface SendTeamInvitationDto {
  inviteeId: string;
  message?: string;
  expiresInDays?: number;
}

export interface RespondTeamInvitationDto {
  status: 'accepted' | 'rejected';
}

export interface TeamSearchFilters {
  search?: string;
  status?: TeamStatus;
  isPublic?: boolean;
  tags?: string[];
  location?: string;
  minMembers?: number;
  maxMembers?: number;
  sortBy?: 'name' | 'createdAt' | 'members' | 'challenges';
  sortOrder?: 'ASC' | 'DESC';
}

export interface TeamStats {
  totalTeams: number;
  activeTeams: number;
  publicTeams: number;
  totalMembers: number;
  averageTeamSize: number;
  topTeams: Team[];
  recentTeams: Team[];
}
