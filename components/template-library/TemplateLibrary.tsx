'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Copy, Download } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { MedalTemplate, CertificateTemplate, MedalType, CertificateType } from '@/types/template';
import Modal from '@/components/common/Modal';

interface TemplateLibraryProps {
  type: 'medal' | 'certificate';
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: MedalTemplate | CertificateTemplate) => void;
  onEdit: (template: MedalTemplate | CertificateTemplate) => void;
  onDelete: (templateId: string) => void;
  onCreate: () => void;
}

export default function TemplateLibrary({
  type,
  isOpen,
  onClose,
  onSelect,
  onEdit,
  onDelete,
  onCreate
}: TemplateLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPublic, setFilterPublic] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<MedalTemplate | CertificateTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { showToast } = useToast();

  // API hooks
  const [{ data: templates, loading, error }, refetch] = useAxios<(MedalTemplate | CertificateTemplate)[]>(
    `/api/${type}-templates`,
    { manual: true }
  );

  const [, deleteTemplate] = useAxios(
    '',
    { method: 'DELETE', manual: true }
  );

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, type]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (filterType !== 'all') params.append('type', filterType);
    if (filterPublic !== 'all') params.append('isPublic', filterPublic);
    
    refetch({ params: Object.fromEntries(params) });
  };

  const handleDelete = async (templateId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa template này?')) return;

    try {
      await deleteTemplate({ url: `/api/${type}-templates/${templateId}` });
      showToast('Template đã được xóa thành công!', 'success');
      refetch();
    } catch (error) {
      console.error('Error deleting template:', error);
      showToast('Có lỗi xảy ra khi xóa template', 'error');
    }
  };

  const handlePreview = (template: MedalTemplate | CertificateTemplate) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleCopy = (template: MedalTemplate | CertificateTemplate) => {
    // Copy template logic
    showToast('Template đã được sao chép!', 'success');
  };

  const handleDownload = (template: MedalTemplate | CertificateTemplate) => {
    // Download template logic
    showToast('Template đã được tải xuống!', 'success');
  };

  const filteredTemplates = templates?.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || template.type === filterType;
    const matchesPublic = filterPublic === 'all' || 
                         (filterPublic === 'public' && template.isPublic) ||
                         (filterPublic === 'private' && !template.isPublic);
    
    return matchesSearch && matchesType && matchesPublic;
  }) || [];

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">
            Thư viện {type === 'medal' ? 'Huy chương' : 'Chứng chỉ'}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={onCreate}
              className="btn btn-primary"
            >
              <Plus className="w-4 h-4" />
              Tạo mới
            </button>
            <button
              onClick={onClose}
              className="btn btn-ghost"
            >
              Đóng
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b">
          <div className="flex gap-4">
            <div className="form-control flex-1">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Tìm kiếm template..."
                  className="input input-bordered flex-1"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button
                  onClick={handleFilter}
                  className="btn btn-square"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="form-control">
              <select
                className="select select-bordered"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">Tất cả loại</option>
                {type === 'medal' ? (
                  <>
                    <option value={MedalType.GOLD}>Vàng</option>
                    <option value={MedalType.SILVER}>Bạc</option>
                    <option value={MedalType.BRONZE}>Đồng</option>
                    <option value={MedalType.PARTICIPATION}>Tham gia</option>
                    <option value={MedalType.SPECIAL}>Đặc biệt</option>
                  </>
                ) : (
                  <>
                    <option value={CertificateType.COMPLETION}>Hoàn thành</option>
                    <option value={CertificateType.ACHIEVEMENT}>Thành tích</option>
                    <option value={CertificateType.PARTICIPATION}>Tham gia</option>
                    <option value={CertificateType.WINNER}>Chiến thắng</option>
                  </>
                )}
              </select>
            </div>

            <div className="form-control">
              <select
                className="select select-bordered"
                value={filterPublic}
                onChange={(e) => setFilterPublic(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="public">Công khai</option>
                <option value="private">Riêng tư</option>
              </select>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-error">Có lỗi xảy ra khi tải templates</p>
              <button
                onClick={() => refetch()}
                className="btn btn-outline mt-4"
              >
                Thử lại
              </button>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-base-content/60">Không tìm thấy template nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <div key={template.id} className="card bg-base-100 border shadow-sm">
                  <div className="card-body">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="card-title text-lg">{template.name}</h3>
                        {template.description && (
                          <p className="text-sm text-base-content/70 mt-1">
                            {template.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handlePreview(template)}
                          className="btn btn-ghost btn-sm"
                          title="Xem trước"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEdit(template)}
                          className="btn btn-ghost btn-sm"
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(template.id)}
                          className="btn btn-ghost btn-sm text-error"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="badge badge-outline">
                          {template.type}
                        </span>
                        {template.isPublic ? (
                          <span className="badge badge-success">Công khai</span>
                        ) : (
                          <span className="badge badge-warning">Riêng tư</span>
                        )}
                      </div>

                      <div className="text-sm text-base-content/60">
                        {template.variables.length} biến template
                      </div>

                      <div className="text-sm text-base-content/60">
                        Tạo: {new Date(template.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    </div>

                    <div className="card-actions justify-end mt-4">
                      <button
                        onClick={() => onSelect(template)}
                        className="btn btn-primary btn-sm"
                      >
                        Chọn
                      </button>
                      <button
                        onClick={() => handleCopy(template)}
                        className="btn btn-outline btn-sm"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(template)}
                        className="btn btn-outline btn-sm"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && selectedTemplate && (
        <Modal isOpen={showPreview} onClose={() => setShowPreview(false)} size="lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Xem trước template</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="btn btn-ghost btn-sm"
              >
                Đóng
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Tên: {selectedTemplate.name}</h4>
                {selectedTemplate.description && (
                  <p className="text-sm text-base-content/70">
                    {selectedTemplate.description}
                  </p>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-2">HTML Template:</h4>
                <pre className="bg-base-200 p-4 rounded text-sm overflow-x-auto max-h-64">
                  {selectedTemplate.htmlTemplate}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">CSS Styles:</h4>
                <pre className="bg-base-200 p-4 rounded text-sm overflow-x-auto max-h-64">
                  {selectedTemplate.cssStyles}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Biến template:</h4>
                <div className="space-y-1">
                  {selectedTemplate.variables.map((variable, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="badge badge-outline">{variable.name}</span>
                      <span className="text-sm">{variable.label}</span>
                      <span className="text-xs text-base-content/60">({variable.type})</span>
                      {variable.required && (
                        <span className="text-xs text-error">*</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Modal>
  );
}
