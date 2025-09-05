'use client';

interface LoadingSkeletonProps {
  className?: string;
}

export function CardSkeleton({ className = '' }: LoadingSkeletonProps) {
  return (
    <div className={`card bg-base-100 shadow-xl ${className}`}>
      <div className="card-body">
        <div className="animate-pulse">
          <div className="h-4 bg-base-300 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-base-300 rounded"></div>
            <div className="h-3 bg-base-300 rounded w-5/6"></div>
            <div className="h-3 bg-base-300 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClubDetailSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="relative">
        <div className="h-64 md:h-80 lg:h-96 bg-base-300 rounded-lg animate-pulse"></div>
        <div className="relative -mt-16 px-6">
          <div className="bg-base-100 rounded-lg shadow-xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 bg-base-300 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="animate-pulse">
                  <div className="h-8 bg-base-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-base-300 rounded w-1/3 mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-base-300 rounded w-20"></div>
                    <div className="h-6 bg-base-300 rounded w-16"></div>
                    <div className="h-6 bg-base-300 rounded w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Skeleton */}
      <div className="flex gap-3">
        <div className="h-10 bg-base-300 rounded w-32 animate-pulse"></div>
        <div className="h-10 bg-base-300 rounded w-24 animate-pulse"></div>
        <div className="h-10 bg-base-300 rounded w-20 animate-pulse"></div>
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="space-y-8">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg animate-pulse">
          <div className="w-10 h-10 bg-base-300 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-base-300 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-base-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
