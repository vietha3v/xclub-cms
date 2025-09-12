'use client';

import { useState } from 'react';
import { Challenge, ChallengeCategory } from '@/types/challenge';
import { 
  X, 
  Copy, 
  Download, 
  Target, 
  Calendar, 
  Trophy, 
  Users, 
  User,
  Share2
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ChallengeInvitationCardProps {
  challenge: Challenge;
  onClose: () => void;
}

export default function ChallengeInvitationCard({ challenge, onClose }: ChallengeInvitationCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleDownload = () => {
    // Tạo canvas để export thành ảnh
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const cardElement = document.getElementById('challenge-invitation-card');
    
    if (!ctx || !cardElement) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 1000;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw invitation content
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Lời mời tham gia thử thách', canvas.width / 2, 80);

    ctx.font = 'bold 48px Arial';
    ctx.fillText(challenge.name, canvas.width / 2, 160);

    ctx.font = '24px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(`Mục tiêu: ${challenge.targetValue} ${challenge.targetUnit}`, canvas.width / 2, 220);

    // Download as PNG
    const link = document.createElement('a');
    link.download = `challenge-invitation-${challenge.name}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'distance': return '🏃‍♂️';
      case 'time': return '⏱️';
      case 'frequency': return '📊';
      case 'streak': return '🔥';
      case 'speed': return '💨';
      case 'combined': return '🎯';
      default: return '🏆';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-orange-600 bg-orange-100';
      case 'expert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Dễ';
      case 'medium': return 'Trung bình';
      case 'hard': return 'Khó';
      case 'expert': return 'Chuyên gia';
      default: return difficulty;
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-xl">Thiệp mời thử thách</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Invitation Card */}
        <div 
          id="challenge-invitation-card"
          className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-2xl p-8 border border-primary/20 shadow-xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{getTypeIcon(challenge.type)}</div>
            <h1 className="text-3xl font-bold text-base-content mb-2">{challenge.name}</h1>
            <p className="text-base-content/70 text-lg">Lời mời tham gia thử thách</p>
          </div>

          {/* Challenge Details */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-base-content/60">Mục tiêu</div>
                <div className="font-semibold text-lg">
                  {challenge.targetValue} {challenge.targetUnit}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <div className="text-sm text-base-content/60">Độ khó</div>
                <div className={`font-semibold px-2 py-1 rounded-full text-sm ${getDifficultyColor(challenge.difficulty)}`}>
                  {formatDifficulty(challenge.difficulty)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-sm text-base-content/60">Thời gian</div>
                <div className="font-semibold">
                  {format(new Date(challenge.startDate), 'dd/MM', { locale: vi })} - 
                  {format(new Date(challenge.endDate), 'dd/MM/yyyy', { locale: vi })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-info/10 rounded-lg">
                {challenge.category === ChallengeCategory.TEAM ? (
                  <Users className="w-6 h-6 text-info" />
                ) : (
                  <User className="w-6 h-6 text-info" />
                )}
              </div>
              <div>
                <div className="text-sm text-base-content/60">Loại</div>
                <div className="font-semibold">
                  {challenge.category === ChallengeCategory.TEAM ? 'Tập thể' : 'Cá nhân'}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {challenge.description && (
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-3">Mô tả</h3>
              <p className="text-base-content/80 leading-relaxed">{challenge.description}</p>
            </div>
          )}

          {/* Footer */}
          <div className="text-center border-t border-base-300 pt-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img 
                src="/logo.png" 
                alt="X-Club" 
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<span class="text-primary font-bold text-xl">X</span>';
                  }
                }}
              />
              <span className="text-xl font-bold text-primary">X-Club</span>
            </div>
            <p className="text-sm text-base-content/60">Tham gia ngay để trải nghiệm thử thách thú vị!</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button onClick={handleCopyLink} className="btn btn-outline flex-1">
            <Copy className="w-4 h-4 mr-2" />
            {copied ? 'Đã sao chép!' : 'Sao chép link'}
          </button>
          <button onClick={handleDownload} className="btn btn-primary flex-1">
            <Download className="w-4 h-4 mr-2" />
            Tải xuống
          </button>
        </div>
      </div>
    </div>
  );
}
