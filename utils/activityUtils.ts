import { ActivityType } from '@/types/activity';
import { format, formatDistanceToNow, formatDuration, intervalToDuration } from 'date-fns';
import { vi } from 'date-fns/locale';

export const activityUtils = {
  getActivityIcon: (type: ActivityType): string => {
    switch (type) {
      case ActivityType.RUNNING:
      case ActivityType.TRAIL_RUNNING:
      case ActivityType.JOGGING:
        return '🏃‍♂️';
      case ActivityType.CYCLING:
      case ActivityType.MOUNTAIN_BIKING:
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
      case ActivityType.TRAIL_RUNNING:
      case ActivityType.JOGGING:
        return 'text-orange-500';
      case ActivityType.CYCLING:
      case ActivityType.MOUNTAIN_BIKING:
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
      case ActivityType.TRAIL_RUNNING:
        return 'Chạy trail';
      case ActivityType.JOGGING:
        return 'Chạy chậm';
      case ActivityType.CYCLING:
        return 'Đạp xe';
      case ActivityType.MOUNTAIN_BIKING:
        return 'Đạp xe leo núi';
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

  formatDistance: (distance?: number | null): string => {
    if (!distance || isNaN(distance)) return 'N/A';
    // Backend stores distance in km, so we can display directly
    if (distance >= 1) {
      return `${distance.toFixed(1)} km`;
    }
    // For distances less than 1km, show in meters
    return `${(distance * 1000).toFixed(0)} m`;
  },

  formatDuration: (duration?: number | null): string => {
    if (!duration || isNaN(duration)) return 'N/A';
    
    const durationObj = intervalToDuration({ start: 0, end: duration * 1000 });
    
    // Format as HH:MM:SS or MM:SS using date-fns
    if (durationObj.hours && durationObj.hours > 0) {
      return format(new Date(0, 0, 0, durationObj.hours, durationObj.minutes || 0, durationObj.seconds || 0), 'HH:mm:ss');
    } else {
      return format(new Date(0, 0, 0, 0, durationObj.minutes || 0, durationObj.seconds || 0), 'mm:ss');
    }
  },

  formatPace: (pace?: number | null): string => {
    if (!pace || isNaN(pace)) return 'N/A';
    const minutes = Math.floor(pace / 60);
    const seconds = Math.floor(pace % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}/km`;
  },

  formatSpeed: (speed?: number | null): string => {
    if (!speed || isNaN(speed)) return 'N/A';
    return `${speed.toFixed(1)} km/h`;
  },

  formatCalories: (calories?: number | null): string => {
    if (!calories || isNaN(calories)) return 'N/A';
    return `${calories.toFixed(0)} cal`;
  },

  formatHeartRate: (heartRate?: number | null): string => {
    if (!heartRate || isNaN(heartRate)) return 'N/A';
    return `${heartRate} bpm`;
  },

  formatElevation: (elevation?: number | null): string => {
    if (!elevation || isNaN(elevation)) return 'N/A';
    return `${elevation.toFixed(0)} m`;
  },

  formatDate: (date?: Date | string | null): string => {
    if (!date) return 'N/A';
    try {
      return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi });
    } catch {
      return 'N/A';
    }
  },

  formatRelativeTime: (date?: Date | string | null): string => {
    if (!date) return 'N/A';
    try {
      return formatDistanceToNow(new Date(date), { 
        addSuffix: true, 
        locale: vi 
      });
    } catch {
      return 'N/A';
    }
  }
};
