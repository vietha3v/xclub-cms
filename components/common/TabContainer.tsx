import React from 'react';
import Tabs, { TabItem } from './Tabs';

interface TabContainerProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  variant?: 'default' | 'compact' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function TabContainer({ 
  tabs, 
  activeTab, 
  onTabChange, 
  className = '',
  variant = 'default',
  size = 'md',
  fullWidth = false
}: TabContainerProps) {
  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      variant={variant}
      size={size}
      className={className}
      fullWidth={fullWidth}
    />
  );
}
