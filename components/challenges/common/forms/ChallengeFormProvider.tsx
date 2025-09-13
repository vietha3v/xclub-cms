'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { CreateChallengeDto } from '@/types/challenge';
import { useUnifiedChallengeContext } from '../UnifiedChallengeModal';
import { Plus } from 'lucide-react';

interface ChallengeFormProviderProps {
  children: React.ReactNode;
  schema: any;
  defaultValues: any;
}

export default function ChallengeFormProvider({
  children,
  schema,
  defaultValues
}: ChallengeFormProviderProps) {
  const { showToast } = useToast();
  const { onSuccess, onClose } = useUnifiedChallengeContext();

  // API hooks
  const [{ loading: apiLoading }, execute] = useAxios<CreateChallengeDto>(
    { url: '/api/challenges', method: 'POST' },
    { manual: true }
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // Hàm custom để tạo thử thách
  const handleCustomSubmit = async () => {
    const formData = form.getValues();
    console.log('🚀 ===== CUSTOM FORM SUBMIT DEBUG =====');
    console.log('📋 Form values:', formData);
    console.log('🔍 Form state:', {
      isDirty: form.formState.isDirty,
      isValid: form.formState.isValid,
      isSubmitting: form.formState.isSubmitting,
      isSubmitted: form.formState.isSubmitted,
      touchedFields: form.formState.touchedFields,
      dirtyFields: form.formState.dirtyFields,
      errors: form.formState.errors
    });
    console.log('📊 Form errors count:', Object.keys(form.formState.errors).length);
    
    if (Object.keys(form.formState.errors).length > 0) {
      console.warn('⚠️ Validation errors found:', form.formState.errors);
      showToast({
        type: 'error',
        message: 'Vui lòng kiểm tra lại thông tin form'
      });
      return;
    }
    
    // Xử lý thời gian ISO
    let processedStartDate = formData.startDate;
    let processedEndDate = formData.endDate;
    
    // Nếu có startTime và endTime, kết hợp với ngày để tạo ISO string
    if (formData.startTime) {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}:00.000Z`);
      processedStartDate = startDateTime.toISOString();
    }
    
    if (formData.endTime) {
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}:00.000Z`);
      processedEndDate = endDateTime.toISOString();
    }
    
    // Tính timeLimit tự động từ startDate và endDate
    const startDate = new Date(processedStartDate);
    const endDate = new Date(processedEndDate);
    const timeLimitDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const challengeData: CreateChallengeDto = {
      ...formData,
      startDate: processedStartDate, // Use processed ISO string
      endDate: processedEndDate,     // Use processed ISO string
      points: Number(formData?.points || 0),
      timeLimit: timeLimitDays,
      autoApprovalPassword: formData.autoApprovalPassword || undefined,
      // Team challenge: createdByClubId và invitedClubs với số lượng
      createdByClubId: formData.createdByClubId,
      invitedClubs: formData.invitedClubs || [],
    };

    console.log('📤 Processed challenge data:', challengeData);
    console.log('⏰ Time calculation:', {
      originalStartDate: formData.startDate,
      originalEndDate: formData.endDate,
      processedStartDate,
      processedEndDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      timeLimitDays
    });
    console.log('🏁 ===== END CUSTOM FORM SUBMIT DEBUG =====');

    // Gọi API tạo thử thách
    try {
      console.log('🚀 Calling API to create challenge...');
      const response = await execute({
        data: challengeData,
      });

      if (response.data) {
        console.log('✅ API response:', response.data);
        showToast({
          type: 'success',
          message: 'Tạo thử thách thành công!'
        });

        onSuccess?.(response.data);
        onClose?.();
      }
    } catch (error) {
      console.error('❌ Create challenge error:', error);
      console.error('🔍 Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        formState: form.formState,
        currentValues: form.getValues()
      });
      showToast({
        type: 'error',
        message: 'Có lỗi xảy ra khi tạo thử thách'
      });
    }
  };

  // Submit handler
  const onSubmit = async (data: any) => {
    try {
      // Log form state và validation
      console.log('🚀 ===== FORM SUBMIT DEBUG =====');
      console.log('📋 Form values:', data);
      console.log('🔍 Form state:', {
        isDirty: form.formState.isDirty,
        isValid: form.formState.isValid,
        isSubmitting: form.formState.isSubmitting,
        isSubmitted: form.formState.isSubmitted,
        touchedFields: form.formState.touchedFields,
        dirtyFields: form.formState.dirtyFields,
        errors: form.formState.errors
      });
      console.log('📊 Form errors count:', Object.keys(form.formState.errors).length);
      
      if (Object.keys(form.formState.errors).length > 0) {
        console.warn('⚠️ Validation errors found:', form.formState.errors);
      }
      
      // Xử lý thời gian ISO
      let processedStartDate = data.startDate;
      let processedEndDate = data.endDate;
      
      // Nếu có startTime và endTime, kết hợp với ngày để tạo ISO string
      if (data.startTime) {
        const startDateTime = new Date(`${data.startDate}T${data.startTime}:00.000Z`);
        processedStartDate = startDateTime.toISOString();
      }
      
      if (data.endTime) {
        const endDateTime = new Date(`${data.endDate}T${data.endTime}:00.000Z`);
        processedEndDate = endDateTime.toISOString();
      }
      
      // Tính timeLimit tự động từ startDate và endDate
      const startDate = new Date(processedStartDate);
      const endDate = new Date(processedEndDate);
      const timeLimitDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const challengeData: CreateChallengeDto = {
        ...data,
        startDate: processedStartDate,
        endDate: processedEndDate,
        points: Number(data?.points || 0),
        timeLimit: timeLimitDays,
        autoApprovalPassword: data.autoApprovalPassword || undefined,
        // Team challenge: createdByClubId và invitedClubs với số lượng
        createdByClubId: data.createdByClubId,
        invitedClubs: data.invitedClubs || [],
      };

      console.log('📤 Processed challenge data:', challengeData);
      console.log('⏰ Time calculation:', {
        originalStartDate: data.startDate,
        originalEndDate: data.endDate,
        processedStartDate,
        processedEndDate,
        startTime: data.startTime,
        endTime: data.endTime,
        timeLimitDays
      });
      console.log('🏁 ===== END FORM SUBMIT DEBUG =====');

      const response = await execute({
        data: challengeData,
      });

      if (response.data) {
        console.log('✅ API response:', response.data);
        showToast({
          type: 'success',
          message: 'Tạo thử thách thành công!'
        });

        onSuccess?.(response.data);
        onClose?.();
      }
    } catch (error) {
      console.error('❌ Create challenge error:', error);
      console.error('🔍 Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        formState: form.formState,
        currentValues: form.getValues()
      });
      showToast({
        type: 'error',
        message: 'Có lỗi xảy ra khi tạo thử thách'
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {children}
        
        {/* Submit Button */}
        <div className="form-section flex justify-end items-center gap-3 pt-6 border-t border-base-300">
          <button
            type="button"
            onClick={handleCustomSubmit}
            disabled={apiLoading}
            className="btn btn-primary btn-sm"
          >
            {apiLoading ? (
              <>
                <span className="loading loading-spinner loading-xs mr-1"></span>
                Đang tạo...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-1" />
                Tạo thử thách
              </>
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
