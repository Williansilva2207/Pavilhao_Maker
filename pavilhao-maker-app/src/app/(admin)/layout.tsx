
'use client';

import type { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import TopHeader from '@/components/TopHeader';
import '../globals.css';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-surface-variant)]">
      <Sidebar />
      <div className="ml-[var(--spacing-sidebar)] min-h-screen">
        <TopHeader />
        <main className="px-6 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
