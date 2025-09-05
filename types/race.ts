export interface Race {
  id: string;
  raceCode: string;
  name: string;
  description?: string;
  type: RaceType;
  status: RaceStatus;
  clubId: string;
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
  distance: number;
  elevation?: number;
  maxParticipants?: number;
  registrationFee?: number;
  imageUrl?: string;
  bannerUrl?: string;
  routeUrl?: string;
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

export enum RaceType {
  MARATHON = 'marathon',
  HALF_MARATHON = 'half_marathon',
  TEN_K = '10k',
  FIVE_K = '5k',
  TRAIL = 'trail',
  ULTRA = 'ultra',
  RELAY = 'relay',
  VIRTUAL = 'virtual',
  OTHER = 'other'
}

export enum RaceStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  REGISTRATION_OPEN = 'registration_open',
  REGISTRATION_CLOSED = 'registration_closed',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface RaceParticipant {
  id: string;
  raceId: string;
  userId: string;
  bibNumber?: string;
  category?: string;
  status: ParticipantStatus;
  paymentStatus: PaymentStatus;
  registrationDate: string;
  transactionId?: string;
  notes?: string;
  emergencyContact?: any;
  medicalInfo?: any;
  createdAt: string;
  updatedAt: string;
}

export enum ParticipantStatus {
  REGISTERED = 'registered',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  WITHDRAWN = 'withdrawn',
  DISQUALIFIED = 'disqualified'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export interface RaceResult {
  id: string;
  raceId: string;
  participantId: string;
  userId: string;
  finishTime?: number;
  distance?: number;
  averagePace?: number;
  status: ResultStatus;
  source: ResultSource;
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum ResultStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  DISPUTED = 'disputed',
  DISQUALIFIED = 'disqualified'
}

export enum ResultSource {
  MANUAL = 'manual',
  GPS = 'gps',
  CHIP = 'chip',
  PHOTO = 'photo'
}

export interface QueryRaceDto {
  page?: number;
  limit?: number;
  search?: string;
  type?: RaceType;
  status?: RaceStatus;
  clubId?: string;
  createdBy?: string;
  city?: string;
  state?: string;
  country?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface CreateRaceDto {
  name: string;
  description?: string;
  type: RaceType;
  clubId: string;
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
  distance: number;
  elevation?: number;
  maxParticipants?: number;
  registrationFee?: number;
  imageUrl?: string;
  bannerUrl?: string;
  routeUrl?: string;
  rules?: string;
  requirements?: string;
  contactInfo?: any;
  socialMedia?: any;
  settings?: any;
}

export interface UpdateRaceDto {
  name?: string;
  description?: string;
  type?: RaceType;
  status?: RaceStatus;
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
  distance?: number;
  elevation?: number;
  maxParticipants?: number;
  registrationFee?: number;
  imageUrl?: string;
  bannerUrl?: string;
  routeUrl?: string;
  rules?: string;
  requirements?: string;
  contactInfo?: any;
  socialMedia?: any;
  settings?: any;
}

export interface RegisterRaceDto {
  category?: string;
  emergencyContact?: any;
  medicalInfo?: any;
  notes?: string;
}

// Constants for UI
export const RACE_TYPES = {
  marathon: 'Marathon (42.2km)',
  half_marathon: 'Half Marathon (21.1km)',
  '10k': '10K (10km)',
  '5k': '5K (5km)',
  trail: 'Trail Running',
  ultra: 'Ultra Marathon',
  relay: 'Relay Race',
  virtual: 'Virtual Race',
  other: 'Khác'
} as const;

export const RACE_CATEGORIES = {
  road: 'Đường bộ',
  trail: 'Đường mòn',
  track: 'Đường chạy',
  ultra: 'Ultra',
  marathon: 'Marathon',
  half_marathon: 'Half Marathon',
  '10k': '10K',
  '5k': '5K',
  other: 'Khác'
} as const;

export const RACE_STATUSES = {
  draft: 'Nháp',
  published: 'Đã công bố',
  registration_open: 'Mở đăng ký',
  registration_closed: 'Đóng đăng ký',
  active: 'Đang diễn ra',
  completed: 'Đã hoàn thành',
  cancelled: 'Đã hủy'
} as const;