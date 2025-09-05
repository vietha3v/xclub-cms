'use client';

import React from 'react';
import Link from 'next/link';
import { Activity } from '@/types/activity';
import { activityUtils } from '@/utils/activityUtils';

interface ActivityCardProps {
  activity: Activity;
  showUser?: boolean;
  compact?: boolean;
}

export default function ActivityCard({ activity, showUser = false, compact = false }: ActivityCardProps) {
  const icon = activityUtils.getActivityIcon(activity.type);
  const colorClass = activityUtils.getActivityColor(activity.type);
  const activityName = activityUtils.getActivityName(activity.type);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (compact) {
    return (
      <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="card-body p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{icon}</div>
              <div>
                <h3 className="font-semibold text-sm">{activity.name}</h3>
                <p className="text-xs text-base-content/70">{activityName}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                {activity.distance ? activityUtils.formatDistance(activity.distance) : 'N/A'}
              </p>
              <p className="text-xs text-base-content/70">
                {activity.duration ? activityUtils.formatDuration(activity.duration) : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      <div className="card-body p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{icon}</div>
            <div>
              <h3 className="card-title text-lg">{activity.name}</h3>
              <p className={`text-sm ${colorClass}`}>{activityName}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-base-content/70">{formatDate(activity.startTime)}</p>
            <p className="text-xs text-base-content/50">{formatTime(activity.startTime)}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {activity.distance && (
            <div className="stat p-0">
              <div className="stat-title text-xs">Khoảng cách</div>
              <div className="stat-value text-lg">{activityUtils.formatDistance(activity.distance)}</div>
            </div>
          )}
          
          {activity.duration && (
            <div className="stat p-0">
              <div className="stat-title text-xs">Thời gian</div>
              <div className="stat-value text-lg">{activityUtils.formatDuration(activity.duration)}</div>
            </div>
          )}
          
          {activity.averagePace && (
            <div className="stat p-0">
              <div className="stat-title text-xs">Pace TB</div>
              <div className="stat-value text-lg">{activityUtils.formatPace(activity.averagePace)}</div>
            </div>
          )}
          
          {activity.calories && (
            <div className="stat p-0">
              <div className="stat-title text-xs">Calories</div>
              <div className="stat-value text-lg">{activityUtils.formatCalories(activity.calories)}</div>
            </div>
          )}
        </div>

        {/* Additional Stats */}
        {(activity.averageHeartRate || activity.elevationGain) && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {activity.averageHeartRate && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-base-content/70">❤️ Nhịp tim TB:</span>
                <span className="text-sm font-medium">{activityUtils.formatHeartRate(activity.averageHeartRate)}</span>
              </div>
            )}
            
            {activity.elevationGain && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-base-content/70">⛰️ Độ cao:</span>
                <span className="text-sm font-medium">{activityUtils.formatElevation(activity.elevationGain)}</span>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        {activity.description && (
          <p className="text-sm text-base-content/70 mb-4 line-clamp-2">{activity.description}</p>
        )}

        {/* Tags */}
        {activity.tags && activity.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {activity.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="badge badge-outline badge-sm">{tag}</span>
            ))}
            {activity.tags.length > 3 && (
              <span className="badge badge-outline badge-sm">+{activity.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="card-actions justify-between items-center">
          <div className="flex items-center gap-2">
            <span className={`badge badge-sm ${activity.status === 'synced' ? 'badge-success' : 'badge-warning'}`}>
              {activity.status === 'synced' ? 'Đã đồng bộ' : 'Chờ đồng bộ'}
            </span>
            <span className="badge badge-outline badge-sm">{activity.source}</span>
          </div>
          
          <Link href={`/activities/${activity.id}`} className="btn btn-primary btn-sm">
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}
