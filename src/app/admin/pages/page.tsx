'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/admin/DashboardLayout';
import PageList from '@/components/admin/PageList';
import PageEditor from '@/components/admin/PageEditor';

export default function AdminPages() {
  const [currentView, setCurrentView] = useState<'list' | 'editor'>('list');
  const [editingPage, setEditingPage] = useState<any>(null);

  const handleEditPage = (page: any) => {
    setEditingPage(page);
    setCurrentView('editor');
  };

  const handleCreateNew = () => {
    setEditingPage(null);
    setCurrentView('editor');
  };

  const handleSavePage = (pageData: any) => {
    // Here you would save to your API/database
    console.log('Saving page:', pageData);
    setCurrentView('list');
    setEditingPage(null);
  };

  const handleCancelEdit = () => {
    setCurrentView('list');
    setEditingPage(null);
  };

  return (
    <DashboardLayout>
      {currentView === 'list' ? (
        <PageList 
          onEdit={handleEditPage}
          onCreateNew={handleCreateNew}
        />
      ) : (
        <PageEditor
          page={editingPage}
          onSave={handleSavePage}
          onCancel={handleCancelEdit}
        />
      )}
    </DashboardLayout>
  );
}