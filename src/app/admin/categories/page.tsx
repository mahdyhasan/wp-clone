'use client';

import DashboardLayout from '@/components/admin/DashboardLayout';
import CategoryTagManager from '@/components/admin/CategoryTagManager';

export default function AdminCategories() {
  return (
    <DashboardLayout>
      <CategoryTagManager />
    </DashboardLayout>
  );
}