// Template Types for Medal and Certificate Designer

export enum MedalType {
  GOLD = 'gold',
  SILVER = 'silver',
  BRONZE = 'bronze',
  PARTICIPATION = 'participation',
  SPECIAL = 'special'
}


export enum CertificateType {
  COMPLETION = 'completion',
  ACHIEVEMENT = 'achievement',
  PARTICIPATION = 'participation',
  WINNER = 'winner'
}

export enum VariableType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  RANK = 'rank',
  ACHIEVEMENT = 'achievement',
  CHALLENGE_NAME = 'challenge_name',
  PARTICIPANT_NAME = 'participant_name',
  TEAM_NAME = 'team_name',
  COMPLETION_DATE = 'completion_date',
  SCORE = 'score',
  DISTANCE = 'distance',
  TIME = 'time'
}

export interface TemplateVariable {
  name: string;
  label: string;
  type: VariableType;
  required: boolean;
  defaultValue?: string;
  description?: string;
}

export interface MedalTemplate {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type: MedalType;
  htmlTemplate: string;
  iconImage?: string;
  color: string;
  variables: TemplateVariable[];
  isPublic: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateTemplate {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type: CertificateType;
  htmlTemplate: string;
  backgroundImage?: string;
  logoImage?: string;
  signatureImage?: string;
  variables: TemplateVariable[];
  isPublic: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChallengeTemplate {
  id: string;
  challengeId: string;
  templateType: 'medal' | 'certificate';
  templateId: string;
  categoryId?: string;
  criteria: TemplateCriteria;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateCriteria {
  rank?: number;
  percentage?: number;
  targetValue?: number;
  timeLimit?: number;
  streak?: number;
  custom?: Record<string, unknown>;
}

export interface CreateMedalTemplateDto {
  name: string;
  description?: string;
  type: MedalType;
  htmlTemplate: string;
  iconImage?: string;
  color: string;
  variables: TemplateVariable[];
  isPublic?: boolean;
}

export interface UpdateMedalTemplateDto {
  name?: string;
  description?: string;
  type?: MedalType;
  htmlTemplate?: string;
  iconImage?: string;
  color?: string;
  variables?: TemplateVariable[];
  isPublic?: boolean;
  isActive?: boolean;
}

export interface CreateCertificateTemplateDto {
  name: string;
  description?: string;
  type: CertificateType;
  htmlTemplate: string;
  backgroundImage?: string;
  logoImage?: string;
  signatureImage?: string;
  variables: TemplateVariable[];
  isPublic?: boolean;
}

export interface UpdateCertificateTemplateDto {
  name?: string;
  description?: string;
  type?: CertificateType;
  htmlTemplate?: string;
  backgroundImage?: string;
  logoImage?: string;
  signatureImage?: string;
  variables?: TemplateVariable[];
  isPublic?: boolean;
  isActive?: boolean;
}

export interface QueryTemplateDto {
  page?: number;
  limit?: number;
  search?: string;
  type?: MedalType | CertificateType;
  userId?: string;
  isPublic?: boolean;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PreviewDataDto {
  participantName?: string;
  teamName?: string;
  challengeName?: string;
  achievement?: string;
  rank?: number;
  score?: number;
  distance?: number;
  time?: string;
  completionDate?: string;
  [key: string]: unknown;
}

export interface GeneratedMedal {
  id: string;
  templateId: string;
  challengeId: string;
  userId: string;
  teamId?: string;
  participantName: string;
  achievement: string;
  rank?: number;
  medalUrl: string;
  isVerified: boolean;
  verificationCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedCertificate {
  id: string;
  templateId: string;
  challengeId: string;
  userId: string;
  teamId?: string;
  participantName: string;
  achievement: string;
  rank?: number;
  certificateUrl: string;
  pdfUrl?: string;
  isVerified: boolean;
  verificationCode: string;
  createdAt: string;
  updatedAt: string;
}
