'use client';

import DashboardLayout from '@/components/admin/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function TagsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - in a real app, this would come from an API
  const tags = [
    { id: 1, name: 'Technology', slug: 'technology', count: 15 },
    { id: 2, name: 'Web Development', slug: 'web-development', count: 8 },
    { id: 3, name: 'React', slug: 'react', count: 12 },
    { id: 4, name: 'Next.js', slug: 'nextjs', count: 6 },
    { id: 5, name: 'JavaScript', slug: 'javascript', count: 20 },
    { id: 6, name: 'TypeScript', slug: 'typescript', count: 9 },
    { id: 7, name: 'CSS', slug: 'css', count: 14 },
    { id: 8, name: 'HTML', slug: 'html', count: 11 },
  ];

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your post tags
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Tag
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Tags</CardTitle>
            <CardDescription>
              {filteredTags.length} tags found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              {filteredTags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{tag.name}</h3>
                      <p className="text-sm text-gray-500">Slug: {tag.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary">{tag.count} posts</Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredTags.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No tags found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}