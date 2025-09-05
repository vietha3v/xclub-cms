import { ActivityType } from '@/types/activity';
import { format, formatDistanceToNow, formatDuration, intervalToDuration } from 'date-fns';
import { vi } from 'date-fns/locale';

export const activityUtils = {
  getActivityIcon: (type: ActivityType): string => {
    switch (type) {
      case ActivityType.RUNNING:
        return '🏃‍♂️';
      case ActivityType.CYCLING:
        return '🚴‍♂️';
      case ActivityType.SWIMMING:
        return '🏊‍♂️';
      case ActivityType.WALKING:
        return '🚶‍♂️';
      case ActivityType.HIKING:
        return '🥾';
      case ActivityType.YOGA:
        return '🧘‍♀️';
      case ActivityType.WEIGHT_TRAINING:
        return '🏋️‍♂️';
      default:
        return '🏃‍♂️';
    }
  },

  getActivityColor: (type: ActivityType): string => {
    switch (type) {
      case ActivityType.RUNNING:
        return 'text-orange-500';
      case ActivityType.CYCLING:
        return 'text-blue-500';
      case ActivityType.SWIMMING:
        return 'text-cyan-500';
      case ActivityType.WALKING:
        return 'text-green-500';
      case ActivityType.HIKING:
        return 'text-amber-500';
      case ActivityType.YOGA:
        return 'text-purple-500';
      case ActivityType.WEIGHT_TRAINING:
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  },

  getActivityName: (type: ActivityType): string => {
    switch (type) {
      case ActivityType.RUNNING:
        return 'Chạy bộ';
      case ActivityType.CYCLING:
        return 'Đạp xe';
      case ActivityType.SWIMMING:
        return 'Bơi lội';
      case ActivityType.WALKING:
        return 'Đi bộ';
      case ActivityType.HIKING:
        return 'Leo núi';
      case ActivityType.YOGA:
        return 'Yoga';
      case ActivityType.WEIGHT_TRAINING:
        return 'Tập tạ';
      default:
        return 'Hoạt động';
    }
  },

  formatDistance: (distance: number): string => {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(2)} km`;
    }
    return `${distance.toFixed(0)} m`;
  },

  formatDuration: (duration: number): string => {
    const durationObj = intervalToDuration({ start: 0, end: duration * 1000 });
    return formatDuration(durationObj, {
      format: ['hours', 'minutes', 'seconds'],
      locale: vi
    });
  },

  formatPace: (pace?: number): string => {
    if (!pace) return 'N/A';
    const minutes = Math.floor(pace / 60);
    const seconds = Math.floor(pace % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}/km`;
  },

  formatSpeed: (speed?: number): string => {
    if (!speed) return 'N/A';
    return `${speed.toFixed(1)} km/h`;
  },

  formatCalories: (calories?: number): string => {
    if (!calories) return 'N/A';
    return `${calories.toFixed(0)} cal`;
  },

  formatHeartRate: (heartRate?: number): string => {
    if (!heartRate) return 'N/A';
    return `${heartRate} bpm`;
  },

  formatElevation: (elevation?: number): string => {
    if (!elevation) return 'N/A';
    return `${elevation.toFixed(0)} m`;
  },

  formatDate: (date: Date | string): string => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi });
  },

  formatRelativeTime: (date: Date | string): string => {
    return formatDistanceToNow(new Date(date), { 
      addSuffix: true, 
      locale: vi 
    });
  }
};
