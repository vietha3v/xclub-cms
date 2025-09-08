'use client';

import { Event } from '@/types/event';
import { Calendar, MapPin, Tag, Clock, Users, QrCode } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

interface EventDetailHeaderProps {
  event: Event;
}

export default function EventDetailHeader({ event }: EventDetailHeaderProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

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
  }, [event.id]);

  return (
    <section className="py-8 px-4 bg-base-100">
      <div className="container mx-auto">
        <div className="w-full max-w-5xl mx-auto">
          {/* Event Banner - Tỷ lệ 2:1 */}
          <div className="bg-white rounded-3xl shadow-2xl border border-base-200 overflow-hidden">
            <div className="relative aspect-[2/1] overflow-hidden">
              {/* Background Image */}
              {event.coverImageUrl ? (
                <img 
                  src={event.coverImageUrl} 
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
              )}
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
              
              {/* Content Layout */}
              <div className="absolute inset-0 p-8 flex items-center">
                {/* Left Content - Event Info */}
                <div className="flex-1 text-white pr-8">
                  {/* X-Club Logo & Brand */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                      <img 
                        src="/logo.png" 
                        alt="X-Club Logo" 
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<span class="text-white font-bold text-xl">X</span>';
                          }
                        }}
                      />
                    </div>
                    <div>
                      <span className="text-xl font-bold text-white">X-Club</span>
                      <div className="text-white/70 text-sm">Event Platform</div>
                    </div>
                  </div>

                  {/* Event Title */}
                  <div className="mb-6">
                    <h1 className="text-4xl font-black mb-2 leading-tight line-clamp-2 text-white">
                      {event.name}
                    </h1>
                    <div className="text-white/80 text-lg font-medium">Live Event</div>
                  </div>
                  
                  {/* Event Code Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/25 mb-6">
                    <Tag className="w-4 h-4 text-white" />
                    <span className="text-sm font-mono text-white font-medium">{event.eventCode}</span>
                  </div>

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-white/70">Thời gian</div>
                        <div className="text-lg font-semibold">
                          {formatDate(event.startDate)} - {formatTime(event.startDate)}
                        </div>
                      </div>
                    </div>

                    {event.location && (
                      <div className="flex items-center gap-3 text-white/90">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-white/70">Địa điểm</div>
                          <div className="text-lg font-semibold line-clamp-1">{event.location}</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-white/90">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <Tag className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-white/70">Phí tham gia</div>
                        <div className="text-lg font-semibold">
                          {event.registrationFee === 0 ? 'Miễn phí' : `${(event.registrationFee || 0).toLocaleString()}đ`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Content - QR Code & Visual Elements */}
                <div className="flex flex-col items-center justify-center space-y-6">
                  {/* QR Code Section */}
                  <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-6 border border-white/25 shadow-xl">
                    <div className="text-center text-white mb-4">
                      <div className="text-sm font-semibold uppercase tracking-wider">Quét mã QR</div>
                      <div className="text-xs text-white/70">để xem chi tiết</div>
                    </div>
                    {qrCodeUrl ? (
                      <img 
                        src={qrCodeUrl} 
                        alt="QR Code" 
                        className="w-24 h-24 bg-white rounded-2xl p-2 shadow-lg"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                        <QrCode className="w-10 h-10 text-base-content/40" />
                      </div>
                    )}
                  </div>

                  {/* Decorative Elements */}
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
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
