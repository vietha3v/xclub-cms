// Mock data cho ứng dụng X-Club

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  level: number;
  xp: number;
  totalDistance: number;
  totalRuns: number;
  joinDate: string;
  badges: Badge[];
  friends: string[];
  clubs: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'achievement' | 'social' | 'charity' | 'special';
  earnedDate?: string;
}

export interface RunningActivity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  distance: number;
  duration: number;
  pace: number;
  calories: number;
  location: string;
  route: string;
  weather: string;
  mood: string;
  notes: string;
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  logo: string;
  banner: string;
  memberCount: number;
  totalDistance: number;
  totalEvents: number;
  isPublic: boolean;
  createdAt: string;
  admins: string[];
  members: string[];
  events: string[];
}

export interface Event {
  id: string;
  name: string;
  description: string;
  type: 'race' | 'charity' | 'training' | 'social';
  distance: number;
  startDate: string;
  endDate: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  registrationFee: number;
  isVirtual: boolean;
  organizer: string;
  organizerType: 'club' | 'company' | 'individual';
  banner: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'distance' | 'duration' | 'frequency' | 'charity';
  target: number;
  unit: string;
  startDate: string;
  endDate: string;
  participants: number;
  maxParticipants?: number;
  reward: string;
  isActive: boolean;
  organizer: string;
}

export interface Fundraising {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  beneficiary: string;
  startDate: string;
  endDate: string;
  participants: number;
  totalDistance: number;
  status: 'active' | 'completed' | 'cancelled';
  organizer: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    email: 'nguyenvana@email.com',
    level: 15,
    xp: 12500,
    totalDistance: 2847,
    totalRuns: 156,
    joinDate: '2023-01-15',
    badges: ['1', '2', '3'],
    friends: ['2', '3', '4'],
    clubs: ['1', '2']
  },
  {
    id: '2',
    name: 'Trần Thị B',
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    email: 'tranthib@email.com',
    level: 12,
    xp: 8900,
    totalDistance: 1890,
    totalRuns: 98,
    joinDate: '2023-03-20',
    badges: ['1', '4', '5'],
    friends: ['1', '3', '5'],
    clubs: ['1', '3']
  },
  {
    id: '3',
    name: 'Lê Văn C',
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    email: 'levanc@email.com',
    level: 18,
    xp: 15800,
    totalDistance: 3420,
    totalRuns: 203,
    joinDate: '2022-11-10',
    badges: ['1', '2', '3', '6'],
    friends: ['1', '2', '4'],
    clubs: ['1', '2', '4']
  }
];

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'First Run',
    description: 'Hoàn thành chạy đầu tiên',
    icon: '🏃‍♂️',
    category: 'achievement'
  },
  {
    id: '2',
    name: '100km Club',
    description: 'Chạy được 100km',
    icon: '💯',
    category: 'achievement'
  },
  {
    id: '3',
    name: 'Early Bird',
    description: 'Chạy sáng sớm 7 ngày liên tiếp',
    icon: '🌅',
    category: 'achievement'
  },
  {
    id: '4',
    name: 'Social Butterfly',
    description: 'Kết nối với 10 runner khác',
    icon: '🦋',
    category: 'social'
  },
  {
    id: '5',
    name: 'Charity Runner',
    description: 'Tham gia 5 sự kiện gây quỹ',
    icon: '💝',
    category: 'charity'
  },
  {
    id: '6',
    name: 'Marathon Master',
    description: 'Hoàn thành 5 giải chạy 21K+',
    icon: '🏆',
    category: 'achievement'
  }
];

// Mock Running Activities
export const mockActivities: RunningActivity[] = [];

// Mock Clubs
export const mockClubs: Club[] = [
  {
    id: '1',
    name: 'Hà Nội Runners',
    description: 'Câu lạc bộ chạy bộ hàng đầu Hà Nội, tổ chức các buổi tập luyện và sự kiện thường xuyên',
    logo: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    banner: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    memberCount: 156,
    totalDistance: 45620,
    totalEvents: 23,
    isPublic: true,
    createdAt: '2022-01-15',
    admins: ['1', '3'],
    members: ['1', '2', '3', '4', '5'],
    events: ['1', '2', '3']
  },
  {
    id: '2',
    name: 'Saigon Striders',
    description: 'Cộng đồng runner TP.HCM, chuyên về chạy đường trường và trail running',
    logo: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    banner: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    memberCount: 89,
    totalDistance: 28940,
    totalEvents: 15,
    isPublic: true,
    createdAt: '2022-06-20',
    admins: ['2'],
    members: ['2', '3', '6', '7'],
    events: ['4', '5']
  },
  {
    id: '3',
    name: 'Đà Nẵng Pacers',
    description: 'CLB chạy bộ Đà Nẵng, tập trung vào chạy bộ biển và đồi núi',
    logo: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    banner: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    memberCount: 67,
    totalDistance: 18920,
    totalEvents: 12,
    isPublic: true,
    createdAt: '2023-01-10',
    admins: ['4'],
    members: ['4', '5', '8'],
    events: ['6']
  }
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Giải chạy Hồ Tây 2024',
    description: 'Giải chạy truyền thống hàng năm tại Hồ Tây với 3 cự ly: 5K, 10K, 21K',
    type: 'race',
    distance: 21.1,
    startDate: '2024-12-15T06:00:00Z',
    endDate: '2024-12-15T12:00:00Z',
    location: 'Hồ Tây, Hà Nội',
    maxParticipants: 500,
    currentParticipants: 487,
    registrationFee: 200000,
    isVirtual: false,
    organizer: 'Hà Nội Runners',
    organizerType: 'club',
    banner: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    status: 'upcoming'
  },
  {
    id: '2',
    name: 'Chạy vì trẻ em',
    description: 'Giải chạy gây quỹ hỗ trợ trẻ em khó khăn, mỗi km chạy = 10,000 VNĐ',
    type: 'charity',
    distance: 10.0,
    startDate: '2024-12-20T07:00:00Z',
    endDate: '2024-12-20T11:00:00Z',
    location: 'Công viên Thống Nhất',
    maxParticipants: 300,
    currentParticipants: 234,
    registrationFee: 0,
    isVirtual: false,
    organizer: 'Tổ chức từ thiện Vì Trẻ Em',
    organizerType: 'company',
    banner: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    status: 'upcoming'
  },
  {
    id: '3',
    name: 'CLB Hà Nội Runners - Buổi tập cuối tuần',
    description: 'Buổi tập luyện cuối tuần của CLB với các bài tập đa dạng',
    type: 'training',
    distance: 8.0,
    startDate: '2024-12-08T06:00:00Z',
    endDate: '2024-12-08T08:00:00Z',
    location: 'Công viên Bách Thảo',
    maxParticipants: 50,
    currentParticipants: 42,
    registrationFee: 0,
    isVirtual: false,
    organizer: 'Hà Nội Runners',
    organizerType: 'club',
    banner: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    status: 'completed'
  }
];

// Mock Challenges
export const mockChallenges: Challenge[] = [
  {
    id: '1',
    name: 'Thử thách 100km tháng 12',
    description: 'Chạy tổng cộng 100km trong tháng 12 để nhận huy chương đặc biệt',
    type: 'distance',
    target: 100,
    unit: 'km',
    startDate: '2024-12-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    participants: 156,
    maxParticipants: 200,
    reward: 'Huy chương 100km tháng 12',
    isActive: true,
    organizer: 'X-Club'
  },
  {
    id: '2',
    name: 'Chạy sáng sớm 7 ngày',
    description: 'Chạy sáng sớm (trước 7h) trong 7 ngày liên tiếp',
    type: 'frequency',
    target: 7,
    unit: 'ngày',
    startDate: '2024-12-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    participants: 89,
    maxParticipants: 100,
    reward: 'Badge Early Bird',
    isActive: true,
    organizer: 'X-Club'
  },
  {
    id: '3',
    name: 'Thử thách pace 5:00/km',
    description: 'Chạy 5km với pace trung bình dưới 5:00 phút/km',
    type: 'distance',
    target: 5,
    unit: 'km',
    startDate: '2024-12-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    participants: 67,
    maxParticipants: 80,
    reward: 'Badge Speed Demon',
    isActive: true,
    organizer: 'X-Club'
  }
];

// Mock Fundraising
export const mockFundraising: Fundraising[] = [
  {
    id: '1',
    title: 'Chạy vì giáo dục 2024',
    description: 'Gây quỹ xây dựng thư viện cho trường tiểu học vùng cao',
    targetAmount: 50000000,
    currentAmount: 45200000,
    currency: 'VND',
    beneficiary: 'Trường Tiểu học Vùng Cao',
    startDate: '2024-11-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    participants: 1247,
    totalDistance: 4520,
    status: 'active',
    organizer: 'Tổ chức Vì Giáo Dục'
  },
  {
    id: '2',
    title: 'Chạy vì trẻ em khuyết tật',
    description: 'Gây quỹ mua thiết bị hỗ trợ cho trẻ em khuyết tật',
    targetAmount: 30000000,
    currentAmount: 28900000,
    currency: 'VND',
    beneficiary: 'Trung tâm Hỗ trợ Trẻ em Khuyết tật',
    startDate: '2024-10-15T00:00:00Z',
    endDate: '2024-12-15T23:59:59Z',
    participants: 890,
    totalDistance: 2890,
    status: 'active',
    organizer: 'Tổ chức Vì Trẻ Em'
  }
];

// Helper functions
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const formatPace = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const formatDistance = (km: number): string => {
  if (km >= 1) {
    return `${km.toFixed(1)}km`;
  }
  return `${Math.round(km * 1000)}m`;
};

export const formatCurrency = (amount: number, currency: string = 'VND'): string => {
  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};
