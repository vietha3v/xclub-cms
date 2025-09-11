'use client';

import AuthSection from './AuthSection';

interface UserActionsProps {
  variant?: 'desktop' | 'mobile';
  showMessages?: boolean;
}

export default function UserActions({ 
  variant = 'desktop', 
  showMessages = true 
}: UserActionsProps) {
  // UserActions giờ chỉ là wrapper cho AuthSection
  // để maintain backward compatibility
  return (
    <AuthSection 
      variant="public" 
      showMessages={showMessages}
    />
  );
}
