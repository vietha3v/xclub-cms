# Common Components

## Tabs Component

### Usage
```tsx
import Tabs from '@/components/common/Tabs';

const tabs = [
  { id: 'list', label: 'Danh sách', icon: '📋' },
  { id: 'stats', label: 'Thống kê', icon: '📊', badge: '3' }
];

<Tabs
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  variant="default" // 'default' | 'compact' | 'pills' | 'underline'
  size="md" // 'sm' | 'md' | 'lg'
  fullWidth={false}
/>
```

### Variants
- **default**: Standard tabs with background container
- **compact**: Minimal tabs without background
- **pills**: Rounded pill-style tabs
- **underline**: Tabs with underline indicator

### Features
- ✅ Smooth animations and transitions
- ✅ Icon support with bounce animation
- ✅ Badge support for notifications
- ✅ Disabled state support
- ✅ Responsive design
- ✅ Full width option

## Loading Skeleton Components

### Available Components
```tsx
import {
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
} from '@/components/common/LoadingSkeleton';
```

### Usage Examples

#### Basic Skeleton
```tsx
<Skeleton className="h-4 w-32" />
```

#### Text Skeleton
```tsx
<TextSkeleton lines={3} lastLineWidth="60%" />
```

#### Card Skeleton
```tsx
<CardSkeleton showImage={true} showActions={true} />
```

#### Table Skeleton
```tsx
<TableSkeleton rows={5} columns={4} showHeader={true} />
```

#### List Skeleton
```tsx
<ListSkeleton items={5} showAvatar={true} showActions={true} />
```

#### Stats Skeleton
```tsx
<StatsSkeleton items={4} />
```

#### Activity Specific
```tsx
<ActivityListSkeleton items={20} />
<ActivityStatsSkeleton />
```

#### Loading Wrapper
```tsx
<LoadingWrapper
  loading={isLoading}
  skeleton={<ActivityListSkeleton />}
>
  <ActivityList />
</LoadingWrapper>
```

## Migration Guide

### From Old Tab Implementation
```tsx
// OLD
<div className="tabs tabs-boxed gap-2">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      className={`tab px-6 py-3 ${activeTab === tab.id ? 'tab-active' : ''}`}
      onClick={() => setActiveTab(tab.id)}
    >
      {tab.icon} {tab.label}
    </button>
  ))}
</div>

// NEW
<Tabs
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  variant="default"
  size="md"
/>
```

### From Old Loading Implementation
```tsx
// OLD
if (loading) {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse bg-base-300 rounded h-16"></div>
      ))}
    </div>
  );
}

// NEW
if (loading) {
  return <ListSkeleton items={5} />;
}
```

## Updated Files

### Tabs Migration
- ✅ `/app/(dashboard)/activities/page.tsx` - Uses TabContainer (wrapper)
- ✅ `/app/(dashboard)/settings/page.tsx` - Uses Tabs directly
- ✅ `/app/(dashboard)/admin/page.tsx` - Uses Tabs with pills variant

### Loading Migration
- ✅ `/components/activities/ActivityStats.tsx` - Uses ActivityStatsSkeleton
- ✅ `/components/activities/ActivityList.tsx` - Uses ActivityListSkeleton
- ✅ `/components/admin/AdminEvents.tsx` - Uses ListSkeleton
- ✅ `/components/admin/AdminClubs.tsx` - Uses ListSkeleton

## Benefits

### Consistency
- ✅ Unified design language across the app
- ✅ Consistent animations and interactions
- ✅ Standardized loading states

### Performance
- ✅ Optimized animations with CSS transforms
- ✅ Reduced bundle size through component reuse
- ✅ Better user experience with smooth transitions

### Maintainability
- ✅ Single source of truth for tab and loading components
- ✅ Easy to update styles globally
- ✅ TypeScript support with proper interfaces

### Accessibility
- ✅ Proper ARIA attributes
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
