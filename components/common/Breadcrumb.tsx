'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const router = useRouter();

  return (
    <div className={`breadcrumbs text-sm ${className}`}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <Link 
                href={item.href}
                className="text-primary hover:text-primary-focus transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-base-content/70">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
