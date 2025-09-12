'use client';

import { Challenge, ChallengeStatus, ChallengeType, ChallengeCategory } from '@/types/challenge';
import { ArrowLeft, Play, CheckCircle, XCircle, Clock, Target, Tag, Users, User, Trophy, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

interface ChallengeDetailHeaderProps {
  challenge: Challenge;
}

export default function ChallengeDetailHeader({ challenge }: ChallengeDetailHeaderProps) {
  const router = useRouter();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const getStatusIcon = (status: ChallengeStatus) => {
    switch (status) {
      case ChallengeStatus.ACTIVE:
        return <Play className="w-4 h-4 text-success" />;
      case ChallengeStatus.COMPLETED:
        return <CheckCircle className="w-4 h-4 text-success" />;
      case ChallengeStatus.CANCELLED:
        return <XCircle className="w-4 h-4 text-error" />;
      case ChallengeStatus.PUBLISHED:
      case ChallengeStatus.UPCOMING:
        return <Clock className="w-4 h-4 text-info" />;
      default:
        return <Clock className="w-4 h-4 text-info" />;
    }
  };

  const getStatusText = (status: ChallengeStatus) => {
    switch (status) {
      case ChallengeStatus.ACTIVE:
        return 'Đang diễn ra';
      case ChallengeStatus.PUBLISHED:
      case ChallengeStatus.UPCOMING:
        return 'Sắp diễn ra';
      case ChallengeStatus.COMPLETED:
        return 'Đã hoàn thành';
      case ChallengeStatus.CANCELLED:
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const getTypeIcon = (type: ChallengeType) => {
    switch (type) {
      case ChallengeType.DISTANCE:
        return '🏃‍♂️';
      case ChallengeType.TIME:
        return '⏱️';
      case ChallengeType.FREQUENCY:
        return '📊';
      case ChallengeType.STREAK:
        return '🔥';
      case ChallengeType.SPEED:
        return '💨';
      case ChallengeType.COMBINED:
        return '🎯';
      default:
        return '🏆';
    }
  };

  const getDifficultyIcons = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      case 'hard':
        return 3;
      case 'expert':
        return 4;
      default:
        return 1;
    }
  };

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy', { locale: vi });
  };

  const formatTime = (date: string) => {
    return format(new Date(date), 'HH:mm', { locale: vi });
  };

  // Generate QR Code
  const generateQRCode = async () => {
    const challengeUrl = typeof window !== 'undefined' ? `${window.location.origin}/challenges/${challenge.id}` : `/challenges/${challenge.id}`;
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(challengeUrl, {
        width: 80,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  useEffect(() => {
    generateQRCode();
  }, [challenge.id]);

  return (
    <section className="py-4 sm:py-8 px-4 bg-base-100">
      <div className="container mx-auto">
        <div className="w-full max-w-5xl mx-auto">
          {/* Back Button */}
          <div className="mb-4 sm:mb-6 animate-fade-in-up">
            <button 
              onClick={() => router.back()}
              className="btn btn-ghost btn-sm hover:scale-105 transition-transform duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Quay lại</span>
            </button>
          </div>

          {/* Challenge Banner - Responsive */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl border border-base-200 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="relative aspect-[4/3] sm:aspect-[2/1] overflow-hidden">
              {/* Background Gradient */}
              <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"></div>
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
              
              {/* Content Layout - Responsive */}
              <div className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-center sm:items-stretch">
                {/* Left Content - Challenge Info */}
                <div className="flex-1 text-white pr-0 sm:pr-4 lg:pr-8 text-center sm:text-left">
                  {/* X-Club Logo & Brand */}
                  <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                      <img 
                        src="/logo.png" 
                        alt="X-Club Logo" 
                        className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<span class="text-white font-bold text-lg sm:text-xl">X</span>';
                          }
                        }}
                      />
                    </div>
                    <div>
                      <span className="text-lg sm:text-xl font-bold text-white">X-Club</span>
                      <div className="text-white/70 text-xs sm:text-sm">Challenge Platform</div>
                    </div>
                  </div>

                  {/* Challenge Title */}
                  <div className="mb-4 sm:mb-6">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2 leading-tight line-clamp-2 text-white">
                      {challenge.name}
                    </h1>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {getStatusIcon(challenge.status)}
                        <span className="text-white/90 text-sm sm:text-lg font-medium">{getStatusText(challenge.status)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Challenge Code Badge */}
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/25 mb-4 sm:mb-6">
                    <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    <span className="text-xs sm:text-sm font-mono text-white font-medium">{challenge.challengeCode}</span>
                  </div>

                  {/* Challenge Details Grid - Responsive */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 text-white/90">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-white/70">Mục tiêu</div>
                        <div className="text-sm sm:text-lg font-semibold truncate">
                          {challenge.targetValue} {challenge.targetUnit}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 text-white/90">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-white/70">Thời gian</div>
                        <div className="text-sm sm:text-lg font-semibold">
                          {formatDate(challenge.startDate)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 text-white/90 sm:col-span-2 lg:col-span-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {challenge.category === ChallengeCategory.TEAM ? (
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        ) : (
                          <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-white/70">Loại thử thách</div>
                        <div className="text-sm sm:text-lg font-semibold">
                          {challenge.category === ChallengeCategory.TEAM ? 'Tập thể' : 'Cá nhân'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Content - QR Code & Visual Elements */}
                <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 mt-4 sm:mt-0">
                  {/* QR Code Section */}
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/25 shadow-xl">
                    <div className="text-center text-white mb-3 sm:mb-4">
                      <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Quét mã QR</div>
                      <div className="text-xs text-white/70 hidden sm:block">để xem chi tiết</div>
                    </div>
                    {qrCodeUrl ? (
                      <img 
                        src={qrCodeUrl} 
                        alt="QR Code" 
                        className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                        <Tag className="w-8 h-8 sm:w-10 sm:h-10 text-base-content/40" />
                      </div>
                    )}
                  </div>

                  {/* Difficulty Icons */}
                  <div className="flex items-center gap-1">
                    {[...Array(getDifficultyIcons(challenge.difficulty))].map((_, index) => (
                      <span key={index} className="text-xl sm:text-2xl animate-pulse" style={{ animationDelay: `${index * 0.1}s` }}>💪</span>
                    ))}
                  </div>

                  {/* Decorative Elements */}
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/30 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>

              {/* Bottom Color Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
