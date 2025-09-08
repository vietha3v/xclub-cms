'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Event } from '@/types/event';
import { Calendar, MapPin, Tag, Clock, Users, Download, Share2, X, User, QrCode } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import QRCode from 'qrcode';
// import html2canvas from 'html2canvas';

interface EventInvitationCardProps {
  event: Event;
  onClose?: () => void;
}

interface InvitationData {
  guestName: string;
  guestEmail: string;
  personalMessage: string;
}

export default function EventInvitationCard({ event, onClose }: EventInvitationCardProps) {
  const [invitationData, setInvitationData] = useState<InvitationData>({
    guestName: '',
    guestEmail: '',
    personalMessage: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const cardRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: string) => {
    return format(parseISO(date), 'dd/MM/yyyy', { locale: vi });
  };

  const formatTime = (date: string) => {
    return format(parseISO(date), 'HH:mm', { locale: vi });
  };

  // Generate QR Code
  const generateQRCode = async () => {
    const eventUrl = typeof window !== 'undefined' ? `${window.location.origin}/events/${event.id}` : `/events/${event.id}`;
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(eventUrl, {
        width: 160,
        margin: 2,
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

  // Generate QR code on component mount
  useEffect(() => {
    generateQRCode();
  }, [event.id]);

  const handleInputChange = (field: keyof InvitationData, value: string) => {
    setInvitationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateImage = async () => {
    // TODO: Implement with html2canvas when package is installed
    alert('Tính năng tải xuống ảnh đang được phát triển. Vui lòng cài đặt html2canvas package.');
  };

  const shareInvitation = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Lời mời tham gia: ${event.name}`,
          text: `Xin chào ${invitationData.guestName}! Bạn được mời tham gia sự kiện: ${event.name}`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      const shareText = `Xin chào ${invitationData.guestName}!

Bạn được mời tham gia sự kiện: ${event.name}
Thời gian: ${formatDate(event.startDate)} lúc ${formatTime(event.startDate)}
Địa điểm: ${event.location || 'Chưa xác định'}

${invitationData.personalMessage ? `Lời nhắn: ${invitationData.personalMessage}` : ''}

Link sự kiện: ${window.location.href}

Trân trọng!`;

      try {
        await navigator.clipboard.writeText(shareText);
        alert('Đã sao chép nội dung mời vào clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        alert('Không thể sao chép. Vui lòng thử lại.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-base-100 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300">
          <h2 className="text-2xl font-bold text-base-content">Tạo thiệp mời</h2>
          {onClose && (
            <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Input */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-base-content">Thông tin người được mời</h3>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tên người được mời *</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên người được mời..."
                  className="input input-bordered"
                  value={invitationData.guestName}
                  onChange={(e) => handleInputChange('guestName', e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email người được mời</span>
                </label>
                <input
                  type="email"
                  placeholder="Nhập email..."
                  className="input input-bordered"
                  value={invitationData.guestEmail}
                  onChange={(e) => handleInputChange('guestEmail', e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Lời nhắn cá nhân</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Thêm lời nhắn cá nhân..."
                  rows={4}
                  value={invitationData.personalMessage}
                  onChange={(e) => handleInputChange('personalMessage', e.target.value)}
                ></textarea>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={generateImage}
                  disabled={!invitationData.guestName || isGenerating}
                  className="btn btn-primary flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isGenerating ? 'Đang tạo...' : 'Tải xuống ảnh'}
                </button>
                <button
                  onClick={shareInvitation}
                  disabled={!invitationData.guestName}
                  className="btn btn-secondary flex-1"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Chia sẻ
                </button>
              </div>
            </div>

            {/* Preview Card */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-base-content">Xem trước thiệp mời</h3>
              
              <div className="border-2 border-dashed border-base-300 rounded-xl p-4">
                <div ref={cardRef} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* X-Club Header */}
                  <div className="bg-gradient-to-r from-primary to-secondary p-4 text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                        <img 
                          src="/logo.png" 
                          alt="X-Club Logo" 
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            // Fallback to text logo if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = '<span class="text-primary font-bold text-lg">X</span>';
                            }
                          }}
                        />
                      </div>
                      <span className="text-white font-bold text-lg">X-Club</span>
                    </div>
                    <p className="text-white/90 text-sm">Lời mời tham gia sự kiện</p>
                  </div>

                  <div className="p-6">
                    {/* Greeting */}
                    {invitationData.guestName && (
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-base-content mb-2">
                          Xin chào {invitationData.guestName}!
                        </h2>
                        <p className="text-base-content/70">
                          Bạn được mời tham gia sự kiện đặc biệt
                        </p>
                      </div>
                    )}

                    {/* Event Banner */}
                    {event.coverImageUrl && (
                      <div className="mb-6 rounded-xl overflow-hidden">
                        <img
                          src={event.coverImageUrl}
                          alt={event.name}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    )}

                    {/* Event Title */}
                    <div className="text-center mb-6">
                      <h1 className="text-2xl font-bold text-primary mb-2">
                        {event.name}
                      </h1>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                        <Tag className="w-3 h-3 text-primary" />
                        <span className="text-xs font-medium text-primary">Mã: {event.eventCode}</span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                        <Calendar className="w-4 h-4 text-primary" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-base-content">
                            {formatDate(event.startDate)}
                          </div>
                          <div className="text-xs text-primary">
                            {formatTime(event.startDate)}
                            {event.endDate && ` - ${formatTime(event.endDate)}`}
                          </div>
                        </div>
                      </div>

                      {event.location && (
                        <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
                          <MapPin className="w-4 h-4 text-secondary" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-base-content">{event.location}</div>
                            {event.address && (
                              <div className="text-xs text-base-content/70">{event.address}</div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
                        <Tag className="w-4 h-4 text-accent" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-base-content capitalize">{event.type}</div>
                          {event.registrationFee !== undefined && (
                            <div className="text-xs text-accent">
                              {event.registrationFee === 0 ? 'Miễn phí' : `${event.registrationFee.toLocaleString()}đ`}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Personal Message */}
                    {invitationData.personalMessage && (
                      <div className="mb-6 p-4 bg-base-200/50 rounded-lg">
                        <div className="text-sm text-base-content/80 italic">
                          "{invitationData.personalMessage}"
                        </div>
                      </div>
                    )}

                    {/* QR Code & Link Section */}
                    <div className="text-center pt-4 border-t border-base-300">
                      <div className="text-xs text-base-content/60 mb-3">
                        Quét mã QR hoặc truy cập link để xem chi tiết
                      </div>
                      
                      {/* QR Code */}
                      <div className="flex justify-center mb-4">
                        {qrCodeUrl ? (
                          <img 
                            src={qrCodeUrl} 
                            alt="QR Code" 
                            className="w-20 h-20 rounded-lg border border-base-300"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-base-200 rounded-lg flex items-center justify-center border-2 border-dashed border-base-300">
                            <QrCode className="w-8 h-8 text-base-content/40" />
                          </div>
                        )}
                      </div>
                      
                      {/* Event Link */}
                      <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                        <div className="text-xs text-base-content/60 mb-1">Link sự kiện:</div>
                        <div className="text-sm font-mono text-primary break-all">
                          {typeof window !== 'undefined' ? `${window.location.origin}/events/${event.id}` : `/events/${event.id}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
