'use client';

import React from 'react';
import EventListShared from '@/components/events/EventListShared';

interface ClubEventManagementProps {
  clubId: string;
}

export default function ClubEventManagement({ clubId }: ClubEventManagementProps) {
  return (
    <EventListShared
      clubId={clubId}
      mode="admin"
      showCreateButton={true}
      showSearch={true}
      showFilters={true}
      showPagination={true}
      limit={12}
      title="Quản lý sự kiện"
      description="Tạo và quản lý các sự kiện của CLB"
    />
  );
}
