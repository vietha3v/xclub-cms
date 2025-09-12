'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { MedalTemplate, CreateMedalTemplateDto } from '@/types/template';
import { Plus, Search, Filter, Edit, Trash2, Download, X } from 'lucide-react';
import MedalTemplateDesigner from '@/components/medal-designer/MedalTemplateDesigner';
import MedalCard from '@/components/medal-designer/MedalCard';
import { useToast } from '@/components/Toast';
import dlv from 'dlv';

export default function MedalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isDesignerOpen, setIsDesignerOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MedalTemplate | null>(null);
  const { showToast } = useToast();

  // Fetch medal templates
  const [{ data: response, loading, error }, refetch] = useAxios<{ data: MedalTemplate[] }>(
    '/api/medal-templates',
    { manual: true }
  );

  // Delete template API
  const [, deleteTemplate] = useAxios(
    {
      url: '',
      method: 'DELETE'
    },
    { manual: true }
  );

  // Fetch data on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    setIsDesignerOpen(true);
  };

  const handleEditTemplate = (template: MedalTemplate) => {
    setEditingTemplate(template);
    setIsDesignerOpen(true);
  };

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa mẫu huy chương này?')) return;
    
    try {
      await deleteTemplate({
        url: `/api/medal-templates/${id}`,
        method: 'DELETE'
      });
      
      showToast({
        type: 'success',
        message: 'Đã xóa mẫu huy chương thành công',
        title: 'Thành công'
      });
      
      refetch();
    } catch (error) {
      console.error('Error deleting template:', error);
      showToast({
        type: 'error',
        message: 'Có lỗi xảy ra khi xóa mẫu huy chương',
        title: 'Lỗi'
      });
    }
  };


  const handleSaveTemplate = (template: MedalTemplate) => {
    console.log('Template saved:', template);
    setIsDesignerOpen(false);
    setEditingTemplate(null);
    refetch();
  };

  const templates = dlv(response, 'data', []);
  const filteredTemplates: MedalTemplate[] = templates.filter((template: MedalTemplate) =>
    dlv(template, 'name', '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    dlv(template, 'description', '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Thiết kế huy chương
          </h1>
          <p className="text-base-content/70">
            Tạo và quản lý các mẫu huy chương cho thử thách của bạn
          </p>
        </div>
        <button
          onClick={handleCreateTemplate}
          className="btn btn-primary mt-4 sm:mt-0"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tạo mẫu mới
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm mẫu huy chương..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
          </div>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn btn-outline"
        >
          <Filter className="w-5 h-5 mr-2" />
          Bộ lọc
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="card bg-base-200 p-4 mb-6">
          <h3 className="font-semibold mb-3">Bộ lọc</h3>
          <div className="flex flex-wrap gap-4">
            <select className="select select-bordered select-sm">
              <option value="">Tất cả loại</option>
              <option value="gold">Vàng</option>
              <option value="silver">Bạc</option>
              <option value="bronze">Đồng</option>
            </select>
            <select className="select select-bordered select-sm">
              <option value="">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error">
          <span>Lỗi khi tải dữ liệu: {error.message}</span>
        </div>
      )}

      {/* Templates Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template: MedalTemplate) => (
            <MedalCard
              key={template.id}
              template={template}
              onEdit={handleEditTemplate}
              onDelete={handleDeleteTemplate}
              onPreview={() => {}} // No preview function needed for medals
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏅</div>
          <h3 className="text-xl font-semibold mb-2">Chưa có mẫu huy chương nào</h3>
          <p className="text-base-content/70 mb-6">
            Tạo mẫu huy chương đầu tiên để bắt đầu thiết kế
          </p>
          <button
            onClick={handleCreateTemplate}
            className="btn btn-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Tạo mẫu mới
          </button>
        </div>
      )}

      {/* Medal Template Designer Modal */}
      <MedalTemplateDesigner
        templateId={editingTemplate?.id}
        isOpen={isDesignerOpen}
        onClose={() => {
          setIsDesignerOpen(false);
          setEditingTemplate(null);
        }}
        onSave={handleSaveTemplate}
      />
    </div>
  );
}
