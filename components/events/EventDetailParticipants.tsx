'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import dlv from 'dlv';
import { RotateCcw, Download, Users, Building2 } from 'lucide-react';

interface EventParticipant {
  id: string;
  userId: string;
  user: {
    id: string;
    username: string;
    email: string;
    profileImage?: string;
  };
  joinedAt: string;
  status: string;
}

interface EventClubParticipant {
  id: string;
  clubId: string;
  club: {
    id: string;
    name: string;
    shortName?: string;
    logoUrl?: string;
    memberCount?: number;
  };
  joinedAt: string;
  status: string;
  memberCount: number;
}

interface EventDetailParticipantsProps {
  eventId: string;
}

export default function EventDetailParticipants({ eventId }: EventDetailParticipantsProps) {
  const [participants, setParticipants] = useState<EventParticipant[]>([]);
  const [clubParticipants, setClubParticipants] = useState<EventClubParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'individuals' | 'clubs'>('individuals');

  const [{ data: participantsData, loading: participantsLoading, error: participantsError }, refetchParticipants] = useAxios<{
    data: EventParticipant[];
    total: number;
  }>(`/api/events/${eventId}/participants`);

  const [{ data: clubsData, loading: clubsLoading, error: clubsError }, refetchClubs] = useAxios<{
    data: EventClubParticipant[];
    total: number;
  }>(`/api/events/${eventId}/club-participants`);

  useEffect(() => {
    if (participantsData) {
      setParticipants(participantsData.data || []);
    }
  }, [participantsData]);

  useEffect(() => {
    if (clubsData) {
      setClubParticipants(clubsData.data || []);
    }
  }, [clubsData]);

  useEffect(() => {
    if (participantsError || clubsError) {
      setLoading(false);
    } else if (participantsData && clubsData) {
      setLoading(false);
    }
  }, [participantsError, clubsError, participantsData, clubsData]);

  if (loading || participantsLoading || clubsLoading) {
    return (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">👥 Người tham gia</h2>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-10 h-10 bg-base-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-base-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (participantsError || clubsError) {
    return (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">👥 Người tham gia</h2>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">❌</div>
            <p className="text-base-content/70 mb-4">Không thể tải danh sách người tham gia</p>
            <button onClick={() => { refetchParticipants(); refetchClubs(); }} className="btn btn-sm btn-primary">
              <RotateCcw className="w-4 h-4 mr-1" />
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalParticipants = participants.length + clubParticipants.reduce((sum, club) => sum + club.memberCount, 0);

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-xl">👥 Người tham gia</h2>
          <div className="badge badge-primary badge-lg">
            {totalParticipants}
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs tabs-boxed mb-4">
          <button 
            className={`tab tab-sm flex-1 ${activeTab === 'individuals' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('individuals')}
          >
            <Users className="w-4 h-4 mr-1" />
            Cá nhân ({participants.length})
          </button>
          <button 
            className={`tab tab-sm flex-1 ${activeTab === 'clubs' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('clubs')}
          >
            <Building2 className="w-4 h-4 mr-1" />
            Câu lạc bộ ({clubParticipants.length})
          </button>
        </div>

        {/* Individual Participants */}
        {activeTab === 'individuals' && (
          <>
            {participants.length === 0 ? (
          <div className="text-center py-8">
                <div className="text-4xl mb-4">👤</div>
                <p className="text-base-content/70">Chưa có cá nhân nào tham gia</p>
          </div>
        ) : (
              <div className="space-y-3">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  {participant.user.profileImage ? (
                    <img
                      src={participant.user.profileImage}
                      alt={participant.user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                          <span className="text-sm font-semibold">
                      {participant.user.username.charAt(0).toUpperCase()}
                    </span>
                  )}
                      </div>
                </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-base-content truncate">
                    {participant.user.username}
                  </div>
                      <div className="text-sm text-base-content/70 truncate">
                    {participant.user.email}
                  </div>
                </div>

                    <div className="text-right">
                      <div className="text-xs text-base-content/70 mb-1">
                    {new Date(participant.joinedAt).toLocaleDateString('vi-VN')}
                  </div>
                  <div className={`badge badge-sm ${
                    participant.status === 'confirmed' ? 'badge-success' :
                    participant.status === 'pending' ? 'badge-warning' : 'badge-neutral'
                  }`}>
                    {participant.status === 'confirmed' ? 'Đã xác nhận' :
                     participant.status === 'pending' ? 'Chờ xác nhận' : 'Đã tham gia'}
                  </div>
                </div>
              </div>
            ))}
          </div>
            )}
          </>
        )}

        {/* Club Participants */}
        {activeTab === 'clubs' && (
          <>
            {clubParticipants.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🏢</div>
                <p className="text-base-content/70">Chưa có câu lạc bộ nào tham gia</p>
              </div>
            ) : (
              <div className="space-y-3">
                {clubParticipants.map((clubParticipant) => (
                  <div key={clubParticipant.id} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full bg-secondary text-secondary-content flex items-center justify-center">
                        {clubParticipant.club.logoUrl ? (
                          <img
                            src={clubParticipant.club.logoUrl}
                            alt={clubParticipant.club.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <Building2 className="w-5 h-5" />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-base-content truncate">
                        {clubParticipant.club.name}
                      </div>
                      <div className="text-sm text-base-content/70">
                        {clubParticipant.memberCount} thành viên tham gia
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-base-content/70 mb-1">
                        {new Date(clubParticipant.joinedAt).toLocaleDateString('vi-VN')}
                      </div>
                      <div className={`badge badge-sm ${
                        clubParticipant.status === 'confirmed' ? 'badge-success' :
                        clubParticipant.status === 'pending' ? 'badge-warning' : 'badge-neutral'
                      }`}>
                        {clubParticipant.status === 'confirmed' ? 'Đã xác nhận' :
                         clubParticipant.status === 'pending' ? 'Chờ xác nhận' : 'Đã tham gia'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {(participants.length > 0 || clubParticipants.length > 0) && (
          <div className="divider"></div>
        )}

        <div className="text-center">
          <button
            onClick={() => { refetchParticipants(); refetchClubs(); }}
            className="btn btn-sm btn-outline"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Làm mới
          </button>
        </div>
      </div>
    </div>
  );
}
