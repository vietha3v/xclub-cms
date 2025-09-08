export default function ClubDetailSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="skeleton w-16 h-16 rounded-full"></div>
            <div className="flex-1">
              <div className="skeleton h-8 w-64 mb-2"></div>
              <div className="skeleton h-4 w-32"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Skeleton */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex gap-3">
            <div className="skeleton h-10 w-32"></div>
            <div className="skeleton h-10 w-24"></div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Info Skeleton */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="skeleton h-6 w-32 mb-4"></div>
              <div className="space-y-3">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-3/4"></div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            </div>
          </div>

          {/* Events Skeleton */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="skeleton h-6 w-40 mb-4"></div>
              <div className="space-y-4">
                <div className="skeleton h-20 w-full"></div>
                <div className="skeleton h-20 w-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Stats Skeleton */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="skeleton h-6 w-24 mb-4"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="skeleton h-16 w-full"></div>
                <div className="skeleton h-16 w-full"></div>
              </div>
            </div>
          </div>

          {/* Members Skeleton */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="skeleton h-6 w-32 mb-4"></div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="skeleton w-8 h-8 rounded-full"></div>
                  <div className="skeleton h-4 w-24"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="skeleton w-8 h-8 rounded-full"></div>
                  <div className="skeleton h-4 w-24"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
