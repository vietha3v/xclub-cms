'use client';

import React from 'react';

// Base skeleton component
interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function Skeleton({ className = '', children }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-base-300 rounded ${className}`}>
      {children}
    </div>
  );
}

// Text skeleton variants
interface TextSkeletonProps {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}

export function TextSkeleton({ lines = 1, className = '', lastLineWidth = '75%' }: TextSkeletonProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={`h-4 ${
            index === lines - 1 ? `w-[${lastLineWidth}]` : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}

// Card skeleton
interface CardSkeletonProps {
  showImage?: boolean;
  showActions?: boolean;
  className?: string;
}

export function CardSkeleton({ showImage = true, showActions = true, className = '' }: CardSkeletonProps) {
  return (
    <div className={`bg-base-100 rounded-lg shadow-sm border border-base-300 p-4 ${className}`}>
      {showImage && (
        <Skeleton className="w-full h-48 mb-4 rounded-lg" />
      )}
      
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <TextSkeleton lines={2} />
        
        {showActions && (
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        )}
      </div>
    </div>
  );
}

// Table skeleton
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  className?: string;
}

export function TableSkeleton({ rows = 5, columns = 4, showHeader = true, className = '' }: TableSkeletonProps) {
  return (
    <div className={`bg-base-100 rounded-lg shadow-sm border border-base-300 overflow-hidden ${className}`}>
      {showHeader && (
        <div className="bg-base-200 px-4 py-3 border-b border-base-300">
          <div className="flex gap-4">
            {Array.from({ length: columns }).map((_, index) => (
              <Skeleton key={index} className="h-4 flex-1" />
            ))}
          </div>
        </div>
      )}
      
      <div className="divide-y divide-base-300">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-4 py-3">
            <div className="flex gap-4 items-center">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton 
                  key={colIndex} 
                  className={`h-4 ${
                    colIndex === 0 ? 'w-8' : 
                    colIndex === columns - 1 ? 'w-16' : 'flex-1'
                  }`} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// List skeleton
interface ListSkeletonProps {
  items?: number;
  showAvatar?: boolean;
  showActions?: boolean;
  className?: string;
}

export function ListSkeleton({ items = 5, showAvatar = true, showActions = true, className = '' }: ListSkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-base-100 rounded-lg border border-base-300">
          {showAvatar && (
            <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
          )}
          
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          
          {showActions && (
            <div className="flex gap-2">
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="w-8 h-8 rounded" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Stats skeleton
interface StatsSkeletonProps {
  items?: number;
  className?: string;
}

export function StatsSkeleton({ items = 4, className = '' }: StatsSkeletonProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="bg-base-100 rounded-lg p-4 border border-base-300">
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="w-8 h-8 rounded" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-8 w-20 mb-1" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  );
}

// Form skeleton
interface FormSkeletonProps {
  fields?: number;
  showSubmit?: boolean;
  className?: string;
}

export function FormSkeleton({ fields = 4, showSubmit = true, className = '' }: FormSkeletonProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ))}
      
      {showSubmit && (
        <div className="flex gap-3 pt-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-20" />
        </div>
      )}
    </div>
  );
}

// Page skeleton
interface PageSkeletonProps {
  showHeader?: boolean;
  showTabs?: boolean;
  showContent?: boolean;
  className?: string;
}

export function PageSkeleton({ 
  showHeader = true, 
  showTabs = true, 
  showContent = true, 
  className = '' 
}: PageSkeletonProps) {
  return (
    <div className={`min-h-screen bg-base-200 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        {showHeader && (
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto mb-4" />
            <Skeleton className="h-16 w-full max-w-3xl mx-auto rounded-lg" />
          </div>
        )}
        
        {showTabs && (
          <div className="flex justify-center mb-8">
            <div className="bg-base-100 rounded-lg p-1 shadow-sm border border-base-300">
              <div className="flex gap-0.5">
                <Skeleton className="h-8 w-24 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
              </div>
            </div>
          </div>
        )}
        
        {showContent && (
          <div className="space-y-6">
            <StatsSkeleton />
            <TableSkeleton />
          </div>
        )}
      </div>
    </div>
  );
}

// Activity specific skeletons
export function ActivityListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="bg-base-100 rounded-lg shadow-sm border border-base-300 overflow-hidden">
      {/* Header */}
      <div className="bg-base-200 px-4 py-3 border-b border-base-300">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      
      {/* Rows */}
      <div className="divide-y divide-base-300">
        {Array.from({ length: items }).map((_, index) => (
          <div key={index} className="px-4 py-3">
            <div className="flex gap-4 items-center">
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ActivityStatsSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-6 ${className}`}>
      <StatsSkeleton items={4} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-base-100 rounded-lg p-4 border border-base-300">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex justify-between items-center">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-base-100 rounded-lg p-4 border border-base-300">
          <Skeleton className="h-6 w-28 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading wrapper component
interface LoadingWrapperProps {
  loading: boolean;
  children: React.ReactNode;
  skeleton: React.ReactNode;
  className?: string;
}

export function LoadingWrapper({ loading, children, skeleton, className = '' }: LoadingWrapperProps) {
  if (loading) {
    return <div className={className}>{skeleton}</div>;
  }
  
  return <>{children}</>;
}

// Export all components
export default {
  Skeleton,
  TextSkeleton,
  CardSkeleton,
  TableSkeleton,
  ListSkeleton,
  StatsSkeleton,
  FormSkeleton,
  PageSkeleton,
  ActivityListSkeleton,
  ActivityStatsSkeleton,
  LoadingWrapper
};