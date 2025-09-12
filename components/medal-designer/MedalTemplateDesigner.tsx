'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Save, Eye, Palette, Code, Upload, Plus, Trash2 } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { MedalTemplate, MedalType, TemplateVariable, VariableType, CreateMedalTemplateDto, UpdateMedalTemplateDto } from '@/types/template';
import Modal from '@/components/common/Modal';
import dlv from 'dlv';

interface MedalTemplateDesignerProps {
  templateId?: string; // Nếu edit
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: MedalTemplate) => void;
}

// Validation schema
const medalTemplateSchema = z.object({
  name: z.string().min(1, 'Tên template là bắt buộc'),
  description: z.string().optional(),
  type: z.nativeEnum(MedalType),
  htmlTemplate: z.string().min(1, 'Template là bắt buộc'),
  iconImage: z.string().optional(),
  color: z.string().min(1, 'Màu sắc là bắt buộc'),
  isPublic: z.boolean().default(false),
});

type MedalTemplateFormData = z.infer<typeof medalTemplateSchema>;

const defaultHtmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <style>
    .medal {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: linear-gradient(45deg, #FFD700, #FFA500);
      border: 5px solid #FFD700;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #333;
      font-family: 'Arial', sans-serif;
      position: relative;
    }
    
    .medal-icon {
      font-size: 60px;
      margin-bottom: 10px;
    }
    
    .medal-text {
      font-size: 14px;
      font-weight: bold;
      text-align: center;
    }
    
    .medal-name {
      font-size: 16px;
      margin-bottom: 5px;
    }
    
    .medal-achievement {
      font-size: 12px;
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <div class="medal">
    <div class="medal-icon">🏆</div>
    <div class="medal-text">
      <div class="medal-name">{{medalName}}</div>
      <div class="medal-achievement">{{achievement}}</div>
    </div>
  </div>
</body>
</html>`;



const defaultVariables: TemplateVariable[] = [
  { name: 'medalName', label: 'Tên huy chương', type: VariableType.TEXT, required: true },
  { name: 'achievement', label: 'Thành tích', type: VariableType.ACHIEVEMENT, required: true },
];

export default function MedalTemplateDesigner({ 
  templateId, 
  isOpen, 
  onClose, 
  onSave 
}: MedalTemplateDesignerProps) {
  const [variables, setVariables] = useState<TemplateVariable[]>(defaultVariables);
  const [previewData, setPreviewData] = useState<Record<string, string>>({
    medalName: 'Huy chương vàng',
    achievement: 'Marathon 2025',
  });
  const { showToast } = useToast();

  // API hooks
  const [{ data: templateData, loading: templateLoading }, fetchTemplate] = useAxios<MedalTemplate>(
    templateId ? `/api/medal-templates/${templateId}` : '',
    { manual: true }
  );

  const [{ loading: createLoading }, createTemplate] = useAxios<MedalTemplate>(
    {
      url: '/api/medal-templates',
      method: 'POST'
    },
    { manual: true }
  );

  const [{ loading: updateLoading }, updateTemplate] = useAxios<MedalTemplate>(
    {
      url: templateId ? `/api/medal-templates/${templateId}` : '',
      method: 'PUT'
    },
    { manual: true }
  );

  // Preview sẽ được xử lý ở frontend, không cần API call

  // Form setup
  const form = useForm<MedalTemplateFormData>({
    resolver: zodResolver(medalTemplateSchema),
    defaultValues: {
      name: '',
      description: '',
      type: MedalType.GOLD,
      htmlTemplate: defaultHtmlTemplate,
      iconImage: '',
      color: '#FFD700',
      isPublic: false,
    },
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = form;
  const watchedHtml = watch('htmlTemplate');

  // Load template data if editing
  useEffect(() => {
    if (templateId && isOpen) {
      fetchTemplate();
    }
  }, [templateId, isOpen]);

  useEffect(() => {
    if (templateData) {
      reset({
        name: dlv(templateData, 'name', ''),
        description: dlv(templateData, 'description', ''),
        type: dlv(templateData, 'type', MedalType.GOLD),
        htmlTemplate: dlv(templateData, 'htmlTemplate', defaultHtmlTemplate),
        iconImage: dlv(templateData, 'iconImage', ''),
        color: dlv(templateData, 'color', '#FFD700'),
        isPublic: dlv(templateData, 'isPublic', false),
      });
      setVariables(dlv(templateData, 'variables', defaultVariables));
    }
  }, [templateData, reset]);

  const handleSave = async (data: MedalTemplateFormData) => {
    try {
      const templateData = {
        ...data,
        variables,
      };

      let response;
      if (templateId) {
        response = await updateTemplate({ data: templateData });
      } else {
        response = await createTemplate({ data: templateData });
      }

      if (dlv(response, 'data')) {
        showToast({
          type: 'success',
          message: 'Template đã được lưu thành công!',
          title: 'Thành công'
        });
        onSave(dlv(response, 'data'));
        onClose();
      }
    } catch (error) {
      console.error('Error saving template:', error);
      showToast({
        type: 'error',
        message: 'Có lỗi xảy ra khi lưu template',
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
    const updated = [...variables];
    updated[index] = { ...updated[index], [field]: value };
    setVariables(updated);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="7xl" title={templateId ? 'Chỉnh sửa Medal Template' : 'Tạo Medal Template mới'}>
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
                      <span className="label-text text-sm">Loại huy chương *</span>
                    </label>
                    <select className="select select-sm select-bordered" {...register('type')}>
                      <option value={MedalType.GOLD}>Vàng</option>
                      <option value={MedalType.SILVER}>Bạc</option>
                      <option value={MedalType.BRONZE}>Đồng</option>
                      <option value={MedalType.PARTICIPATION}>Tham gia</option>
                      <option value={MedalType.SPECIAL}>Đặc biệt</option>
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

                <div className="grid grid-cols-2 gap-3">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm">Màu chủ đạo *</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        className="w-8 h-8 border rounded"
                        {...register('color')}
                      />
                      <input
                        type="text"
                        className="input input-sm input-bordered flex-1"
                        {...register('color')}
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm">Hình ảnh icon</span>
                    </label>
                    <input
                      type="url"
                      className="input input-sm input-bordered"
                      placeholder="URL icon"
                      {...register('iconImage')}
                    />
                  </div>
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
                  disabled={createLoading || updateLoading}
                >
                  {(createLoading || updateLoading) ? (
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
