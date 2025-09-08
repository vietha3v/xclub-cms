'use client';

import { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, isAfter, isBefore, format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { EventStatus } from '@/types/event';

interface EventCountdownProps {
  startDate: string;
  endDate?: string;
  status: EventStatus;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function EventCountdown({ startDate, endDate, status }: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : null;

      // Nếu sự kiện đã kết thúc
      if (end && isAfter(now, end)) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      // Nếu sự kiện đang diễn ra
      if (isAfter(now, start) && (!end || isBefore(now, end))) {
        if (end) {
          // Đếm ngược đến khi kết thúc
          const days = differenceInDays(end, now);
          const hours = differenceInHours(end, now) % 24;
          const minutes = differenceInMinutes(end, now) % 60;
          const seconds = differenceInSeconds(end, now) % 60;
          return { days, hours, minutes, seconds };
        } else {
          // Sự kiện đang diễn ra nhưng không có thời gian kết thúc
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      }

      // Nếu sự kiện chưa bắt đầu - đếm ngược đến khi bắt đầu
      if (isBefore(now, start)) {
        const days = differenceInDays(start, now);
        const hours = differenceInHours(start, now) % 24;
        const minutes = differenceInMinutes(start, now) % 60;
        const seconds = differenceInSeconds(start, now) % 60;
        return { days, hours, minutes, seconds };
      }

      // Nếu thời gian hiện tại bằng thời gian bắt đầu
      setIsExpired(true);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Tính toán ban đầu
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [startDate, endDate]);

  const getCountdownStatus = () => {
    const now = new Date();
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    if (status === EventStatus.CANCELLED) {
      return { type: 'cancelled', text: 'Sự kiện đã bị hủy', color: 'text-error' };
    }

    if (status === EventStatus.COMPLETED || (end && isAfter(now, end))) {
      return { type: 'completed', text: 'Sự kiện đã kết thúc', color: 'text-base-content/70' };
    }

    if (isAfter(now, start) && (!end || isBefore(now, end))) {
      return { type: 'ongoing', text: 'Sự kiện đang diễn ra', color: 'text-success' };
    }

    if (isBefore(now, start)) {
      return { type: 'upcoming', text: 'Sự kiện sắp bắt đầu', color: 'text-primary' };
    }

    return { type: 'unknown', text: 'Trạng thái không xác định', color: 'text-warning' };
  };

  const countdownStatus = getCountdownStatus();

  // Nếu sự kiện đã kết thúc hoặc bị hủy, hiển thị trạng thái
  if (countdownStatus.type === 'completed' || countdownStatus.type === 'cancelled') {
    return (
      <div className="text-center">
        <div className={`text-2xl font-bold ${countdownStatus.color} mb-2`}>
          {countdownStatus.text}
        </div>
        <div className="text-sm text-base-content/70">
          {countdownStatus.type === 'completed' 
            ? `Kết thúc lúc ${format(new Date(endDate || startDate), 'dd/MM/yyyy HH:mm', { locale: vi })}`
            : 'Sự kiện này đã bị hủy'
          }
        </div>
      </div>
    );
  }

  // Nếu sự kiện đang diễn ra
  if (countdownStatus.type === 'ongoing') {
    return (
      <div className="text-center">
        <div className={`text-2xl font-bold ${countdownStatus.color} mb-4`}>
          {countdownStatus.text}
        </div>
        {endDate && (
          <>
            <div className="text-sm text-base-content/70 mb-4">
              Còn lại:
            </div>
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              <div className="bg-base-100 rounded-lg p-4 shadow-lg">
                <div className="text-2xl font-bold text-primary">{timeLeft.days}</div>
                <div className="text-xs text-base-content/70">Ngày</div>
              </div>
              <div className="bg-base-100 rounded-lg p-4 shadow-lg">
                <div className="text-2xl font-bold text-primary">{timeLeft.hours}</div>
                <div className="text-xs text-base-content/70">Giờ</div>
              </div>
              <div className="bg-base-100 rounded-lg p-4 shadow-lg">
                <div className="text-2xl font-bold text-primary">{timeLeft.minutes}</div>
                <div className="text-xs text-base-content/70">Phút</div>
              </div>
              <div className="bg-base-100 rounded-lg p-4 shadow-lg">
                <div className="text-2xl font-bold text-primary">{timeLeft.seconds}</div>
                <div className="text-xs text-base-content/70">Giây</div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Nếu sự kiện sắp bắt đầu
  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${countdownStatus.color} mb-4`}>
        {countdownStatus.text}
      </div>
      <div className="text-sm text-base-content/70 mb-4">
        Còn lại:
      </div>
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        <div className="bg-base-100 rounded-lg p-4 shadow-lg">
          <div className="text-2xl font-bold text-primary">{timeLeft.days}</div>
          <div className="text-xs text-base-content/70">Ngày</div>
        </div>
        <div className="bg-base-100 rounded-lg p-4 shadow-lg">
          <div className="text-2xl font-bold text-primary">{timeLeft.hours}</div>
          <div className="text-xs text-base-content/70">Giờ</div>
        </div>
        <div className="bg-base-100 rounded-lg p-4 shadow-lg">
          <div className="text-2xl font-bold text-primary">{timeLeft.minutes}</div>
          <div className="text-xs text-base-content/70">Phút</div>
        </div>
        <div className="bg-base-100 rounded-lg p-4 shadow-lg">
          <div className="text-2xl font-bold text-primary">{timeLeft.seconds}</div>
          <div className="text-xs text-base-content/70">Giây</div>
        </div>
      </div>
    </div>
  );
}
