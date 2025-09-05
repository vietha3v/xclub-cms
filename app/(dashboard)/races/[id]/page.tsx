'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import { Race } from '@/types/race';
import RaceDetailHeader from '@/components/races/RaceDetailHeader';
import RaceDetailInfo from '@/components/races/RaceDetailInfo';
import RaceDetailActions from '@/components/races/RaceDetailActions';
import RaceDetailParticipants from '@/components/races/RaceDetailParticipants';
import RaceDetailResults from '@/components/races/RaceDetailResults';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';

export default function RaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const raceId = params.id as string;

  const [{ data: race, loading, error }, refetch] = useAxios<Race>(`/api/races/${raceId}`);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !race) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">❌</div>
          <h3 className="text-2xl font-semibold text-base-content mb-4">Không tìm thấy giải chạy</h3>
          <p className="text-base-content/70 mb-6">Giải chạy này có thể đã bị xóa hoặc không tồn tại</p>
          <button onClick={() => router.back()} className="btn btn-primary">
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header Section */}
        <RaceDetailHeader race={race} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <RaceDetailInfo race={race} />
              <RaceDetailResults raceId={raceId} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <RaceDetailActions race={race} onUpdate={refetch} />
              <RaceDetailParticipants raceId={raceId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
