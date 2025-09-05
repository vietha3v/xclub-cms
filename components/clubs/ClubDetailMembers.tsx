'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';

interface ClubMember {
  id: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: string;
  isOnline?: boolean;
}

interface ClubDetailMembersProps {
  clubId: string;
}

export default function ClubDetailMembers({ clubId }: ClubDetailMembersProps) {
  const [members, setMembers] = useState<ClubMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [{ data: membersData, loading: membersLoading, error: membersError }, refetchMembers] = useAxios<ClubMember[]>(
    `/api/clubs/${clubId}/members`,
    { manual: true }
  );

  useEffect(() => {
    loadMembers();
  }, [clubId]);

  useEffect(() => {
    if (membersData) {
      setMembers(Array.isArray(membersData) ? membersData : []);
      setError(null);
    }
  }, [membersData]);

  useEffect(() => {
    if (membersError) {
      setError('Không thể tải danh sách thành viên');
      console.error('Load members error:', membersError);
    }
  }, [membersError]);

  const loadMembers = async () => {
    try {
      setLoading(true);
      await refetchMembers();
    } catch (err) {
      setError('Không thể tải danh sách thành viên');
      console.error('Load members error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'badge-error';
      case 'moderator':
        return 'badge-warning';
      case 'member':
        return 'badge-info';
      default:
        return 'badge-neutral';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Quản trị';
      case 'moderator':
        return 'Điều hành';
      case 'member':
        return 'Thành viên';
      default:
        return 'Không xác định';
    }
  };

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">Thành viên</h2>
          <div className="text-center py-8">
            <div className="loading loading-spinner loading-md text-primary"></div>
            <p className="mt-2 text-base-content/70">Đang tải...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-xl">Thành viên</h2>
          <div className="badge badge-primary">{(members || []).length}</div>
        </div>

        {error ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 text-base-content/30">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-base-content/70">{error}</p>
            <button
              onClick={loadMembers}
              className="btn btn-outline btn-sm mt-2"
            >
              Thử lại
            </button>
          </div>
        ) : (members || []).length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 text-base-content/30">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <p className="text-base-content/70">Chưa có thành viên nào</p>
          </div>
        ) : (
          <div className="list-container">
            {(members || []).slice(0, 5).map((member) => (
              <div key={member.id} className="list-item">
                <div className="list-item-avatar">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                
                <div className="list-item-content">
                  <div className="list-item-title">{member.name}</div>
                  <div className="list-item-subtitle">
                    Tham gia {new Date(member.joinedAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>

                <div className="list-item-actions">
                  <div className={`badge badge-sm ${getRoleColor(member.role)}`}>
                    {getRoleText(member.role)}
                  </div>
                </div>
              </div>
            ))}

            {(members || []).length > 5 && (
              <div className="text-center pt-3">
                <button className="btn btn-outline btn-sm">
                  Xem tất cả ({(members || []).length} thành viên)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
