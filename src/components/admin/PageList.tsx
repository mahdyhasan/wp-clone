'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  File,
  Calendar,
  User,
  Layers
} from 'lucide-react';

interface PageListProps {
  onEdit: (page: any) => void;
  onCreateNew: () => void;
}

const PageList: React.FC<PageListProps> = ({ onEdit, onCreateNew }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - in real app, this would come from API
  const pages = [
    {
      id: '1',
      title: 'Home',
      slug: 'home',
      excerpt: 'Welcome to Augmex - Build elite remote teams fast',
      status: 'published',
      template: 'default',
      author: 'John Doe',
      publishedAt: '2024-01-15T10:00:00Z',
      parentId: null,
      order: 0,
      lastModified: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'About Us',
      slug: 'about-us',
      excerpt: 'Learn more about our company and mission',
      status: 'published',
      template: 'about-page',
      author: 'Jane Smith',
      publishedAt: '2024-01-14T14:30:00Z',
      parentId: null,
      order: 1,
      lastModified: '2024-01-14T14:30:00Z'
    },
    {
      id: '3',
      title: 'Services',
      slug: 'services',
      excerpt: 'Explore our range of services for building remote teams',
      status: 'published',
      template: 'default',
      author: 'Mike Johnson',
      publishedAt: '2024-01-13T09:15:00Z',
      parentId: null,
      order: 2,
      lastModified: '2024-01-13T09:15:00Z'
    },
    {
      id: '4',
      title: 'Contact',
      slug: 'contact',
      excerpt: 'Get in touch with our team',
      status: 'published',
      template: 'contact-page',
      author: 'Sarah Wilson',
      publishedAt: '2024-01-12T16:45:00Z',
      parentId: null,
      order: 3,
      lastModified: '2024-01-12T16:45:00Z'
    },
    {
      id: '5',
      title: 'Blog',
      slug: 'blog',
      excerpt: 'Latest news and insights about remote work',
      status: 'published',
      template: 'default',
      author: 'David Brown',
      publishedAt: '2024-01-11T11:20:00Z',
      parentId: null,
      order: 4,
      lastModified: '2024-01-11T11:20:00Z'
    },
    {
      id: '6',
      title: 'Team',
      slug: 'team',
      excerpt: 'Meet our leadership team',
      status: 'draft',
      template: 'default',
      author: 'Emma Davis',
      publishedAt: null,
      parentId: '2', // Child of About Us
      order: 0,
      lastModified: '2024-01-10T13:30:00Z'
    },
    {
      id: '7',
      title: 'Software Development',
      slug: 'software-development',
      excerpt: 'Custom software development services',
      status: 'published',
      template: 'default',
      author: 'Chris Lee',
      publishedAt: '2024-01-09T15:20:00Z',
      parentId: '3', // Child of Services
      order: 0,
      lastModified: '2024-01-09T15:20:00Z'
    },
    {
      id: '8',
      title: 'AI Solutions',
      slug: 'ai-solutions',
      excerpt: 'AI-powered talent acquisition solutions',
      status: 'published',
      template: 'default',
      author: 'Lisa Anderson',
      publishedAt: '2024-01-08T12:10:00Z',
      parentId: '3', // Child of Services
      order: 1,
      lastModified: '2024-01-08T12:10:00Z'
    }
  ];

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getParentName = (parentId: string | null) => {
    if (!parentId) return null;
    const parent = pages.find(p => p.id === parentId);
    return parent ? parent.title : null;
  };

  // Organize pages hierarchically
  const organizedPages = filteredPages.reduce((acc, page) => {
    if (!page.parentId) {
      acc.topLevel.push(page);
    } else {
      if (!acc.children[page.parentId]) {
        acc.children[page.parentId] = [];
      }
      acc.children[page.parentId].push(page);
    }
    return acc;
  }, { topLevel: [] as any[], children: {} as Record<string, any[]> });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
          <p className="text-gray-600">Manage your website pages and their hierarchy</p>
        </div>
        <Button onClick={onCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          New Page
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pages List */}
      <Card>
        <CardHeader>
          <CardTitle>All Pages ({filteredPages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {organizedPages.topLevel.map((page) => (
              <div key={page.id}>
                {/* Top-level page */}
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <File className="h-4 w-4" />
                        <h3 className="font-semibold text-lg">{page.title}</h3>
                        <Badge className={getStatusColor(page.status)}>
                          {page.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Layers className="h-3 w-3 mr-1" />
                          {page.template}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{page.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{page.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(page.publishedAt)}</span>
                        </div>
                        <span>Order: {page.order}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(page)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Child pages */}
                {organizedPages.children[page.id]?.map((childPage) => (
                  <div key={childPage.id} className="ml-8 mt-2 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-4 h-4 border-l-2 border-gray-300"></div>
                          <File className="h-4 w-4" />
                          <h3 className="font-semibold">{childPage.title}</h3>
                          <Badge className={getStatusColor(childPage.status)}>
                            {childPage.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Layers className="h-3 w-3 mr-1" />
                            {childPage.template}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Child of {page.title}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{childPage.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{childPage.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(childPage.publishedAt)}</span>
                          </div>
                          <span>Order: {childPage.order}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="ghost" size="sm" onClick={() => onEdit(childPage)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {filteredPages.length === 0 && (
            <div className="text-center py-8">
              <File className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No pages found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PageList;