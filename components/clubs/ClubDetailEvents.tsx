'use client';

import React from 'react';
import EventListShared from '@/components/events/EventListShared';

interface ClubDetailEventsProps {
  clubId: string;
}

export default function ClubDetailEvents({ clubId }: ClubDetailEventsProps) {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200">
      <div className="card-body p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="card-title text-xl">📅 Sự kiện</h2>
          </div>
        </div>

        <EventListShared
          clubId={clubId}
          mode="public"
          showCreateButton={false}
          showSearch={false}
          showFilters={false}
          showPagination={false}
          limit={6}
          title=""
          description=""
        />
      </div>
    </div>
  );
}