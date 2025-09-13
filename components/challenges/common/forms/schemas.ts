import { z } from 'zod';
import { ChallengeType, ChallengeCategory, ChallengeDifficulty, ChallengeVisibility } from '@/types/challenge';

// Base schema cho tất cả challenge forms
export const baseChallengeSchema = z.object({
  // Thông tin cơ bản
  name: z.string()
    .min(1, 'Tên thử thách là bắt buộc')
    .min(2, 'Tên thử thách phải có ít nhất 2 ký tự')
    .max(255, 'Tên thử thách không được vượt quá 255 ký tự'),

  description: z.string()
    .min(10, 'Mô tả phải có ít nhất 10 ký tự')
    .optional()
    .or(z.literal('')),

  category: z.nativeEnum(ChallengeCategory),
  type: z.nativeEnum(ChallengeType),
  difficulty: z.nativeEnum(ChallengeDifficulty),
  visibility: z.nativeEnum(ChallengeVisibility),
  
  // Thời gian
  startDate: z.string().min(1, 'Ngày bắt đầu là bắt buộc'),
  endDate: z.string().min(1, 'Ngày kết thúc là bắt buộc'),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  registrationStartDate: z.string().optional(),
  registrationEndDate: z.string().optional(),
  
  // Mục tiêu
  targetValue: z.number().min(1, 'Giá trị mục tiêu phải lớn hơn 0'),
  targetUnit: z.string().min(1, 'Đơn vị là bắt buộc'),
  
  // Hạng mục/Cự ly
  distanceCategories: z.array(z.object({
    id: z.string(),
    value: z.number().min(1, 'Giá trị phải lớn hơn 0'),
    unit: z.string(),
    name: z.string().optional(),
    difficulty: z.string().min(1, 'Phải chọn độ khó'),
  })).min(1, 'Phải có ít nhất 1 hạng mục'),
  
  
  // Cài đặt tham gia
  maxParticipants: z.number().min(1).optional(),
  allowFreeRegistration: z.boolean().default(true),
  autoApprovalPassword: z.string().optional(),
  
  // Phần thưởng
  points: z.number().min(0).default(0),
  achievementId: z.string().optional(),
  hasDigitalCertificate: z.boolean().default(false),
  hasMedals: z.boolean().default(false),
  hasCertificates: z.boolean().default(false),
  medalTemplateIds: z.array(z.string()).default([]),
  certificateTemplateIds: z.array(z.string()).default([]),
  rules: z.string().optional(),
});

// Schema cho individual challenge
export const individualChallengeSchema = baseChallengeSchema.extend({
  category: z.literal(ChallengeCategory.INDIVIDUAL),
});

// Schema cho team challenge
export const teamChallengeSchema = baseChallengeSchema.extend({
  category: z.literal(ChallengeCategory.TEAM),
  maxTeamMembers: z.number().min(1).optional(),
  maxTeams: z.number().min(1).optional(),
  minTracklogDistance: z.number().min(0).optional(),
  maxIndividualContribution: z.number().min(0).optional(),
  createdByClubId: z.string().min(1, 'Phải chọn CLB tạo thử thách'),
  invitedClubs: z.array(z.object({
    clubId: z.string(),
    maxParticipants: z.number().min(1, 'Số lượng tối thiểu là 1')
  })).min(1, 'Phải chọn ít nhất 1 CLB được mời'),
});

export type BaseChallengeFormData = z.infer<typeof baseChallengeSchema>;
export type IndividualChallengeFormData = z.infer<typeof individualChallengeSchema>;
export type TeamChallengeFormData = z.infer<typeof teamChallengeSchema>;
