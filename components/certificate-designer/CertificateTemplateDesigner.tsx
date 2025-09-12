'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Save, Plus, Trash2 } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { CertificateTemplate, CertificateType, TemplateVariable, VariableType, CreateCertificateTemplateDto, UpdateCertificateTemplateDto } from '@/types/template';
import Modal from '@/components/common/Modal';
import dlv from 'dlv';

interface CertificateTemplateDesignerProps {
  templateId?: string; // Nếu edit
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: CertificateTemplate) => void;
}

// Validation schema
const certificateTemplateSchema = z.object({
  name: z.string().min(1, 'Tên template là bắt buộc'),
  description: z.string().optional(),
  type: z.nativeEnum(CertificateType),
  htmlTemplate: z.string().min(1, 'Template là bắt buộc'),
  isPublic: z.boolean().default(false),
});

type CertificateTemplateFormData = z.infer<typeof certificateTemplateSchema>;

const defaultHtmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <style>
    .certificate {
      width: 800px;
      height: 600px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: 10px solid #FFD700;
      position: relative;
      font-family: 'Arial', sans-serif;
    }
    
    .header {
      text-align: center;
      padding: 20px;
      color: white;
    }
    
    .title {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    
    .subtitle {
      font-size: 18px;
      opacity: 0.9;
    }
    
    .content {
      text-align: center;
      padding: 40px;
      color: white;
    }
    
    .participant-name {
      font-size: 28px;
      font-weight: bold;
      margin: 20px 0;
      color: #FFD700;
    }
    
    .achievement {
      font-size: 20px;
      margin: 20px 0;
    }
    
    .date {
      font-size: 16px;
      margin-top: 30px;
    }
    
    .rank {
      font-size: 24px;
      font-weight: bold;
      color: #FFD700;
      margin: 20px 0;
    }
    
    .footer {
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      text-align: center;
      color: white;
    }
    
    .signature {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="header">
      <div class="title">GIẤY CHỨNG NHẬN</div>
      <div class="subtitle">Certificate of Achievement</div>
    </div>
    
    <div class="content">
      <p>Đây là để chứng nhận rằng</p>
      <div class="participant-name">{{participantName}}</div>
      <p>đã hoàn thành thành công</p>
      <div class="achievement">{{challengeName}}</div>
      <p>với thành tích</p>
      <div class="rank">{{achievement}}</div>
      <div class="date">Ngày {{completionDate}}</div>
    </div>
    
    <div class="footer">
      <div class="signature">
        <p>Chữ ký</p>
        <p>Người ký</p>
      </div>
    </div>
  </div>
</body>
</html>`;

const defaultVariables: TemplateVariable[] = [
  { name: 'participantName', label: 'Tên người tham gia', type: VariableType.PARTICIPANT_NAME, required: true },
  { name: 'challengeName', label: 'Tên thử thách', type: VariableType.CHALLENGE_NAME, required: true },
  { name: 'achievement', label: 'Thành tích', type: VariableType.ACHIEVEMENT, required: true },
  { name: 'completionDate', label: 'Ngày hoàn thành', type: VariableType.COMPLETION_DATE, required: true },
];

export default function CertificateTemplateDesigner({
  templateId,
  isOpen,
  onClose,
  onSave,
}: CertificateTemplateDesignerProps) {
  const { showToast } = useToast();
  const [variables, setVariables] = useState<TemplateVariable[]>(defaultVariables);
  const [previewData, setPreviewData] = useState<Record<string, string>>({
    participantName: 'Nguyễn Văn A',
    challengeName: 'Thử thách chạy bộ 5K',
    achievement: 'Hạng nhất',
    completionDate: '15/12/2024',
  });

  const form = useForm<CertificateTemplateFormData>({
    resolver: zodResolver(certificateTemplateSchema),
    defaultValues: {
    name: '',
    description: '',
    type: CertificateType.COMPLETION,
    htmlTemplate: defaultHtmlTemplate,
    isPublic: false,
    },
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = form;
  const watchedHtml = watch('htmlTemplate');



  const [{ data: templateData, loading: templateLoading, error: templateError }, refetchTemplate] = useAxios<CertificateTemplate>(
    templateId ? `/api/certificate-templates/${templateId}` : null,
    { manual: true }
  );

  // Load template data if editing
  useEffect(() => {
    if (templateId && isOpen) {
      refetchTemplate();
    }
  }, [templateId, isOpen, refetchTemplate]);

  useEffect(() => {
    if (templateData) {
      reset({
        name: templateData.name,
        description: templateData.description,
        type: templateData.type,
        htmlTemplate: templateData.htmlTemplate,
        isPublic: templateData.isPublic,
      });
      setVariables(templateData.variables);
    }
  }, [templateData, reset]);

  const [{ loading: saveLoading }, executeSave] = useAxios<CertificateTemplate>(
    {
      url: '',
      method: 'POST'
    },
    { manual: true }
  );

  const handleSave = async (data: CertificateTemplateFormData) => {
    try {
      const templateData = {
        ...data,
        variables,
      };

      const url = templateId ? `/api/certificate-templates/${templateId}` : '/api/certificate-templates';
      const method = templateId ? 'PUT' : 'POST';
      
      const response = await executeSave({
        url,
        method,
        data: templateData
      });

      onSave(response.data);
      onClose();
      showToast({
        type: 'success',
        message: templateId ? 'Cập nhật template thành công!' : 'Tạo template thành công!',
        title: 'Thành công'
      });
    } catch (error: any) {
      console.error('Error saving template:', error);
      showToast({
        type: 'error',
        message: error.response?.data?.message || 'Có lỗi xảy ra khi lưu template',
        title: 'Lỗi'
      });
    }
  };

  const generatePreviewHtml = () => {
    const formData = form.getValues();
    let html = formData.htmlTemplate;
    
    // Replace variables in HTML template
    variables.forEach(variable => {
      const value = dlv(previewData, variable.name, `{{${variable.name}}}`);
      const regex = new RegExp(`{{${variable.name}}}`, 'g');
      html = html.replace(regex, value);
    });
    
    return html;
  };

  const addVariable = () => {
    const newVariable: TemplateVariable = {
      name: `variable${variables.length + 1}`,
      label: `Biến ${variables.length + 1}`,
      type: VariableType.TEXT,
      required: false,
    };
    setVariables([...variables, newVariable]);
  };

  const removeVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const updateVariable = (index: number, field: keyof TemplateVariable, value: any) => {
    const updated = variables.map((variable, i) => 
      i === index ? { ...variable, [field]: value } : variable
    );
    setVariables(updated);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="7xl" title={templateId ? 'Chỉnh sửa Giấy chứng nhận Template' : 'Tạo Giấy chứng nhận Template mới'}>
      <div className="flex flex-col h-full">
        {/* Top Row - Preview */}
        <div className="h-1/2 border-b border-base-300 p-4">
          <h3 className="text-lg font-semibold mb-3">Xem trước</h3>
          <div className="h-full bg-base-200 rounded-lg p-4 overflow-auto transition-all duration-300 hover:shadow-lg">
            <div 
              className="w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out"
              dangerouslySetInnerHTML={{ __html: generatePreviewHtml() }}
            />
          </div>
        </div>

        {/* Bottom Row - Template Editor and Variables */}
        <div className="h-1/2 flex flex-col lg:flex-row">
          {/* Left Panel - Template Editor */}
          <div className="flex-1 p-4 lg:border-r border-base-300 overflow-y-auto">
            <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
              {/* Basic Info */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Thông tin cơ bản</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm">Tên template *</span>
                    </label>
                    <input
                      type="text"
                      className="input input-sm input-bordered"
                      {...register('name')}
                    />
                    {errors.name && (
                      <span className="label-text-alt text-error text-xs">{errors.name.message}</span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm">Loại giấy chứng nhận *</span>
                    </label>
                    <select className="select select-sm select-bordered" {...register('type')}>
                      <option value={CertificateType.COMPLETION}>Hoàn thành</option>
                      <option value={CertificateType.ACHIEVEMENT}>Thành tích</option>
                      <option value={CertificateType.PARTICIPATION}>Tham gia</option>
                      <option value={CertificateType.WINNER}>Chiến thắng</option>
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-sm">Mô tả</span>
                  </label>
                  <textarea
                    className="textarea textarea-sm textarea-bordered"
                    rows={2}
                    {...register('description')}
                  />
                </div>


                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text text-sm">Chia sẻ công khai</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-sm toggle-primary"
                      {...register('isPublic')}
                    />
                  </label>
                </div>
              </div>

              {/* HTML Template Editor */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">HTML Template</h3>
                <textarea
                  className="textarea textarea-bordered w-full h-40 font-mono text-sm"
                  value={watchedHtml}
                  onChange={(e) => setValue('htmlTemplate', e.target.value)}
                  placeholder="Nhập HTML template..."
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={saveLoading}
                >
                  {saveLoading ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {templateId ? 'Cập nhật' : 'Tạo mới'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Panel - Variables */}
          <div className="w-full lg:w-1/3 p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Variables Management */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Biến template</h3>
                  <button
                    type="button"
                    onClick={addVariable}
                    className="btn btn-sm btn-primary"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm biến
                  </button>
                </div>

                <div className="space-y-2">
                  {variables.map((variable, index) => (
                    <div key={index} className="card bg-base-100 border">
                      <div className="card-body p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">Biến {index + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeVariable(index)}
                            className="btn btn-xs btn-ghost text-error"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text text-xs">Tên biến</span>
                            </label>
                            <input
                              type="text"
                              className="input input-xs input-bordered"
                              value={variable.name}
                              onChange={(e) => updateVariable(index, 'name', e.target.value)}
                            />
                          </div>
                          
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text text-xs">Nhãn hiển thị</span>
                            </label>
                            <input
                              type="text"
                              className="input input-xs input-bordered"
                              value={variable.label}
                              onChange={(e) => updateVariable(index, 'label', e.target.value)}
                            />
                          </div>
                          
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text text-xs">Loại</span>
                            </label>
                            <select
                              className="select select-xs select-bordered"
                              value={variable.type}
                              onChange={(e) => updateVariable(index, 'type', e.target.value)}
                            >
                              <option value={VariableType.TEXT}>Text</option>
                              <option value={VariableType.NUMBER}>Number</option>
                              <option value={VariableType.DATE}>Date</option>
                              <option value={VariableType.RANK}>Rank</option>
                              <option value={VariableType.ACHIEVEMENT}>Achievement</option>
                              <option value={VariableType.CHALLENGE_NAME}>Challenge Name</option>
                              <option value={VariableType.PARTICIPANT_NAME}>Participant Name</option>
                              <option value={VariableType.TEAM_NAME}>Team Name</option>
                              <option value={VariableType.COMPLETION_DATE}>Completion Date</option>
                              <option value={VariableType.SCORE}>Score</option>
                              <option value={VariableType.DISTANCE}>Distance</option>
                              <option value={VariableType.TIME}>Time</option>
                            </select>
                          </div>
                          
                          <div className="form-control">
                            <label className="label cursor-pointer">
                              <span className="label-text text-xs">Bắt buộc</span>
                              <input
                                type="checkbox"
                                className="toggle toggle-xs"
                                checked={variable.required}
                                onChange={(e) => updateVariable(index, 'required', e.target.checked)}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview Data */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Dữ liệu preview</h3>
                <div className="space-y-2">
                  {variables.map((variable, index) => (
                    <div key={index} className="form-control">
                      <label className="label">
                        <span className="label-text text-sm">{variable.label}</span>
                      </label>
                      <input
                        type="text"
                        className="input input-sm input-bordered"
                        value={dlv(previewData, variable.name, '')}
                        onChange={(e) => setPreviewData({
                          ...previewData,
                          [variable.name]: e.target.value
                        })}
                        placeholder={`Nhập ${dlv(variable, 'label', '').toLowerCase()}...`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}