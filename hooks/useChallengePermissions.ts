'use client';

import { useSession } from 'next-auth/react';
import { Challenge } from '@/types/challenge';

export function useChallengePermissions(challenge: Challenge) {
  const { data: session } = useSession();
  
  const isCreator = session?.user?.id === challenge.createdBy;
  const isClubManager = session?.user?.roles?.includes('club_manager');
  const isParticipant = challenge.userRegistrationStatus !== null;
  
  return {
    // Creator permissions (FULL QUYỀN)
    canEdit: isCreator,
    canDelete: isCreator,
    canManageAllParticipants: isCreator,
    canViewAnalytics: isCreator,
    canPublishChallenge: isCreator,
    canChangeStatus: isCreator,
    
    // Club Manager permissions (QUYỀN HẠN CHẾ)
    canManageClub: isCreator || isClubManager,
    canManageClubParticipants: isCreator || isClubManager,
    canApproveRejectClubMembers: isCreator || isClubManager,
    
    // Common permissions
    canJoin: !isParticipant,
    canLeave: isParticipant,
    canView: true,
    canShare: true,
    canViewProgress: true,
    
    // User info
    isCreator,
    isClubManager,
    isParticipant,
    userId: session?.user?.id
  };
}
