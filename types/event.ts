export interface Event {
  id: string;
  eventCode: string;
  name: string;
  description?: string;
  type: EventType;
  status: EventStatus;
  visibility: EventVisibility;
  clubId?: string;
  createdBy: string;
  startDate: string;
  endDate?: string;
  registrationStartDate?: string;
  registrationEndDate?: string;
  location?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  contactInfo?: any;
  coverImageUrl?: string;
  additionalImages?: string[];
  tags?: string[];
  maxParticipants?: number;
  registrationFee?: number;
  format?: 'online' | 'offline' | 'hybrid';
  isDeleted: boolean;
  deletedAt?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export enum EventType {
  TRAINING = 'training',
  COMPETITION = 'competition',
  SOCIAL = 'social',
  CHARITY = 'charity',
  WORKSHOP = 'workshop',
  MEETUP = 'meetup',
  KNOWLEDGE_SHARING = 'knowledge_sharing',
  BIRTHDAY = 'birthday',
  CELEBRATION = 'celebration',
  TEAM_BUILDING = 'team_building',
  HEALTH_CHECK = 'health_check',
  NUTRITION_TALK = 'nutrition_talk',
  EQUIPMENT_REVIEW = 'equipment_review',
  ROUTE_EXPLORATION = 'route_exploration',
  OTHER = 'other'
}

export enum EventStatus {
  UPCOMING = 'upcoming',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum EventVisibility {
  CLUB_ONLY = 'club_only',
  PUBLIC = 'public'
}

export interface QueryEventDto {
  page?: number;
  limit?: number;
  search?: string;
  type?: EventType;
  status?: EventStatus;
  visibility?: EventVisibility;
  clubId?: string;
  createdBy?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface CreateEventDto {
  name: string;
  description?: string;
  type: EventType;
  visibility: EventVisibility;
  clubId?: string;
  startDate: string;
  endDate?: string;
  registrationStartDate?: string;
  registrationEndDate?: string;
  location?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  contactInfo?: any;
  coverImageUrl?: string;
  additionalImages?: string[];
  tags?: string[];
  maxParticipants?: number;
  registrationFee?: number;
  format?: 'online' | 'offline' | 'hybrid';
}

export interface UpdateEventDto {
  title?: string;
  description?: string;
  type?: EventType;
  status?: EventStatus;
  visibility?: EventVisibility;
  startDate?: string;
  endDate?: string;
  registrationStartDate?: string;
  registrationEndDate?: string;
  location?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  maxParticipants?: number;
  registrationFee?: number;
  imageUrl?: string;
  bannerUrl?: string;
  rules?: string;
  requirements?: string;
  contactInfo?: any;
  socialMedia?: any;
  settings?: any;
}
