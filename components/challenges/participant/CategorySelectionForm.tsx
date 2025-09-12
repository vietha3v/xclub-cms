'use client';

import React, { useState, useEffect } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { ChallengeCategory, CategorySelection, CategoryType } from '@/types/challenge-category';

interface CategorySelectionFormProps {
  challengeId: string;
  selectedCategories: CategorySelection[];
  onSelect: (selections: CategorySelection[]) => void;
  isRequired?: boolean;
  disabled?: boolean;
}

export default function CategorySelectionForm({
  challengeId,
  selectedCategories,
  onSelect,
  isRequired = false,
  disabled = false
}: CategorySelectionFormProps) {
  const [categories, setCategories] = useState<ChallengeCategory[]>([]);
  const [selections, setSelections] = useState<CategorySelection[]>(selectedCategories);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showToast } = useToast();

  // API hooks
  const [{ data: categoriesData, loading, error }, refetch] = useAxios<ChallengeCategory[]>(
    `/api/challenges/${challengeId}/categories`,
    { manual: true }
  );

  useEffect(() => {
    if (challengeId) {
      refetch();
    }
  }, [challengeId]);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData.filter(cat => cat.isActive));
    }
  }, [categoriesData]);

  useEffect(() => {
    setSelections(selectedCategories);
  }, [selectedCategories]);

  const handleCategoryChange = (categoryId: string, value: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;

    // Validate value
    const validationError = validateValue(category, value);
    if (validationError) {
      setErrors(prev => ({ ...prev, [categoryId]: validationError }));
      return;
    }

    // Clear error
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[categoryId];
      return newErrors;
    });

    // Update selection
    const newSelections = selections.filter(sel => sel.categoryId !== categoryId);
    newSelections.push({
      categoryId,
      value,
      unit: category.unit,
    });

    setSelections(newSelections);
    onSelect(newSelections);
  };

  const validateValue = (category: ChallengeCategory, value: number): string | null => {
    if (isNaN(value) || value < 0) {
      return 'Giá trị phải là số dương';
    }

    if (category.minValue !== undefined && value < category.minValue) {
      return `Giá trị tối thiểu là ${category.minValue} ${category.unit}`;
    }

    if (category.maxValue !== undefined && value > category.maxValue) {
      return `Giá trị tối đa là ${category.maxValue} ${category.unit}`;
    }

    return null;
  };

  const getSelectionValue = (categoryId: string): number => {
    const selection = selections.find(sel => sel.categoryId === categoryId);
    return selection?.value || 0;
  };

  const isSelectionValid = (category: ChallengeCategory): boolean => {
    const value = getSelectionValue(category.id);
    return !validateValue(category, value);
  };

  const getRequiredCategories = () => {
    return categories.filter(cat => cat.isRequired);
  };

  const getOptionalCategories = () => {
    return categories.filter(cat => !cat.isRequired);
  };

  const isFormValid = () => {
    const requiredCategories = getRequiredCategories();
    return requiredCategories.every(cat => {
      const value = getSelectionValue(cat.id);
      return value > 0 && isSelectionValid(cat);
    });
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

  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-base-content/60">Thử thách này chưa có danh mục nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Required Categories */}
      {getRequiredCategories().length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-error">
            Danh mục bắt buộc *
          </h3>
          <div className="space-y-4">
            {getRequiredCategories().map((category) => (
              <div key={category.id} className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    {category.name}
                    <span className="text-error ml-1">*</span>
                  </span>
                  <span className="label-text-alt text-base-content/70">
                    {category.unit}
                  </span>
                </label>
                
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    className={`input input-bordered flex-1 ${
                      errors[category.id] ? 'input-error' : ''
                    }`}
                    value={getSelectionValue(category.id)}
                    onChange={(e) => handleCategoryChange(category.id, Number(e.target.value))}
                    disabled={disabled}
                    min={category.minValue || 0}
                    max={category.maxValue || undefined}
                    step="0.1"
                    placeholder={`Nhập ${category.name.toLowerCase()}...`}
                  />
                  
                  <div className="flex items-center gap-1">
                    {getSelectionValue(category.id) > 0 && (
                      <>
                        {isSelectionValid(category) ? (
                          <Check className="w-5 h-5 text-success" />
                        ) : (
                          <X className="w-5 h-5 text-error" />
                        )}
                      </>
                    )}
                  </div>
                </div>

                {errors[category.id] && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4 text-error" />
                    <span className="text-sm text-error">{errors[category.id]}</span>
                  </div>
                )}

                {category.description && (
                  <div className="text-sm text-base-content/70 mt-1">
                    {category.description}
                  </div>
                )}

                {category.minValue !== undefined && category.maxValue !== undefined && (
                  <div className="text-sm text-base-content/60 mt-1">
                    Khoảng: {category.minValue} - {category.maxValue} {category.unit}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optional Categories */}
      {getOptionalCategories().length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Danh mục tùy chọn
          </h3>
          <div className="space-y-4">
            {getOptionalCategories().map((category) => (
              <div key={category.id} className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    {category.name}
                  </span>
                  <span className="label-text-alt text-base-content/70">
                    {category.unit}
                  </span>
                </label>
                
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    className={`input input-bordered flex-1 ${
                      errors[category.id] ? 'input-error' : ''
                    }`}
                    value={getSelectionValue(category.id)}
                    onChange={(e) => handleCategoryChange(category.id, Number(e.target.value))}
                    disabled={disabled}
                    min={category.minValue || 0}
                    max={category.maxValue || undefined}
                    step="0.1"
                    placeholder={`Nhập ${category.name.toLowerCase()}...`}
                  />
                  
                  <div className="flex items-center gap-1">
                    {getSelectionValue(category.id) > 0 && (
                      <>
                        {isSelectionValid(category) ? (
                          <Check className="w-5 h-5 text-success" />
                        ) : (
                          <X className="w-5 h-5 text-error" />
                        )}
                      </>
                    )}
                  </div>
                </div>

                {errors[category.id] && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4 text-error" />
                    <span className="text-sm text-error">{errors[category.id]}</span>
                  </div>
                )}

                {category.description && (
                  <div className="text-sm text-base-content/70 mt-1">
                    {category.description}
                  </div>
                )}

                {category.minValue !== undefined && category.maxValue !== undefined && (
                  <div className="text-sm text-base-content/60 mt-1">
                    Khoảng: {category.minValue} - {category.maxValue} {category.unit}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="card bg-base-100 border">
        <div className="card-body">
          <h4 className="card-title text-lg">Tóm tắt lựa chọn</h4>
          <div className="space-y-2">
            {selections.map((selection) => {
              const category = categories.find(cat => cat.id === selection.categoryId);
              if (!category) return null;

              return (
                <div key={selection.categoryId} className="flex items-center justify-between">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-base-content/70">
                    {selection.value} {selection.unit}
                  </span>
                </div>
              );
            })}
          </div>
          
          {selections.length === 0 && (
            <p className="text-base-content/60 text-center py-4">
              Chưa có danh mục nào được chọn
            </p>
          )}
        </div>
      </div>

      {/* Validation Status */}
      {isRequired && (
        <div className={`alert ${isFormValid() ? 'alert-success' : 'alert-warning'}`}>
          <div className="flex items-center gap-2">
            {isFormValid() ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>
              {isFormValid()
                ? 'Tất cả danh mục bắt buộc đã được điền đúng'
                : 'Vui lòng điền đầy đủ các danh mục bắt buộc'
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
