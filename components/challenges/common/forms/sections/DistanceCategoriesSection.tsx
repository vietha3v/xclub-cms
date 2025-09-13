'use client';

import React, { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { ChallengeType } from '@/types/challenge';
import { Plus, Trash2 } from 'lucide-react';

interface DistanceCategory {
  id: string;
  value: number;
  unit: string;
  name?: string;
  difficulty: string;
}

export default function DistanceCategoriesSection() {
  const { register, formState: { errors }, watch, setValue, getValues } = useFormContext();
  const watchedType = watch('type') || 'distance';
  const watchedDistanceCategories = watch('distanceCategories') || [];
  const isInitialized = useRef(false);
  
  // State để quản lý danh sách hạng mục
  const [categories, setCategories] = useState<DistanceCategory[]>(() => {
    return [{ id: '1', value: 0, unit: getTargetUnit('distance'), name: '', difficulty: '1' }];
  });

  // Function để lấy đơn vị dựa trên loại thử thách
  function getTargetUnit(type: string) {
    switch (type) {
      case 'distance':
        return 'km';
      case 'time':
        return 'phút';
      case 'frequency':
        return 'lần';
      case 'speed':
        return 'km/h';
      case 'streak':
        return 'ngày';
      case 'combined':
        return 'điểm';
      case 'custom':
        return 'đơn vị';
      default:
        return 'km';
    }
  }

  // Thêm hạng mục mới
  const addCategory = () => {
    const newCategory: DistanceCategory = {
      id: Date.now().toString(),
      value: 0,
      unit: getTargetUnit(watchedType),
      name: '',
      difficulty: '1'
    };
    setCategories([...categories, newCategory]);
  };

  // Xóa hạng mục
  const removeCategory = (id: string) => {
    if (categories.length > 1) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  // Cập nhật giá trị hạng mục
  const updateCategory = (id: string, field: keyof DistanceCategory, value: string | number) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, [field]: value } : cat
    ));
  };

  // Cập nhật targetUnit khi loại thử thách thay đổi
  React.useEffect(() => {
    const newUnit = getTargetUnit(watchedType);
    console.log(newUnit);
    setCategories(prevCategories => 
      prevCategories.map(cat => ({ ...cat, unit: newUnit }))
    );
    setValue('targetUnit', newUnit);
  }, [watchedType, setValue]);

  console.log(watchedType);
  
  // Sync categories với form values khi component mount (chỉ một lần)
  React.useEffect(() => {
    if (!isInitialized.current && watchedDistanceCategories.length > 0) {
      setCategories(watchedDistanceCategories);
      isInitialized.current = true;
    }
  }, [watchedDistanceCategories]);
  
  // Sync categories với form (chỉ khi categories thay đổi từ user action)
  React.useEffect(() => {
    if (isInitialized.current) {
      setValue('distanceCategories', categories);
    }
  }, [categories, setValue]);
  
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold mb-4">Hạng mục thử thách</h2>
        
        {/* Loại thử thách */}
        <div className="form-control w-full mb-6">
          <label className="label">
            <span className="label-text">Loại thử thách *</span>
          </label>
                   <select
                     className="select select-bordered w-full"
                     {...register('type')}
                     defaultValue="distance"
                   >
                     <option value="distance">Khoảng cách</option>
                     <option value="time">Thời gian</option>
                     <option value="frequency">Tần suất</option>
                     <option value="speed">Tốc độ</option>
                     <option value="streak">Chuỗi ngày</option>
                     <option value="combined">Kết hợp</option>
                     <option value="custom">Tùy chỉnh</option>
                   </select>
          {errors.type && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.type.message as string}</span>
            </label>
          )}
        </div>
        
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={category.id} className="card bg-base-200 shadow-sm relative">
              <div className="card-body p-3">
                {categories.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCategory(category.id)}
                    className="btn btn-ghost btn-sm btn-circle text-error absolute top-2 right-2 z-10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                           {/* Tên hạng mục */}
                           <div className="form-control w-full">
                             <label className="label">
                               <span className="label-text">Tên hạng mục {index + 1}</span>
                             </label>
                             <input
                               type="text"
                               placeholder="VD: Nam 10km"
                               className="input input-bordered w-full"
                               value={category.name}
                               onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
                             />
                           </div>

                  {/* Giá trị */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Giá trị ({getTargetUnit(watchedType)}) *</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Nhập giá trị"
                      className="input input-bordered w-full"
                      value={category.value}
                      onChange={(e) => updateCategory(category.id, 'value', Number(e.target.value))}
                    />
                  </div>

                           {/* Độ khó */}
                           <div className="form-control w-full">
                             <label className="label">
                               <span className="label-text">Độ khó *</span>
                             </label>
                             <div className="flex items-center gap-1">
                               {[1, 2, 3, 4, 5].map((rating) => {
                                 const currentRating = parseInt(category.difficulty) || 0;
                                 const isFilled = rating <= currentRating;
                                 return (
                                   <button
                                     key={rating}
                                     type="button"
                                     onClick={() => updateCategory(category.id, 'difficulty', rating.toString())}
                                     className="p-1 hover:scale-110 transition-all duration-200"
                                   >
                                     <span className={`text-2xl ${isFilled ? 'opacity-100' : 'opacity-30'}`}>
                                       💪
                                     </span>
                                   </button>
                                 );
                               })}
                             </div>
                           </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút thêm hạng mục */}
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={addCategory}
            className="btn btn-outline btn-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm hạng mục
          </button>
        </div>

        {/* Hidden input để lưu danh sách hạng mục */}
        <input
          type="hidden"
          {...register('distanceCategories')}
          value={JSON.stringify(categories)}
        />
      </div>
    </div>
  );
}
