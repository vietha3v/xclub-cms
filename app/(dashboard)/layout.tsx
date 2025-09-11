'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="h-screen bg-base-200 flex flex-col">
      <DashboardHeader onMenuClick={handleMenuClick} />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar 
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />
        <main className="flex-1 overflow-y-auto lg:ml-0">
          <div className="p-2 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
