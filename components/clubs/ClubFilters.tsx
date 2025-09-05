'use client';

interface ClubFiltersProps {
  filters: {
    page: number;
    limit: number;
    search: string;
    type: string;
    status: string;
    city: string;
    state: string;
    country: string;
  };
  onFilterChange: (filters: Partial<typeof filters>) => void;
}

export default function ClubFilters({ filters, onFilterChange }: ClubFiltersProps) {
  const types = [
    'running',
    'marathon',
    'trail',
    'ultra',
    'sprint',
    'relay',
    'cross_country',
    'track_field',
  ];

  const cities = [
    'Hà Nội',
    'TP.HCM',
    'Đà Nẵng',
    'Hải Phòng',
    'Cần Thơ',
    'Nha Trang',
    'Huế',
    'Vũng Tàu',
    'Đà Lạt',
    'Phú Quốc',
  ];

  const countries = [
    'Việt Nam',
    'Thái Lan',
    'Singapore',
    'Malaysia',
    'Indonesia',
    'Philippines',
  ];

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    onFilterChange({ [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      type: '',
      status: '',
      city: '',
      state: '',
      country: '',
    });
  };

  const hasActiveFilters = filters.type || filters.status || filters.city || filters.state || filters.country;

  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Bộ lọc</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="btn btn-outline btn-sm"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Type Filter */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Loại CLB</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">Tất cả loại</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Trạng thái</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="pending">Chờ duyệt</option>
            <option value="inactive">Không hoạt động</option>
            <option value="suspended">Tạm ngưng</option>
          </select>
        </div>

        {/* City Filter */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Thành phố</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
          >
            <option value="">Tất cả thành phố</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Country Filter */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Quốc gia</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
          >
            <option value="">Tất cả quốc gia</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-base-300">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-base-content/70">Bộ lọc đang áp dụng:</span>
            {filters.type && (
              <div className="badge badge-primary gap-2">
                Loại: {filters.type}
                <button
                  onClick={() => handleFilterChange('type', '')}
                  className="btn btn-ghost btn-xs p-0 min-h-0 h-auto"
                >
                  ×
                </button>
              </div>
            )}
            {filters.status && (
              <div className="badge badge-secondary gap-2">
                Trạng thái: {filters.status === 'active' ? 'Hoạt động' : 
                              filters.status === 'pending' ? 'Chờ duyệt' :
                              filters.status === 'inactive' ? 'Không hoạt động' : 'Tạm ngưng'}
                <button
                  onClick={() => handleFilterChange('status', '')}
                  className="btn btn-ghost btn-xs p-0 min-h-0 h-auto"
                >
                  ×
                </button>
              </div>
            )}
            {filters.city && (
              <div className="badge badge-accent gap-2">
                Thành phố: {filters.city}
                <button
                  onClick={() => handleFilterChange('city', '')}
                  className="btn btn-ghost btn-xs p-0 min-h-0 h-auto"
                >
                  ×
                </button>
              </div>
            )}
            {filters.country && (
              <div className="badge badge-info gap-2">
                Quốc gia: {filters.country}
                <button
                  onClick={() => handleFilterChange('country', '')}
                  className="btn btn-ghost btn-xs p-0 min-h-0 h-auto"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
