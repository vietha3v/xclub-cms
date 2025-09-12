'use client';

import { useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { Club } from '@/types/club';
import dlv from 'dlv';
import { RotateCcw, Eye } from 'lucide-react';
import ClubCard from './ClubCard';

interface MyClub {
  id: string;
  club: Club;
  role: ('admin' | 'moderator' | 'member')[];
  joinedAt: string;
  status: 'active' | 'pending' | 'suspended';
}

export default function MyClubs() {
  const [{ data: clubsData, loading: clubsLoading, error: clubsError }, refetchClubs] = useAxios<MyClub[]>(
    '/api/clubs/my-clubs',
    { manual: true }
  );

  useEffect(() => {
    refetchClubs();
  }, []);


  if (clubsLoading) {
    return (
      <div className="text-center py-20">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <p className="mt-4 text-base-content/70">Đang tải CLB của bạn...</p>
      </div>
    );
  }

  if (clubsError) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">❌</div>
        <h3 className="text-2xl font-semibold text-base-content mb-4">Có lỗi xảy ra</h3>
        <p className="text-base-content/70 mb-6">Không thể tải danh sách CLB</p>
        <button onClick={() => refetchClubs()} className="btn btn-primary btn-sm">
          <RotateCcw className="w-4 h-4 mr-1" />
          Thử lại
        </button>
      </div>
    );
  }

  if (!clubsData || clubsData.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">🏢</div>
        <h3 className="text-2xl font-semibold text-base-content mb-4">
          Bạn chưa tham gia CLB nào
        </h3>
        <p className="text-base-content/70 mb-6 max-w-md mx-auto">
          Hãy khám phá và tham gia các CLB để kết nối với cộng đồng và tham gia các hoạt động thú vị!
        </p>
        <button 
          onClick={() => window.location.href = '/clubs'}
          className="btn btn-primary btn-sm"
        >
          <Eye className="w-4 h-4 mr-1" />
          Khám phá CLB
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-base-content">CLB của tôi</h2>
        <p className="text-base-content/70">
          Bạn đang tham gia {clubsData?.length || 0} câu lạc bộ
        </p>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubsData?.map((myClub) => (
          <ClubCard 
            key={myClub.id} 
            club={myClub.club} 
            showJoinButton={false}
          />
        ))}
      </div>
    </div>
  );
}
