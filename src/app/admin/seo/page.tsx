'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Globe,
  BarChart3,
  Settings,
  Copy,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { SEOEditor } from '@/components/admin/SEOEditor';

interface SEOData {
  id: string;
  pageType: 'page' | 'post' | 'homepage';
  pageId: string;
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  robots: string;
  status: 'good' | 'needs_improvement' | 'poor';
  lastUpdated: string;
}

interface SEOTemplate {
  id: string;
  name: string;
  description: string;
  metaTitleTemplate: string;
  metaDescriptionTemplate: string;
  keywords: string[];
}

export default function SEOPage() {
  const [seoData, setSeoData] = useState<SEOData[]>([]);
  const [filteredSeoData, setFilteredSeoData] = useState<SEOData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSEO, setSelectedSEO] = useState<SEOData | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockSEOData: SEOData[] = [
      {
        id: '1',
        pageType: 'homepage',
        pageId: 'home',
        pageTitle: 'Homepage',
        metaTitle: 'Augmex - Professional Services for Your Business Growth',
        metaDescription: 'Discover comprehensive professional services designed to help your business thrive and succeed in today\'s competitive market.',
        keywords: ['business services', 'professional services', 'growth', 'consulting'],
        ogTitle: 'Augmex - Professional Services',
        ogDescription: 'Professional services for business growth and success.',
        ogImage: '/images/og-home.jpg',
        canonicalUrl: 'https://augmex.io',
        robots: 'index, follow',
        status: 'good',
        lastUpdated: '2024-01-20T10:30:00Z'
      },
      {
        id: '2',
        pageType: 'page',
        pageId: 'about',
        pageTitle: 'About Us',
        metaTitle: 'About Us - Augmex',
        metaDescription: 'Learn about Augmex\'s mission, values, and commitment to delivering exceptional results for our clients.',
        keywords: ['about us', 'company', 'mission', 'values'],
        ogTitle: 'About Augmex',
        ogDescription: 'Learn about our company, mission, and values.',
        ogImage: '/images/og-about.jpg',
        canonicalUrl: 'https://augmex.io/about',
        robots: 'index, follow',
        status: 'needs_improvement',
        lastUpdated: '2024-01-18T14:20:00Z'
      },
      {
        id: '3',
        pageType: 'post',
        pageId: 'blog-post-1',
        pageTitle: '10 Business Growth Strategies',
        metaTitle: '10 Business Growth Strategies for 2024 | Augmex Blog',
        metaDescription: 'Discover 10 proven business growth strategies to help your company thrive in 2024 and beyond.',
        keywords: ['business growth', 'strategies', '2024', 'tips'],
        ogTitle: '10 Business Growth Strategies for 2024',
        ogDescription: 'Proven strategies to grow your business in 2024.',
        ogImage: '/images/og-blog-1.jpg',
        canonicalUrl: 'https://augmex.io/blog/10-business-growth-strategies',
        robots: 'index, follow',
        status: 'good',
        lastUpdated: '2024-01-19T09:15:00Z'
      }
    ];
    
    setSeoData(mockSEOData);
    setFilteredSeoData(mockSEOData);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = seoData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(data =>
        data.pageTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.metaTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.metaDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(data => data.pageType === typeFilter);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(data => data.status === statusFilter);
    }

    setFilteredSeoData(filtered);
  }, [seoData, searchTerm, typeFilter, statusFilter]);

  const handleSEOSave = (seoData: any) => {
    if (selectedSEO) {
      // Update existing SEO data
      setSeoData(prev => prev.map(data => 
        data.id === selectedSEO.id ? { ...data, ...seoData, lastUpdated: new Date().toISOString() } : data
      ));
    } else {
      // Add new SEO data
      const newSEOData: SEOData = {
        id: Date.now().toString(),
        ...seoData,
        lastUpdated: new Date().toISOString()
      };
      setSeoData(prev => [...prev, newSEOData]);
    }
    setIsEditorOpen(false);
    setSelectedSEO(null);
  };

  const handleSEODelete = (seoId: string) => {
    if (confirm('Are you sure you want to delete this SEO configuration?')) {
      setSeoData(prev => prev.filter(data => data.id !== seoId));
    }
  };

  const handleEditSEO = (seo: SEOData) => {
    setSelectedSEO(seo);
    setIsEditorOpen(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'needs_improvement':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <TrendingUp className="h-4 w-4" />;
      case 'needs_improvement':
        return <Minus className="h-4 w-4" />;
      case 'poor':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Management</h1>
          <p className="text-gray-600">Manage SEO metadata and optimize your content for search engines</p>
        </div>
        <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedSEO(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add SEO Configuration
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>
                {selectedSEO ? 'Edit SEO Configuration' : 'Add New SEO Configuration'}
              </DialogTitle>
            </DialogHeader>
            <SEOEditor
              seoData={selectedSEO}
              onSave={handleSEOSave}
              onCancel={() => setIsEditorOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Pages & Posts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* SEO Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Globe className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Total Pages</p>
                    <p className="text-2xl font-bold text-gray-900">{seoData.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Optimized</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {seoData.filter(s => s.status === 'good').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Minus className="h-8 w-8 text-yellow-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Needs Work</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {seoData.filter(s => s.status === 'needs_improvement').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <TrendingDown className="h-8 w-8 text-red-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Poor</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {seoData.filter(s => s.status === 'poor').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Recent SEO Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoData
                  .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                  .slice(0, 5)
                  .map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          {getStatusIcon(item.status)}
                          <Badge className={`ml-2 ${getStatusBadgeColor(item.status)}`}>
                            {item.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div>
                          <div className="font-medium">{item.pageTitle}</div>
                          <div className="text-sm text-gray-600">{item.metaTitle}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(item.lastUpdated)}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
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
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="homepage">Homepage</SelectItem>
                    <SelectItem value="page">Pages</SelectItem>
                    <SelectItem value="post">Posts</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="needs_improvement">Needs Improvement</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* SEO Table */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Configurations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Meta Title</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSeoData.map((seo) => (
                    <TableRow key={seo.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{seo.pageTitle}</div>
                          <div className="text-sm text-gray-600 flex items-center space-x-2">
                            <span>{seo.metaDescription.substring(0, 60)}...</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(seo.metaDescription)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {seo.pageType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getStatusIcon(seo.status)}
                          <Badge className={`ml-2 ${getStatusBadgeColor(seo.status)}`}>
                            {seo.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">
                          {seo.metaTitle}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatDate(seo.lastUpdated)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(seo.canonicalUrl, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditSEO(seo)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSEODelete(seo.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredSeoData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No SEO configurations found matching your criteria.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                SEO templates feature coming soon. This will allow you to create reusable SEO templates for different content types.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global SEO Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Global SEO settings feature coming soon. This will include site-wide SEO configurations, schema settings, and more.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </DashboardLayout>
  );
}