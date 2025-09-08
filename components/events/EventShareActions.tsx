'use client';

import { useState } from 'react';
import { Event } from '@/types/event';
import { 
  Share2, 
  Mail, 
  MessageSquare, 
  Facebook, 
  Twitter, 
  Instagram,
  Calendar
} from 'lucide-react';
import EventInvitationCard from './EventInvitationCard';

interface EventShareActionsProps {
  event: Event;
}

export default function EventShareActions({ event }: EventShareActionsProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showInvitationCard, setShowInvitationCard] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.name,
        text: event.description,
        url: window.location.href,
      });
    } else {
      setShowShareOptions(true);
    }
  };


  const handleShareToSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(event.name);
    const description = encodeURIComponent(event.description || '');

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'instagram':
        // Instagram không hỗ trợ share link trực tiếp
        alert('Vui lòng sao chép link và chia sẻ trên Instagram');
        return;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Mời tham gia sự kiện: ${event.name}`);
    const body = encodeURIComponent(`
Xin chào!

Tôi muốn mời bạn tham gia sự kiện: ${event.name}

Thời gian: ${new Date(event.startDate).toLocaleString('vi-VN')}
Địa điểm: ${event.location || 'Chưa xác định'}

Mô tả: ${event.description || 'Không có mô tả'}

Link sự kiện: ${window.location.href}

Trân trọng!
    `);
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleCreateInvitation = () => {
    setShowInvitationCard(true);
  };

  const handleAddToCalendar = () => {
    const startDate = new Date(event.startDate);
    const endDate = event.endDate ? new Date(event.endDate) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours default
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location || '')}`;
    
    window.open(calendarUrl, '_blank');
  };


  return (
    <>
      {/* Share & Social Actions */}
      <div className="card bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg border border-primary/10">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Share2 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="card-title text-lg text-base-content">Chia sẻ & Lan tỏa</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button onClick={handleShare} className="btn btn-primary btn-sm">
              <Share2 className="w-4 h-4 mr-1" />
              Chia sẻ
            </button>
            
            <button onClick={handleSendEmail} className="btn btn-outline btn-sm">
              <Mail className="w-4 h-4 mr-1" />
              Email
            </button>
            
            <button onClick={handleCreateInvitation} className="btn btn-outline btn-sm">
              <MessageSquare className="w-4 h-4 mr-1" />
              Thiệp mời
            </button>

            <button onClick={handleAddToCalendar} className="btn btn-outline btn-sm">
              <Calendar className="w-4 h-4 mr-1" />
              Lịch
            </button>
          </div>

          {/* Social Media Share */}
          <div className="divider text-xs text-base-content/60">Mạng xã hội</div>
          <div className="flex gap-2 justify-center">
            <button 
              onClick={() => handleShareToSocial('facebook')}
              className="btn btn-circle btn-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleShareToSocial('twitter')}
              className="btn btn-circle btn-sm bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-lg transition-all"
              title="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleShareToSocial('instagram')}
              className="btn btn-circle btn-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Share Options Modal */}
      {showShareOptions && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Chia sẻ sự kiện</h3>
            <div className="space-y-3">
              <button onClick={handleSendEmail} className="btn btn-outline btn-block">
                <Mail className="w-4 h-4 mr-2" />
                Gửi qua email
              </button>
              <button onClick={handleAddToCalendar} className="btn btn-outline btn-block">
                <Calendar className="w-4 h-4 mr-2" />
                Thêm vào lịch
              </button>
              <div className="divider">Mạng xã hội</div>
              <div className="flex gap-2 justify-center">
                <button 
                  onClick={() => handleShareToSocial('facebook')}
                  className="btn btn-circle bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleShareToSocial('twitter')}
                  className="btn btn-circle bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleShareToSocial('instagram')}
                  className="btn btn-circle bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Instagram className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="modal-action">
              <button 
                onClick={() => setShowShareOptions(false)}
                className="btn btn-ghost"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Invitation Card Modal */}
      {showInvitationCard && (
        <EventInvitationCard 
          event={event} 
          onClose={() => setShowInvitationCard(false)} 
        />
      )}
    </>
  );
}
