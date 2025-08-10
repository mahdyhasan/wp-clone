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
  FileText,
  Calendar,
  User
} from 'lucide-react';

interface PostListProps {
  onEdit: (post: any) => void;
  onCreateNew: () => void;
}

const PostList: React.FC<PostListProps> = ({ onEdit, onCreateNew }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - in real app, this would come from API
  const posts = [
    {
      id: '1',
      title: 'Building Elite Remote Teams: A Complete Guide',
      slug: 'building-elite-remote-teams',
      excerpt: 'Learn how to build and manage high-performing remote teams that deliver exceptional results.',
      status: 'published',
      type: 'post',
      author: 'John Doe',
      publishedAt: '2024-01-15T10:00:00Z',
      category: 'Remote Work',
      tags: ['remote', 'teams', 'management'],
      views: 1234
    },
    {
      id: '2',
      title: 'Cost Savings with Remote Development Teams',
      slug: 'cost-savings-remote-development',
      excerpt: 'Discover how companies are saving 70-80% on development costs with remote teams.',
      status: 'published',
      type: 'post',
      author: 'Jane Smith',
      publishedAt: '2024-01-14T14:30:00Z',
      category: 'Business',
      tags: ['cost-savings', 'development', 'remote'],
      views: 856
    },
    {
      id: '3',
      title: 'AI Talent Acquisition Trends 2024',
      slug: 'ai-talent-acquisition-trends-2024',
      excerpt: 'Explore the latest trends in AI-powered talent acquisition and recruitment.',
      status: 'draft',
      type: 'post',
      author: 'Mike Johnson',
      publishedAt: null,
      category: 'Technology',
      tags: ['ai', 'talent', 'recruitment'],
      views: 0
    },
    {
      id: '4',
      title: 'Remote Team Management Best Practices',
      slug: 'remote-team-management-best-practices',
      excerpt: 'Essential best practices for managing distributed teams effectively.',
      status: 'published',
      type: 'success_story',
      author: 'Sarah Wilson',
      publishedAt: '2024-01-12T09:15:00Z',
      category: 'Case Studies',
      tags: ['management', 'best-practices', 'distributed'],
      views: 2341
    },
    {
      id: '5',
      title: 'The Future of Remote Work',
      slug: 'future-of-remote-work',
      excerpt: 'Insights into how remote work is evolving and what to expect in the coming years.',
      status: 'archived',
      type: 'post',
      author: 'David Brown',
      publishedAt: '2024-01-10T16:45:00Z',
      category: 'Remote Work',
      tags: ['future', 'remote-work', 'trends'],
      views: 567
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success_story':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-600">Manage your blog posts, pages, and success stories</p>
        </div>
        <Button onClick={onCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          New Post
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
                  placeholder="Search posts..."
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

      {/* Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>All Posts ({filteredPosts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(post.type)}
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{post.category}</span>
                      </div>
                      <span>{post.views} views</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(post)}>
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

          {filteredPosts.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No posts found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PostList;