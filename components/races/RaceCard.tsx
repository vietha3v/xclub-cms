'use client';

import useAxios from '@/hooks/useAxios';
import { useState } from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { MapPin, Calendar, Users, Edit, Trash2 } from 'lucide-react';
import RaceEditModal from './RaceEditModal';
import { Race, RaceType, RaceStatus } from '@/types/race';
import { useToast } from '@/components/Toast';

// Race constants
const RACE_TYPES: Record<RaceType, string> = {
  [RaceType.ROAD_RACE]: 'Chạy đường bộ',
  [RaceType.TRAIL_RACE]: 'Chạy trail',
  [RaceType.ULTRA_MARATHON]: 'Ultra marathon',
  [RaceType.RELAY_RACE]: 'Chạy tiếp sức',
  [RaceType.VIRTUAL_RACE]: 'Chạy ảo',
  [RaceType.CHARITY_RACE]: 'Chạy từ thiện'
};

const RACE_STATUSES: Record<RaceStatus, string> = {
  [RaceStatus.DRAFT]: 'Bản nháp',
  [RaceStatus.PUBLISHED]: 'Đã xuất bản',
  [RaceStatus.REGISTRATION_OPEN]: 'Mở đăng ký',
  [RaceStatus.REGISTRATION_CLOSED]: 'Đóng đăng ký',
  [RaceStatus.ONGOING]: 'Đang diễn ra',
  [RaceStatus.COMPLETED]: 'Hoàn thành',
  [RaceStatus.CANCELLED]: 'Đã hủy'
};

const RACE_STATUS_COLORS: Record<RaceStatus, string> = {
  [RaceStatus.DRAFT]: 'badge-ghost',
  [RaceStatus.PUBLISHED]: 'badge-info',
  [RaceStatus.REGISTRATION_OPEN]: 'badge-success',
  [RaceStatus.REGISTRATION_CLOSED]: 'badge-warning',
  [RaceStatus.ONGOING]: 'badge-primary',
  [RaceStatus.COMPLETED]: 'badge-success',
  [RaceStatus.CANCELLED]: 'badge-error'
};

interface RaceCardProps {
  race: Race;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function RaceCard({ race, onUpdate, onDelete }: RaceCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();

  const [{ loading }, executeDelete] = useAxios({
    url: `/api/races/${race.id}`,
    method: 'DELETE'
  }, { manual: true });

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa giải chạy này?')) return;

    setIsDeleting(true);
    try {
      await executeDelete();
      showToast({
        type: 'success',
        message: 'Xóa giải chạy thành công!',
        title: 'Thành công'
      });
      onDelete();
    } catch (error: any) {
      console.error('Error deleting race:', error);
      showToast({
        type: 'error',
        message: error.response?.data?.message || 'Có lỗi xảy ra khi xóa giải chạy',
        title: 'Lỗi'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: vi });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency === 'VND' ? 'VND' : 'USD'
    }).format(amount);
  };

  return (
    <>
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <div className="card-body">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="card-title text-xl">{race.name}</h2>
                <div className={`badge ${RACE_STATUS_COLORS[race.status]}`}>
                  {RACE_STATUSES[race.status]}
                </div>
              </div>
              
              <p className="text-base-content/70 mb-3 line-clamp-2">
                {race.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                <div className="badge badge-outline">
                  {RACE_TYPES[race.type]}
                </div>
                {race.fees.regularFee > 0 && (
                  <div className="badge badge-outline">
                    {formatCurrency(race.fees.regularFee, race.fees.currency)}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-base-content/60">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {race.location.name}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(race.startDate.toString())}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {race.capacity.registered}/{race.capacity.total}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit className="h-4 w-4" />
                Sửa
              </button>
              <button 
                className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-error-content"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>

      <RaceEditModal 
        race={race}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={() => {
          setIsEditModalOpen(false);
          onUpdate();
        }}
      />
    </>
  );
}