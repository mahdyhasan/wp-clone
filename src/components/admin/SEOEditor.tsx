'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Save, 
  X, 
  Plus, 
  Copy,
  ExternalLink,
  Image as ImageIcon,
  FileText,
  Search,
  Settings
} from 'lucide-react';

interface SEOEditorProps {
  seoData?: any;
  onSave: (seoData: any) => void;
  onCancel: () => void;
}

export function SEOEditor({ seoData, onSave, onCancel }: SEOEditorProps) {
  const [formData, setFormData] = useState({
    pageType: 'page',
    pageId: '',
    pageTitle: '',
    metaTitle: '',
    metaDescription: '',
    keywords: [] as string[],
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    canonicalUrl: '',
    robots: 'index, follow'
  });

  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    if (seoData) {
      setFormData({
        pageType: seoData.pageType || 'page',
        pageId: seoData.pageId || '',
        pageTitle: seoData.pageTitle || '',
        metaTitle: seoData.metaTitle || '',
        metaDescription: seoData.metaDescription || '',
        keywords: seoData.keywords || [],
        ogTitle: seoData.ogTitle || '',
        ogDescription: seoData.ogDescription || '',
        ogImage: seoData.ogImage || '',
        canonicalUrl: seoData.canonicalUrl || '',
        robots: seoData.robots || 'index, follow'
      });
    }
  }, [seoData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateMetaTitle = () => {
    if (!formData.pageTitle) return '';
    const title = formData.pageTitle;
    const suffix = ' | Augmex';
    return title.length > 60 ? title.substring(0, 57) + '...' + suffix : title + suffix;
  };

  const generateMetaDescription = () => {
    if (!formData.metaDescription) return '';
    return formData.metaDescription.length > 160 
      ? formData.metaDescription.substring(0, 157) + '...' 
      : formData.metaDescription;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic SEO</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          {/* Page Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Page Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pageType">Page Type</Label>
                  <Select value={formData.pageType} onValueChange={(value) => handleInputChange('pageType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homepage">Homepage</SelectItem>
                      <SelectItem value="page">Page</SelectItem>
                      <SelectItem value="post">Post</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pageId">Page ID</Label>
                  <Input
                    id="pageId"
                    value={formData.pageId}
                    onChange={(e) => handleInputChange('pageId', e.target.value)}
                    placeholder="page-slug"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="pageTitle">Page Title</Label>
                <Input
                  id="pageTitle"
                  value={formData.pageTitle}
                  onChange={(e) => handleInputChange('pageTitle', e.target.value)}
                  placeholder="Enter page title"
                />
              </div>
            </CardContent>
          </Card>

          {/* Meta Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Meta Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                    placeholder="Enter meta title"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange('metaTitle', generateMetaTitle())}
                  >
                    Generate
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.metaTitle.length}/60 characters recommended
                </p>
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  placeholder="Enter meta description"
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.metaDescription.length}/160 characters recommended
                </p>
              </div>

              <div>
                <Label>Keywords</Label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Add keyword"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                  />
                  <Button type="button" onClick={handleAddKeyword} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="flex items-center">
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="ml-1 text-xs"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Search Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="text-blue-600 text-sm hover:underline cursor-pointer mb-1">
                  {formData.canonicalUrl || 'https://augmex.io/page'}
                </div>
                <div className="text-lg font-medium text-blue-900 mb-1">
                  {formData.metaTitle || formData.pageTitle || 'Page Title'}
                </div>
                <div className="text-sm text-gray-600">
                  {generateMetaDescription() || 'Meta description will appear here...'}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          {/* Open Graph */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Open Graph Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ogTitle">OG Title</Label>
                <Input
                  id="ogTitle"
                  value={formData.ogTitle}
                  onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                  placeholder="Enter Open Graph title"
                />
              </div>

              <div>
                <Label htmlFor="ogDescription">OG Description</Label>
                <Textarea
                  id="ogDescription"
                  value={formData.ogDescription}
                  onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                  placeholder="Enter Open Graph description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="ogImage">OG Image</Label>
                <div className="flex space-x-2">
                  <Input
                    id="ogImage"
                    value={formData.ogImage}
                    onChange={(e) => handleInputChange('ogImage', e.target.value)}
                    placeholder="/images/og-image.jpg"
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" size="sm">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Select
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden max-w-md">
                <div className="bg-gray-200 h-32 flex items-center justify-center">
                  {formData.ogImage ? (
                    <div className="text-sm text-gray-600">Image Preview</div>
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="p-3">
                  <div className="font-medium text-sm mb-1">
                    {formData.ogTitle || formData.metaTitle || 'Title'}
                  </div>
                  <div className="text-xs text-gray-600">
                    {formData.ogDescription || generateMetaDescription() || 'Description'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formData.canonicalUrl || 'augmex.io'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          {/* Advanced Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Advanced Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="canonicalUrl"
                    value={formData.canonicalUrl}
                    onChange={(e) => handleInputChange('canonicalUrl', e.target.value)}
                    placeholder="https://augmex.io/page"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => formData.canonicalUrl && copyToClipboard(formData.canonicalUrl)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  {formData.canonicalUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(formData.canonicalUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="robots">Robots Meta Tag</Label>
                <Select value={formData.robots} onValueChange={(value) => handleInputChange('robots', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="index, follow">Index, Follow</SelectItem>
                    <SelectItem value="index, nofollow">Index, Nofollow</SelectItem>
                    <SelectItem value="noindex, follow">Noindex, Follow</SelectItem>
                    <SelectItem value="noindex, nofollow">Noindex, Nofollow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          {seoData ? 'Update SEO' : 'Create SEO'}
        </Button>
      </div>
    </form>
  );
}