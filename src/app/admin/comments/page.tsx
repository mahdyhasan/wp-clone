'use client';

import DashboardLayout from '@/components/admin/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Reply, Trash2, Check, X } from 'lucide-react';
import { useState } from 'react';

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - in a real app, this would come from an API
  const comments = [
    {
      id: 1,
      author: 'John Doe',
      email: 'john@example.com',
      content: 'Great article! Very informative and well-written.',
      post: 'Getting Started with Next.js',
      date: '2024-01-15',
      status: 'approved',
      avatar: 'JD'
    },
    {
      id: 2,
      author: 'Jane Smith',
      email: 'jane@example.com',
      content: 'I have a question about the implementation details. Could you elaborate more on the routing?',
      post: 'Advanced React Patterns',
      date: '2024-01-14',
      status: 'pending',
      avatar: 'JS'
    },
    {
      id: 3,
      author: 'Bob Johnson',
      email: 'bob@example.com',
      content: 'This helped me solve a problem I was struggling with for days. Thank you!',
      post: 'CSS Grid Layout Guide',
      date: '2024-01-13',
      status: 'approved',
      avatar: 'BJ'
    },
    {
      id: 4,
      author: 'Alice Brown',
      email: 'alice@example.com',
      content: 'Spam comment with irrelevant links.',
      post: 'JavaScript Best Practices',
      date: '2024-01-12',
      status: 'spam',
      avatar: 'AB'
    },
  ];

  const filteredComments = comments.filter(comment =>
    comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.post.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'spam':
        return <Badge variant="destructive">Spam</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Comments</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage and moderate comments on your site
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Comments</CardTitle>
            <CardDescription>
              {filteredComments.length} comments found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search comments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredComments.map((comment) => (
                <div
                  key={comment.id}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {comment.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{comment.author}</h3>
                        <p className="text-sm text-gray-500">{comment.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(comment.status)}
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      On: <span className="font-medium">{comment.post}</span>
                    </p>
                    <div className="flex items-center space-x-2">
                      {comment.status === 'pending' && (
                        <>
                          <Button variant="outline" size="sm">
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm">
                            <X className="h-4 w-4 mr-1" />
                            Spam
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm">
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredComments.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No comments found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}