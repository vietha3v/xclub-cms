'use client';

import { useState } from 'react';
import { Challenge, ChallengeStatus, ChallengeCategory } from '@/types/challenge';
import { 
  UserPlus, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Calendar,
  Users,
  Target,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import ChallengeRegistrationModal from './ChallengeRegistrationModal';

interface ChallengeRegistrationProps {
  challenge: Challenge;
  onRegistrationChange?: () => void;
}

export default function ChallengeRegistration({ challenge, onRegistrationChange }: ChallengeRegistrationProps) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleJoinClick = () => {
    setShowRegistrationModal(true);
  };

  const handleRegistrationSuccess = () => {
    setShowRegistrationModal(false);
    onRegistrationChange?.();
  };

  const isRegistrationOpen = () => {
    const now = new Date();
    const registrationStart = challenge.registrationStartDate ? new Date(challenge.registrationStartDate) : new Date(challenge.startDate);
    const registrationEnd = challenge.registrationEndDate ? new Date(challenge.registrationEndDate) : new Date(challenge.endDate);
    
    return now >= registrationStart && now <= registrationEnd;
  };

  const isChallengeActive = () => {
    const now = new Date();
    const startDate = new Date(challenge.startDate);
    const endDate = new Date(challenge.endDate);
    
    return now >= startDate && now <= endDate;
  };

  const isChallengeUpcoming = () => {
    const now = new Date();
    const startDate = new Date(challenge.startDate);
    
    return now < startDate;
  };

  const getRegistrationButton = () => {
    // User đã đăng ký
    if (challenge.userRegistrationStatus) {
      const isPending = challenge.userRegistrationStatus === 'pending';
      const isActive = challenge.userRegistrationStatus === 'active';
      
      return (
        <div className={`btn btn-lg w-full cursor-default ${
          isPending ? 'btn-warning' : 'btn-success'
        }`}>
          {isPending ? (
            <>
              <Clock className="w-5 h-5" />
              <span>Chờ duyệt</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Đã đăng ký</span>
            </>
          )}
        </div>
      );
    }

    // Challenge đã kết thúc
    if (challenge.status === ChallengeStatus.COMPLETED || challenge.status === ChallengeStatus.CANCELLED) {
      return (
        <div className="btn btn-lg w-full btn-disabled">
          <XCircle className="w-5 h-5" />
          <span>
            {challenge.status === ChallengeStatus.COMPLETED ? 'Đã kết thúc' : 'Đã hủy'}
          </span>
        </div>
      );
    }

    // Kiểm tra thời gian đăng ký
    if (!isRegistrationOpen()) {
      const now = new Date();
      const registrationStart = challenge.registrationStartDate ? new Date(challenge.registrationStartDate) : new Date(challenge.startDate);
      
      if (now < registrationStart) {
        return (
          <div className="btn btn-lg w-full btn-disabled">
            <Calendar className="w-5 h-5" />
            <span>Chưa mở đăng ký</span>
          </div>
        );
      } else {
        return (
          <div className="btn btn-lg w-full btn-disabled">
            <XCircle className="w-5 h-5" />
            <span>Hết hạn đăng ký</span>
          </div>
        );
      }
    }

    // Kiểm tra số lượng người tham gia
    if (challenge.maxParticipants && challenge.participantCount >= challenge.maxParticipants) {
      return (
        <div className="btn btn-lg w-full btn-disabled">
          <Users className="w-5 h-5" />
          <span>Đã đầy</span>
        </div>
      );
    }

    // Có thể đăng ký
    return (
      <button 
        className="btn btn-primary btn-lg w-full"
        onClick={handleJoinClick}
      >
        <UserPlus className="w-5 h-5" />
        <span>Đăng ký tham gia</span>
      </button>
    );
  };

  const getStatusInfo = () => {
    const now = new Date();
    const startDate = new Date(challenge.startDate);
    const endDate = new Date(challenge.endDate);
    
    if (isChallengeUpcoming()) {
      return {
        icon: <Calendar className="w-4 h-4" />,
        text: 'Sắp diễn ra',
        color: 'text-info',
        bgColor: 'bg-info/10'
      };
    } else if (isChallengeActive()) {
      return {
        icon: <Target className="w-4 h-4" />,
        text: 'Đang diễn ra',
        color: 'text-success',
        bgColor: 'bg-success/10'
      };
    } else {
      return {
        icon: <XCircle className="w-4 h-4" />,
        text: 'Đã kết thúc',
        color: 'text-error',
        bgColor: 'bg-error/10'
      };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <>
      <div className="card bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg border border-primary/10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <div className="card-body p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <h3 className="card-title text-base sm:text-lg">Tham gia thử thách</h3>
          </div>

          {/* Status */}
          <div className={`flex items-center gap-2 p-3 rounded-lg ${statusInfo.bgColor} mb-4`}>
            <div className={statusInfo.color}>
              {statusInfo.icon}
            </div>
            <span className={`font-medium ${statusInfo.color}`}>
              {statusInfo.text}
            </span>
          </div>

          {/* Challenge Info */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-base-content/60">Mục tiêu</span>
              <span className="font-semibold">
                {challenge.targetValue} {challenge.targetUnit}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-base-content/60">Loại</span>
              <span className="font-semibold">
                {challenge.category === ChallengeCategory.TEAM ? 'Tập thể' : 'Cá nhân'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-base-content/60">Người tham gia</span>
              <span className="font-semibold">
                {challenge.participantCount || 0}
                {challenge.maxParticipants ? `/${challenge.maxParticipants}` : ''}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-base-content/60">Thời gian</span>
              <span className="font-semibold text-right">
                {format(new Date(challenge.startDate), 'dd/MM', { locale: vi })} - 
                {format(new Date(challenge.endDate), 'dd/MM/yyyy', { locale: vi })}
              </span>
            </div>
          </div>

          {/* Registration Button */}
          {getRegistrationButton()}

          {/* Registration Info */}
          {isRegistrationOpen() && !challenge.userRegistrationStatus && (
            <div className="mt-4 p-3 bg-info/10 rounded-lg border border-info/20">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-info mt-0.5 flex-shrink-0" />
                <div className="text-sm text-info">
                  <p className="font-medium mb-1">Thông tin đăng ký:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Thử thách sẽ bắt đầu vào {format(new Date(challenge.startDate), 'dd/MM/yyyy HH:mm', { locale: vi })}</li>
                    <li>• Thời gian kết thúc: {format(new Date(challenge.endDate), 'dd/MM/yyyy HH:mm', { locale: vi })}</li>
                    {challenge.timeLimit && (
                      <li>• Thời gian giới hạn: {challenge.timeLimit} ngày</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* User Registration Status Info */}
          {challenge.userRegistrationStatus && (
            <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <div className="text-sm text-success">
                  {challenge.userRegistrationStatus === 'pending' ? (
                    <p>Đơn đăng ký của bạn đang chờ được duyệt. Vui lòng chờ thông báo!</p>
                  ) : (
                    <p>Bạn đã đăng ký thành công thử thách này. Chúc bạn hoàn thành tốt!</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Registration Modal */}
      <ChallengeRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        challenge={challenge}
        onSuccess={handleRegistrationSuccess}
      />
    </>
  );
}
