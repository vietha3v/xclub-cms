export interface Event {
  id: string;
  eventCode: string;
  title: string;
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
  isDeleted: boolean;
  deletedAt?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export enum EventType {
  RACE = 'race',
  TRAINING = 'training',
  WORKSHOP = 'workshop',
  MEETUP = 'meetup',
  COMPETITION = 'competition',
  CHARITY = 'charity',
  OTHER = 'other'
}

export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  REGISTRATION_OPEN = 'registration_open',
  REGISTRATION_CLOSED = 'registration_closed',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum EventVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  CLUB_ONLY = 'club_only',
  INVITE_ONLY = 'invite_only'
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
  title: string;
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
