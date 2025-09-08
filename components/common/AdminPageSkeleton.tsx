export default function AdminPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="skeleton h-8 w-24"></div>
          <div>
            <div className="skeleton h-8 w-64 mb-2"></div>
            <div className="skeleton h-4 w-32"></div>
          </div>
        </div>

        {/* Navigation Tabs Skeleton */}
        <div className="flex gap-2">
          <div className="skeleton h-10 w-24"></div>
          <div className="skeleton h-10 w-24"></div>
          <div className="skeleton h-10 w-24"></div>
          <div className="skeleton h-10 w-24"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-6">
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="skeleton h-4 w-20 mb-2"></div>
                    <div className="skeleton h-8 w-12"></div>
                  </div>
                  <div className="skeleton w-8 h-8 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Skeleton */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="skeleton h-6 w-32 mb-4"></div>
            <div className="space-y-4">
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-3/4"></div>
              <div className="skeleton h-4 w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
