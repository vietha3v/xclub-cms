// Challenge Category Types

export enum CategoryType {
  DISTANCE = 'distance',
  TIME = 'time',
  REPETITION = 'repetition',
  CUSTOM = 'custom'
}

export interface ChallengeCategory {
  id: string;
  challengeId: string;
  name: string;
  description?: string;
  type: CategoryType;
  unit: string; // km, hours, reps, etc.
  minValue?: number;
  maxValue?: number;
  isRequired: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChallengeCategoryDto {
  name: string;
  description?: string;
  type: CategoryType;
  unit: string;
  minValue?: number;
  maxValue?: number;
  isRequired?: boolean;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateChallengeCategoryDto {
  name?: string;
  description?: string;
  type?: CategoryType;
  unit?: string;
  minValue?: number;
  maxValue?: number;
  isRequired?: boolean;
  isActive?: boolean;
  sortOrder?: number;
}

export interface QueryChallengeCategoryDto {
  page?: number;
  limit?: number;
  search?: string;
  type?: CategoryType;
  isRequired?: boolean;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface CategorySelection {
  categoryId: string;
  value: number;
  unit: string;
}

export interface ParticipantCategorySelection {
  participantId: string;
  categoryId: string;
  value: number;
  unit: string;
  isVerified: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface TeamCategorySelection {
  teamId: string;
  categoryId: string;
  value: number;
  unit: string;
  isVerified: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
}

// Predefined category templates
export const PREDEFINED_CATEGORIES = {
  [CategoryType.DISTANCE]: [
    { name: '5K', unit: 'km', minValue: 0, maxValue: 5 },
    { name: '10K', unit: 'km', minValue: 0, maxValue: 10 },
    { name: 'Half Marathon', unit: 'km', minValue: 0, maxValue: 21.1 },
    { name: 'Marathon', unit: 'km', minValue: 0, maxValue: 42.2 },
    { name: 'Ultra Marathon', unit: 'km', minValue: 0, maxValue: 100 },
  ],
  [CategoryType.TIME]: [
    { name: '1 Hour', unit: 'hours', minValue: 0, maxValue: 1 },
    { name: '2 Hours', unit: 'hours', minValue: 0, maxValue: 2 },
    { name: '4 Hours', unit: 'hours', minValue: 0, maxValue: 4 },
    { name: '8 Hours', unit: 'hours', minValue: 0, maxValue: 8 },
    { name: '12 Hours', unit: 'hours', minValue: 0, maxValue: 12 },
    { name: '24 Hours', unit: 'hours', minValue: 0, maxValue: 24 },
  ],
  [CategoryType.REPETITION]: [
    { name: 'Push-ups', unit: 'reps', minValue: 0, maxValue: 1000 },
    { name: 'Sit-ups', unit: 'reps', minValue: 0, maxValue: 1000 },
    { name: 'Squats', unit: 'reps', minValue: 0, maxValue: 1000 },
    { name: 'Burpees', unit: 'reps', minValue: 0, maxValue: 500 },
    { name: 'Jumping Jacks', unit: 'reps', minValue: 0, maxValue: 1000 },
  ],
};
