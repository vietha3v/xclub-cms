'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
    .min(1, 'Mô tả là bắt buộc')
    .min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  
  type: z.nativeEnum(ChallengeType),
  difficulty: z.nativeEnum(ChallengeDifficulty),
  visibility: z.nativeEnum(ChallengeVisibility),
  
  // Thời gian
  startDate: z.string().min(1, 'Ngày bắt đầu là bắt buộc'),
  endDate: z.string().min(1, 'Ngày kết thúc là bắt buộc'),
  registrationStartDate: z.string().optional(),
  registrationEndDate: z.string().optional(),
  
  // Mục tiêu
  targetValue: z.number().min(1, 'Giá trị mục tiêu phải lớn hơn 0'),
  targetUnit: z.string().min(1, 'Đơn vị là bắt buộc'),
  
  // Điều kiện
  minOccurrences: z.number().min(1).optional(),
  minStreak: z.number().min(1).optional(),
  minDistance: z.number().min(0).optional(),
  maxDistance: z.number().min(0).optional(),
  
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
});

export type BaseChallengeFormData = z.infer<typeof baseChallengeSchema>;
export type IndividualChallengeFormData = z.infer<typeof individualChallengeSchema>;
export type TeamChallengeFormData = z.infer<typeof teamChallengeSchema>;

interface ChallengeFormProviderProps {
  children: React.ReactNode;
  schema: z.ZodSchema<any>;
  defaultValues: any;
  onSubmit: (data: any) => void;
}

export default function ChallengeFormProvider({ 
  children, 
  schema, 
  defaultValues, 
  onSubmit 
}: ChallengeFormProviderProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
}
