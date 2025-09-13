'use client';

import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import useAxios from '@/hooks/useAxios';
import dlv from 'dlv';
import { CertificateTemplate } from '@/types/template';
import CertificatePreview from '@/components/certificate-designer/CertificatePreview';

export default function CertificateTemplateSelector() {
  const { setValue, watch } = useFormContext();
  const [templates, setTemplates] = useState<CertificateTemplate[]>([]);

  // API hooks
  const [{ data: response, loading, error }, refetch] = useAxios<{ data: CertificateTemplate[] }>(
    '/api/certificate-templates',
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (response) {
      const templates = dlv(response, 'data', []);
      setTemplates(templates);
    }
  }, [response]);

  const selectedTemplateIds = watch('certificateTemplateIds') || [];
  const selectedTemplateId = selectedTemplateIds[0];
  
  const handleRadioChange = (templateId: string) => {
    setValue('certificateTemplateIds', [templateId]);
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <label className="label">
          <span className="label-text font-medium">Chọn giấy chứng nhận</span>
        </label>
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-3">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <span className="text-base-content/70 animate-pulse">Đang tải danh sách giấy chứng nhận...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-3">
        <label className="label">
          <span className="label-text font-medium">Chọn giấy chứng nhận</span>
        </label>
        <div className="alert alert-error shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h3 className="font-bold">Lỗi tải dữ liệu</h3>
            <div className="text-xs">Không thể tải danh sách giấy chứng nhận. Vui lòng thử lại sau.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="label">
        <span className="label-text font-medium">Chọn giấy chứng nhận</span>
      </label>

      {(!templates || templates.length === 0) ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-base-content/70 mb-2">Chưa có giấy chứng nhận nào</h3>
          <p className="text-sm text-base-content/50 mb-4">Hãy tạo giấy chứng nhận mới để sử dụng trong thử thách</p>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => window.open('/design/certificates', '_blank')}
          >
            Tạo giấy chứng nhận mới
          </button>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent pb-2 snap-x snap-mandatory">
          {templates?.map((template: any, index: number) => (
            <div
              key={template.id}
              className={`relative card bg-base-100 border shadow-sm cursor-pointer transition-all duration-300 rounded-xl transform hover:scale-105 hover:-translate-y-1 snap-start flex-shrink-0 animate-fade-in-up ${
                selectedTemplateId === template.id
                  ? 'ring-2 ring-primary bg-primary/5 border-primary scale-105 shadow-lg'
                  : 'border-base-300 hover:shadow-lg hover:border-primary/50'
              }`}
              onClick={() => handleRadioChange(template.id)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Radio Button - Top Right Corner */}
              <div className="absolute top-2 right-2 z-10">
                <input
                  type="radio"
                  name="certificate-template"
                  className="radio radio-primary radio-sm"
                  checked={selectedTemplateId === template.id}
                  onChange={() => handleRadioChange(template.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="card-body p-0 text-center min-w-[120px]">
                {/* Certificate Preview - Tràn viền, 16:9 ratio */}
                <div className="flex justify-center mb-2">
                  <div className="w-24 h-14 overflow-hidden rounded-lg">
                    <CertificatePreview 
                      template={template} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="px-3 pb-3">
                  <h4 className="font-medium text-xs truncate">{template.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}