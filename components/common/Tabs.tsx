'use client';

import React, { useState, useEffect } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'compact' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
}

export default function Tabs({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  className = '',
  fullWidth = false
}: TabsProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevActiveTab, setPrevActiveTab] = useState(activeTab);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: '0px', width: '100px' });

  // Calculate indicator position based on actual DOM elements
  const updateIndicatorPosition = (tabId: string) => {
    const tabElement = document.querySelector(`[data-tab-id="${tabId}"]`) as HTMLElement;
    const containerElement = document.querySelector(`[data-tabs-container]`) as HTMLElement;
    
    if (!tabElement || !containerElement) return;
    
    const containerRect = containerElement.getBoundingClientRect();
    const tabRect = tabElement.getBoundingClientRect();
    
    // Account for container padding and gap
    const containerPadding = 4; // p-1 = 4px
    const gap = 2; // gap-0.5 = 2px
    
    const left = tabRect.left - containerRect.left - containerPadding;
    const width = tabRect.width;
    
    setIndicatorStyle({
      left: `${left}px`,
      width: `${width}px`
    });
  };

  // Handle tab change with animation
  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab || isTransitioning) return;
    
    setIsTransitioning(true);
    setPrevActiveTab(activeTab);
    
    // Immediate tab change for smooth visual transition
    onTabChange(tabId);
    
    // Update indicator position after DOM update
    setTimeout(() => {
      updateIndicatorPosition(tabId);
    }, 0);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  // Initialize indicator position
  useEffect(() => {
    // Use setTimeout to ensure DOM is rendered
    const timer = setTimeout(() => {
      updateIndicatorPosition(activeTab);
    }, 0);
    
    return () => clearTimeout(timer);
  }, [activeTab, fullWidth, tabs.length]);

  // Reset transition state when activeTab changes
  useEffect(() => {
    if (activeTab !== prevActiveTab) {
      setIsTransitioning(false);
    }
  }, [activeTab, prevActiveTab]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      updateIndicatorPosition(activeTab);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'p-0.5',
          button: 'px-3 py-1.5 text-xs min-w-[80px]',
          icon: 'text-xs mr-1',
          badge: 'text-xs px-1.5 py-0.5'
        };
      case 'lg':
        return {
          container: 'p-2',
          button: 'px-6 py-3 text-base min-w-[140px]',
          icon: 'text-lg mr-2',
          badge: 'text-sm px-2 py-1'
        };
      default: // md
        return {
          container: 'p-1',
          button: 'px-4 py-2 text-sm min-w-[100px]',
          icon: 'text-sm mr-1.5',
          badge: 'text-xs px-1.5 py-0.5'
        };
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'bg-transparent border-0 shadow-none p-0',
          button: 'bg-transparent border-0 shadow-none rounded-none',
          active: 'border-b-2 border-primary text-primary bg-transparent',
          inactive: 'text-base-content/60 hover:text-base-content hover:bg-transparent'
        };
      case 'pills':
        return {
          container: 'bg-base-200 rounded-full p-1',
          button: 'rounded-full bg-transparent',
          active: 'text-primary-content',
          inactive: 'text-base-content/60 hover:text-base-content'
        };
      case 'underline':
        return {
          container: 'bg-transparent border-b border-base-300 p-0',
          button: 'bg-transparent border-0 shadow-none rounded-none',
          active: 'border-b-2 border-primary text-primary bg-transparent',
          inactive: 'text-base-content/60 hover:text-base-content hover:bg-transparent'
        };
      default: // default
        return {
          container: 'bg-base-100 rounded-lg shadow-sm border border-base-300/50',
          button: 'rounded-md bg-transparent',
          active: 'text-primary-content',
          inactive: 'text-base-content/60 hover:text-base-content'
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const variantClasses = getVariantClasses();

  return (
    <div className={`flex justify-center mb-6 ${className}`}>
      <div 
        data-tabs-container
        className={`${variantClasses.container} ${sizeClasses.container} ${fullWidth ? 'w-full' : ''} relative transition-all duration-300 ${
          isTransitioning ? 'transform scale-98' : 'transform scale-100'
        }`}
      >
        {/* Sliding Indicator */}
        <div 
          className={`absolute top-1 bottom-1 bg-primary transition-all duration-300 ease-in-out z-0 ${
            variant === 'pills' ? 'rounded-full' : 'rounded-md'
          } border border-primary/20`}
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            zIndex: 0,
          }}
        />
        
        <div className={`flex ${fullWidth ? 'w-full' : ''} gap-0.5 transition-all duration-300 relative z-10 ${
          isTransitioning ? 'opacity-90' : 'opacity-100'
        }`}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isPrevActive = prevActiveTab === tab.id;
            
            return (
              <button
                key={tab.id}
                data-tab-id={tab.id}
                disabled={tab.disabled || isTransitioning}
                className={`
                  relative ${sizeClasses.button} ${variantClasses.button} font-medium
                  flex items-center justify-center
                  ${fullWidth ? 'flex-1' : ''}
                  transition-all duration-300 ease-in-out
                  ${isActive 
                    ? `${variantClasses.active} transform scale-105` 
                    : `${variantClasses.inactive} ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}`
                  }
                  ${isTransitioning && isPrevActive ? 'opacity-60 scale-95 transform' : ''}
                  ${isTransitioning && isActive ? 'transform scale-105' : ''}
                  ${!tab.disabled && !isTransitioning ? 'hover:scale-102 active:scale-95' : ''}
                  ${tab.disabled ? 'hover:scale-100 active:scale-100' : ''}
                `}
                onClick={() => !tab.disabled && handleTabChange(tab.id)}
              >
                {/* Content */}
                <div className={`relative z-20 flex items-center transition-all duration-300 ${
                  isActive ? 'text-primary-content' : ''
                }`}>
                  {tab.icon && (
                    <span className={`${sizeClasses.icon} transition-all duration-300 ${
                      tab.disabled ? 'opacity-50' : ''
                    }`}>
                      {tab.icon}
                    </span>
                  )}
                  <span className={`font-medium transition-all duration-300 ${
                    tab.disabled ? 'opacity-50' : ''
                  } ${isActive ? 'font-semibold' : ''}`}>
                    {tab.label}
                  </span>
                  {tab.badge && (
                    <span className={`ml-1.5 ${sizeClasses.badge} bg-primary/20 text-primary rounded-full font-medium transition-all duration-300 ${
                      isActive ? 'bg-primary-content/20 text-primary-content' : ''
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </div>
                
                {/* Animated bottom border for active tab (underline variants) */}
                {(variant === 'underline' || variant === 'compact') && isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full transition-all duration-300"></div>
                )}
                
                {/* Slide transition effect */}
                {isTransitioning && isActive && (
                  <div className="absolute inset-0  rounded-md transition-all duration-300 transform scale-105"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Preset configurations for common use cases
export const TabPresets = {
  // Default tabs for most pages
  default: {
    variant: 'default' as const,
    size: 'md' as const
  },
  
  // Compact tabs for headers/navbars
  compact: {
    variant: 'compact' as const,
    size: 'sm' as const
  },
  
  // Pills for settings/forms
  pills: {
    variant: 'pills' as const,
    size: 'sm' as const
  },
  
  // Underline for content sections
  underline: {
    variant: 'underline' as const,
    size: 'md' as const
  }
};
