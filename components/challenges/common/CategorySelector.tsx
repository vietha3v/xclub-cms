'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, GripVertical, Save, X } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { ChallengeCategory, CategoryType, CreateChallengeCategoryDto, PREDEFINED_CATEGORIES } from '@/types/challenge-category';
import Modal from '@/components/common/Modal';

interface CategorySelectorProps {
  challengeId: string;
  selectedCategories: string[];
  onSelect: (categoryIds: string[]) => void;
  onEdit: (category: ChallengeCategory) => void;
  onCreate: () => void;
  onDelete: (categoryId: string) => void;
  isEditable?: boolean;
}

export default function CategorySelector({
  challengeId,
  selectedCategories,
  onSelect,
  onEdit,
  onCreate,
  onDelete,
  isEditable = false
}: CategorySelectorProps) {
  const [categories, setCategories] = useState<ChallengeCategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ChallengeCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ChallengeCategory | null>(null);
  const [newCategory, setNewCategory] = useState<CreateChallengeCategoryDto>({
    name: '',
    description: '',
    type: CategoryType.DISTANCE,
    unit: 'km',
    minValue: 0,
    maxValue: 100,
    isRequired: false,
    isActive: true,
    sortOrder: 0,
  });
  const { showToast } = useToast();

  // API hooks
  const [{ data: categoriesData, loading, error }, refetch] = useAxios<ChallengeCategory[]>(
    `/api/challenges/${challengeId}/categories`,
    { manual: true }
  );

  const [, createCategory] = useAxios<ChallengeCategory>(
    `/api/challenges/${challengeId}/categories`,
    { method: 'POST', manual: true }
  );

  const [, updateCategory] = useAxios<ChallengeCategory>(
    '',
    { method: 'PUT', manual: true }
  );

  const [, deleteCategory] = useAxios(
    '',
    { method: 'DELETE', manual: true }
  );

  useEffect(() => {
    if (challengeId) {
      refetch();
    }
  }, [challengeId]);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
      setFilteredCategories(categoriesData);
    }
  }, [categoriesData]);

  useEffect(() => {
    filterCategories();
  }, [searchTerm, filterType, categories]);

  const filterCategories = () => {
    let filtered = categories;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(category => category.type === filterType);
    }

    setFilteredCategories(filtered);
  };

  const handleCategorySelect = (category: ChallengeCategory) => {
    const isSelected = selectedCategories.includes(category.id);
    let newSelection: string[];

    if (isSelected) {
      newSelection = selectedCategories.filter(id => id !== category.id);
    } else {
      newSelection = [...selectedCategories, category.id];
    }

    onSelect(newSelection);
  };

  const handleCreateCategory = async () => {
    try {
      const response = await createCategory({ data: newCategory });
      if (response.data) {
        setShowCreateModal(false);
        setNewCategory({
          name: '',
          description: '',
          type: CategoryType.DISTANCE,
          unit: 'km',
          minValue: 0,
          maxValue: 100,
          isRequired: false,
          isActive: true,
          sortOrder: 0,
        });
        refetch();
        showToast('Danh mục đã được tạo thành công!', 'success');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      showToast('Có lỗi xảy ra khi tạo danh mục', 'error');
    }
  };

  const handleUpdateCategory = async (category: ChallengeCategory) => {
    try {
      const response = await updateCategory({
        url: `/api/challenges/${challengeId}/categories/${category.id}`,
        data: category
      });
      if (response.data) {
        setEditingCategory(null);
        refetch();
        showToast('Danh mục đã được cập nhật thành công!', 'success');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      showToast('Có lỗi xảy ra khi cập nhật danh mục', 'error');
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return;

    try {
      await deleteCategory({ url: `/api/challenges/${challengeId}/categories/${categoryId}` });
      refetch();
      showToast('Danh mục đã được xóa thành công!', 'success');
    } catch (error) {
      console.error('Error deleting category:', error);
      showToast('Có lỗi xảy ra khi xóa danh mục', 'error');
    }
  };

  const handlePredefinedCategory = (type: CategoryType, template: any) => {
    setNewCategory({
      name: template.name,
      description: `${template.name} - ${template.unit}`,
      type: type,
      unit: template.unit,
      minValue: template.minValue,
      maxValue: template.maxValue,
      isRequired: false,
      isActive: true,
      sortOrder: categories.length,
    });
    setShowCreateModal(true);
  };

  const getSelectedCategories = () => {
    return categories.filter(category => selectedCategories.includes(category.id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-error">Có lỗi xảy ra khi tải danh mục</p>
        <button
          onClick={() => refetch()}
          className="btn btn-outline mt-4"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="form-control flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm danh mục..."
            className="input input-bordered"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="form-control">
          <select
            className="select select-bordered"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Tất cả loại</option>
            <option value={CategoryType.DISTANCE}>Khoảng cách</option>
            <option value={CategoryType.TIME}>Thời gian</option>
            <option value={CategoryType.REPETITION}>Lặp lại</option>
            <option value={CategoryType.CUSTOM}>Tùy chỉnh</option>
          </select>
        </div>

        {isEditable && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4 mr-1" />
            Tạo mới
          </button>
        )}
      </div>

      {/* Predefined Categories */}
      {isEditable && (
        <div className="space-y-2">
          <h4 className="font-semibold">Danh mục có sẵn:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {Object.entries(PREDEFINED_CATEGORIES).map(([type, templates]) => (
              <div key={type} className="space-y-1">
                <h5 className="text-sm font-medium capitalize">{type}</h5>
                {templates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => handlePredefinedCategory(type as CategoryType, template)}
                    className="btn btn-outline btn-sm w-full text-xs"
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Categories */}
      {selectedCategories.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold">Danh mục đã chọn:</h4>
          <div className="flex flex-wrap gap-2">
            {getSelectedCategories().map((category) => (
              <div key={category.id} className="badge badge-primary gap-2">
                {category.name} ({category.unit})
                <button
                  onClick={() => handleCategorySelect(category)}
                  className="btn btn-ghost btn-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className={`card bg-base-100 border shadow-sm cursor-pointer transition-all ${
              selectedCategories.includes(category.id)
                ? 'ring-2 ring-primary bg-primary/5'
                : 'hover:shadow-md'
            }`}
            onClick={() => handleCategorySelect(category)}
          >
            <div className="card-body">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="card-title text-lg">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-base-content/70 mt-1">
                      {category.description}
                    </p>
                  )}
                </div>
                {isEditable && (
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCategory(category);
                      }}
                      className="btn btn-ghost btn-sm"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category.id);
                      }}
                      className="btn btn-ghost btn-sm text-error"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="badge badge-outline">
                    {category.type}
                  </span>
                  <span className="badge badge-secondary">
                    {category.unit}
                  </span>
                  {category.isRequired && (
                    <span className="badge badge-warning">Bắt buộc</span>
                  )}
                </div>

                <div className="text-sm text-base-content/60">
                  {category.minValue !== undefined && category.maxValue !== undefined
                    ? `${category.minValue} - ${category.maxValue} ${category.unit}`
                    : `Tùy chỉnh ${category.unit}`
                  }
                </div>
              </div>

              <div className="card-actions justify-end mt-4">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Chọn</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategorySelect(category)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-8">
          <p className="text-base-content/60">Không tìm thấy danh mục nào</p>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal isOpen={showCreateModal || editingCategory !== null} onClose={() => {
        setShowCreateModal(false);
        setEditingCategory(null);
      }} size="md">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">
            {editingCategory ? 'Chỉnh sửa danh mục' : 'Tạo danh mục mới'}
          </h3>

          <form onSubmit={(e) => {
            e.preventDefault();
            if (editingCategory) {
              handleUpdateCategory(editingCategory);
            } else {
              handleCreateCategory();
            }
          }} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tên danh mục *</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={editingCategory?.name || newCategory.name}
                onChange={(e) => {
                  if (editingCategory) {
                    setEditingCategory({ ...editingCategory, name: e.target.value });
                  } else {
                    setNewCategory({ ...newCategory, name: e.target.value });
                  }
                }}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Mô tả</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                rows={3}
                value={editingCategory?.description || newCategory.description}
                onChange={(e) => {
                  if (editingCategory) {
                    setEditingCategory({ ...editingCategory, description: e.target.value });
                  } else {
                    setNewCategory({ ...newCategory, description: e.target.value });
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Loại *</span>
                </label>
                <select
                  className="select select-bordered"
                  value={editingCategory?.type || newCategory.type}
                  onChange={(e) => {
                    if (editingCategory) {
                      setEditingCategory({ ...editingCategory, type: e.target.value as CategoryType });
                    } else {
                      setNewCategory({ ...newCategory, type: e.target.value as CategoryType });
                    }
                  }}
                  required
                >
                  <option value={CategoryType.DISTANCE}>Khoảng cách</option>
                  <option value={CategoryType.TIME}>Thời gian</option>
                  <option value={CategoryType.REPETITION}>Lặp lại</option>
                  <option value={CategoryType.CUSTOM}>Tùy chỉnh</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Đơn vị *</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={editingCategory?.unit || newCategory.unit}
                  onChange={(e) => {
                    if (editingCategory) {
                      setEditingCategory({ ...editingCategory, unit: e.target.value });
                    } else {
                      setNewCategory({ ...newCategory, unit: e.target.value });
                    }
                  }}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Giá trị tối thiểu</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={editingCategory?.minValue || newCategory.minValue}
                  onChange={(e) => {
                    const value = e.target.value ? Number(e.target.value) : undefined;
                    if (editingCategory) {
                      setEditingCategory({ ...editingCategory, minValue: value });
                    } else {
                      setNewCategory({ ...newCategory, minValue: value });
                    }
                  }}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Giá trị tối đa</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={editingCategory?.maxValue || newCategory.maxValue}
                  onChange={(e) => {
                    const value = e.target.value ? Number(e.target.value) : undefined;
                    if (editingCategory) {
                      setEditingCategory({ ...editingCategory, maxValue: value });
                    } else {
                      setNewCategory({ ...newCategory, maxValue: value });
                    }
                  }}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Bắt buộc</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={editingCategory?.isRequired || newCategory.isRequired}
                  onChange={(e) => {
                    if (editingCategory) {
                      setEditingCategory({ ...editingCategory, isRequired: e.target.checked });
                    } else {
                      setNewCategory({ ...newCategory, isRequired: e.target.checked });
                    }
                  }}
                />
              </label>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingCategory(null);
                }}
                className="btn btn-ghost"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                <Save className="w-4 h-4 mr-1" />
                {editingCategory ? 'Cập nhật' : 'Tạo mới'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
