export interface Club {
  id: string;
  clubCode: string;
  name: string;
  shortName?: string;
  description?: string;
  type: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  logoUrl?: string;
  coverImageUrl?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  latitude?: string;
  longitude?: string;
  foundedAt?: string;
  maxMembers?: number;
  monthlyFee?: string;
  yearlyFee?: string;
  rules?: string;
  schedule?: string;
  contactInfo?: any;
  socialMedia?: any;
  settings?: any;
  isPublic?: boolean;
  allowNewMembers?: boolean;
  requireApproval?: boolean;
  isDeleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClubDto {
  name: string;
  description: string;
  category: string;
  visibility: 'public' | 'private' | 'club_only';
  maxMembers: number;
  location: {
    city: string;
    district: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    email: string;
    phone?: string;
    website?: string;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  schedule: {
    meetingDays: string[];
    meetingTime: string;
    meetingLocation: string;
  };
  requirements: {
    ageMin?: number;
    ageMax?: number;
    gender?: 'male' | 'female' | 'any';
    skillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'any';
    equipment?: string[];
  };
  fees: {
    membershipFee: number;
    monthlyFee?: number;
    annualFee?: number;
    currency: 'VND' | 'USD';
  };
}

export interface UpdateClubDto extends Partial<CreateClubDto> {}

export interface QueryClubDto {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  status?: 'active' | 'inactive' | 'pending' | 'suspended';
  visibility?: 'public' | 'private' | 'club_only';
  city?: string;
  state?: string;
  country?: string;
  district?: string;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
  maxMembers?: number;
  createdBy?: string;
}

export interface ClubsResponse {
  clubs: Club[];
  total: number;
  page: number;
  limit: number;
}

export interface ClubStats {
  totalClubs: number;
  activeClubs: number;
  pendingClubs: number;
  runningClubs: number;
}
