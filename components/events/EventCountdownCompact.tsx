'use client';

import { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, isAfter, isBefore } from 'date-fns';
import { EventStatus } from '@/types/event';

interface EventCountdownCompactProps {
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

export default function EventCountdownCompact({ startDate, endDate, status }: EventCountdownCompactProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : null;

      // Nếu sự kiện đã kết thúc
      if (end && isAfter(now, end)) {
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
      return { type: 'cancelled', text: 'Đã hủy', color: 'text-error' };
    }

    if (status === EventStatus.COMPLETED || (end && isAfter(now, end))) {
      return { type: 'completed', text: 'Đã kết thúc', color: 'text-base-content/70' };
    }

    if (isAfter(now, start) && (!end || isBefore(now, end))) {
      return { type: 'ongoing', text: 'Đang diễn ra', color: 'text-success' };
    }

    if (isBefore(now, start)) {
      return { type: 'upcoming', text: 'Sắp bắt đầu', color: 'text-primary' };
    }

    return { type: 'unknown', text: 'Không xác định', color: 'text-warning' };
  };

  const countdownStatus = getCountdownStatus();

  // Nếu sự kiện đã kết thúc hoặc bị hủy
  if (countdownStatus.type === 'completed' || countdownStatus.type === 'cancelled') {
    return (
      <div className={`text-xs font-medium ${countdownStatus.color}`}>
        {countdownStatus.text}
      </div>
    );
  }

  // Nếu sự kiện đang diễn ra
  if (countdownStatus.type === 'ongoing') {
    if (endDate) {
      return (
        <div className="text-xs">
          <div className={`font-medium ${countdownStatus.color} mb-1`}>
            {countdownStatus.text}
          </div>
          <div className="text-base-content/70">
            {timeLeft.days > 0 && `${timeLeft.days}d `}
            {timeLeft.hours > 0 && `${timeLeft.hours}h `}
            {timeLeft.minutes > 0 && `${timeLeft.minutes}m`}
            {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && `${timeLeft.seconds}s`}
          </div>
        </div>
      );
    } else {
      return (
        <div className={`text-xs font-medium ${countdownStatus.color}`}>
          {countdownStatus.text}
        </div>
      );
    }
  }

  // Nếu sự kiện sắp bắt đầu
  return (
    <div className="text-xs">
      <div className={`font-medium ${countdownStatus.color} mb-1`}>
        {countdownStatus.text}
      </div>
      <div className="text-base-content/70">
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {timeLeft.hours > 0 && `${timeLeft.hours}h `}
        {timeLeft.minutes > 0 && `${timeLeft.minutes}m`}
        {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && `${timeLeft.seconds}s`}
      </div>
    </div>
  );
}
