'use client';

import React, { useState, useEffect } from 'react';
import { ChallengeTeam, ChallengeTeamMember, CreateTeamDto, AddMemberDto } from '@/types/challenge';
import { Users, Plus, X, UserPlus, Trash2 } from 'lucide-react';
import useAxios from '@/hooks/useAxios';

interface TeamManagementModalProps {
  challengeId: string;
  clubId: string;
  isOpen: boolean;
  onClose: () => void;
  onTeamCreated?: (team: ChallengeTeam) => void;
}

export default function TeamManagementModal({
  challengeId,
  clubId,
  isOpen,
  onClose,
  onTeamCreated
}: TeamManagementModalProps) {
  const [teams, setTeams] = useState<ChallengeTeam[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<ChallengeTeam | null>(null);
  const [teamMembers, setTeamMembers] = useState<ChallengeTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newMemberId, setNewMemberId] = useState('');

  // API hooks
  const [{ data: teamsData, loading: teamsLoading }, fetchTeams] = useAxios<ChallengeTeam[]>(
    `/api/challenges/${challengeId}/teams`,
    { manual: true }
  );

  const [{ data: membersData, loading: membersLoading }, fetchMembers] = useAxios<ChallengeTeamMember[]>(
    `/api/challenges/${challengeId}/teams/${selectedTeam?.id}/members`,
    { manual: true }
  );

  const [, createTeam] = useAxios<ChallengeTeam>(
    `/api/challenges/${challengeId}/teams`,
    { method: 'POST', manual: true }
  );

  const [, addMember] = useAxios<ChallengeTeamMember>(
    `/api/challenges/${challengeId}/teams/${selectedTeam?.id}/members`,
    { method: 'POST', manual: true }
  );

  const [, removeMember] = useAxios(
    `/api/challenges/${challengeId}/teams/${selectedTeam?.id}/members/${newMemberId}`,
    { method: 'DELETE', manual: true }
  );

  useEffect(() => {
    if (isOpen) {
      fetchTeams();
    }
  }, [isOpen, challengeId]);

  useEffect(() => {
    if (teamsData) {
      setTeams(teamsData);
    }
  }, [teamsData]);

  useEffect(() => {
    if (selectedTeam) {
      fetchMembers();
    }
  }, [selectedTeam]);

  useEffect(() => {
    if (membersData) {
      setTeamMembers(membersData);
    }
  }, [membersData]);

  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) return;

    try {
      setIsLoading(true);
      const createTeamDto: CreateTeamDto = {
        teamName: newTeamName.trim()
      };

      const response = await createTeam({ data: createTeamDto });
      if (response.data) {
        setTeams(prev => [...prev, response.data]);
        setNewTeamName('');
        setShowCreateForm(false);
        onTeamCreated?.(response.data);
      }
    } catch (error) {
      console.error('Error creating team:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!newMemberId.trim() || !selectedTeam) return;

    try {
      setIsLoading(true);
      const addMemberDto: AddMemberDto = {
        userId: newMemberId.trim()
      };

      const response = await addMember({ data: addMemberDto });
      if (response.data) {
        setTeamMembers(prev => [...prev, response.data]);
        setNewMemberId('');
        setShowAddMemberForm(false);
        // Refresh teams to update member count
        fetchTeams();
      }
    } catch (error) {
      console.error('Error adding member:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!selectedTeam) return;

    try {
      setIsLoading(true);
      await removeMember();
      setTeamMembers(prev => prev.filter(member => member.id !== memberId));
      // Refresh teams to update member count
      fetchTeams();
    } catch (error) {
      console.error('Error removing member:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-primary">Quản lý Team</h3>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Teams List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">Danh sách Teams</h4>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setShowCreateForm(true)}
              >
                <Plus className="w-4 h-4" />
                Tạo Team
              </button>
            </div>

            {/* Create Team Form */}
            {showCreateForm && (
              <div className="card bg-base-200 p-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tên Team</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Nhập tên team..."
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={handleCreateTeam}
                    disabled={isLoading || !newTeamName.trim()}
                  >
                    {isLoading ? 'Đang tạo...' : 'Tạo Team'}
                  </button>
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewTeamName('');
                    }}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}

            {/* Teams List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {teamsLoading ? (
                <div className="text-center py-4">Đang tải...</div>
              ) : teams.length === 0 ? (
                <div className="text-center py-8 text-base-content/60">
                  Chưa có team nào
                </div>
              ) : (
                teams.map((team) => (
                  <div
                    key={team.id}
                    className={`card cursor-pointer transition-colors ${
                      selectedTeam?.id === team.id 
                        ? 'bg-primary text-primary-content' 
                        : 'bg-base-100 hover:bg-base-200'
                    }`}
                    onClick={() => setSelectedTeam(team)}
                  >
                    <div className="card-body p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="font-semibold">{team.teamName}</h5>
                          <div className="flex items-center gap-4 text-sm opacity-70">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {team.memberCount} thành viên
                            </span>
                            <span>{team.totalDistance.toFixed(2)} km</span>
                          </div>
                        </div>
                        {team.finalRank && (
                          <div className="badge badge-primary">
                            #{team.finalRank}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Team Members */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">
                Thành viên {selectedTeam ? `- ${selectedTeam.teamName}` : ''}
              </h4>
              {selectedTeam && (
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowAddMemberForm(true)}
                >
                  <UserPlus className="w-4 h-4" />
                  Thêm thành viên
                </button>
              )}
            </div>

            {/* Add Member Form */}
            {showAddMemberForm && selectedTeam && (
              <div className="card bg-base-200 p-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">ID Người dùng</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={newMemberId}
                    onChange={(e) => setNewMemberId(e.target.value)}
                    placeholder="Nhập ID người dùng..."
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={handleAddMember}
                    disabled={isLoading || !newMemberId.trim()}
                  >
                    {isLoading ? 'Đang thêm...' : 'Thêm thành viên'}
                  </button>
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setShowAddMemberForm(false);
                      setNewMemberId('');
                    }}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}

            {/* Members List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {!selectedTeam ? (
                <div className="text-center py-8 text-base-content/60">
                  Chọn team để xem thành viên
                </div>
              ) : membersLoading ? (
                <div className="text-center py-4">Đang tải...</div>
              ) : teamMembers.length === 0 ? (
                <div className="text-center py-8 text-base-content/60">
                  Chưa có thành viên nào
                </div>
              ) : (
                teamMembers.map((member) => (
                  <div key={member.id} className="card bg-base-100">
                    <div className="card-body p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h6 className="font-medium">{member.userId}</h6>
                          <div className="text-sm text-base-content/60">
                            {member.contributedDistance.toFixed(2)} km • {member.activityCount} hoạt động
                          </div>
                        </div>
                        <button 
                          className="btn btn-error btn-sm"
                          onClick={() => handleRemoveMember(member.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
