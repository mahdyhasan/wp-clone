'use client';

import DashboardLayout from '@/components/admin/DashboardLayout';
import DashboardOverview from '@/components/admin/DashboardOverview';

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
}