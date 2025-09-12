'use client';

import React, { useState, useEffect } from 'react';
import { Timer, Play, Square } from 'lucide-react';
import {  isAfter } from 'date-fns';

interface CountdownTimerProps {
  startDate: string;
  endDate?: string;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  startDate, 
  endDate, 
  className = "w-2 h-2 sm:w-3 sm:h-3" 
}) => {
  const [countdown, setCountdown] = useState<string>('...');
  const [countdownType, setCountdownType] = useState<'upcoming' | 'ongoing' | 'ended'>('upcoming');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      
      // For demo purposes, let's create a test countdown
      // Add 5 minutes to current time for demo
      const demoEndTime = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes from now
      
      const startTime = new Date(startDate);
      const endTime = endDate ? new Date(endDate) : demoEndTime;

      // Đã kết thúc
      if (endTime && isAfter(now, endTime)) {
        setCountdown('00:00:00');
        setCountdownType('ended');
        return;
      }

      // Demo countdown - always show ongoing countdown for demo
      setCountdownType('ongoing');
      const totalSeconds = Math.floor((endTime.getTime() - now.getTime()) / 1000);
      
      if (totalSeconds > 0) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setCountdown('00:00:00');
        setCountdownType('ended');
      }
      return;
    };

    updateCountdown();
    setIsLoading(false);
    
    // Update immediately and then every second for real-time countdown
    const interval = setInterval(updateCountdown, 1000); // Update every second

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  const getIcon = () => {
    switch (countdownType) {
      case 'upcoming':
        return <Timer className={`${className} animate-spin text-orange-500`} />;
      case 'ongoing':
        return <Play className={`${className} text-green-500`} />;
      case 'ended':
        return <Square className={`${className} text-gray-500`} />;
      default:
        return <Timer className={className} />;
    }
  };

  if (isLoading) {
    return (
      <>
        <Timer className={`${className} animate-pulse`} />
        <span>...</span>
      </>
    );
  }

  return (
    <>
      {getIcon()}
      <span>{countdown}</span>
    </>
  );
};

export default CountdownTimer;
