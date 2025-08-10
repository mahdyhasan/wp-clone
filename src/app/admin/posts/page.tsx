'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/admin/DashboardLayout';
import EnhancedPostList from '@/components/admin/EnhancedPostList';
import EnhancedPostEditor from '@/components/admin/EnhancedPostEditor';

export default function AdminPosts() {
  const [currentView, setCurrentView] = useState<'list' | 'editor'>('list');
  const [editingPost, setEditingPost] = useState<any>(null);

  const handleEditPost = (post: any) => {
    setEditingPost(post);
    setCurrentView('editor');
  };

  const handleCreateNew = () => {
    setEditingPost(null);
    setCurrentView('editor');
  };

  const handleSavePost = (postData: any) => {
    // Here you would save to your API/database
    console.log('Saving post:', postData);
    setCurrentView('list');
    setEditingPost(null);
  };

  const handleCancelEdit = () => {
    setCurrentView('list');
    setEditingPost(null);
  };

  return (
    <DashboardLayout>
      {currentView === 'list' ? (
        <EnhancedPostList 
          onEdit={handleEditPost}
          onCreateNew={handleCreateNew}
        />
      ) : (
        <EnhancedPostEditor
          post={editingPost}
          onSave={handleSavePost}
          onCancel={handleCancelEdit}
        />
      )}
    </DashboardLayout>
  );
}