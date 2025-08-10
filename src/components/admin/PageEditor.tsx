'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import dynamic from 'next/dynamic';
import { pageTemplates, PageTemplate } from '@/lib/templates';
import { generateSlug, isValidSlug } from '@/lib/slug';
import { 
  Save, 
  Eye, 
  File, 
  Image, 
  Calendar,
  Plus,
  Layers,
  Settings,
  FileText,
  Link,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Dynamically import components that cause hydration issues
const RichTextEditor = dynamic(() => import('./RichTextEditor').then(mod => mod.RichTextEditor), {
  ssr: false,
  loading: () => <div className="border rounded-lg p-4 min-h-[200px] bg-gray-50">Loading editor...</div>
});

const TemplateSelector = dynamic(() => import('./TemplateSelector').then(mod => mod.TemplateSelector), {
  ssr: false
});

interface PageEditorProps {
  page?: any;
  onSave: (page: any) => void;
  onCancel: () => void;
}

const PageEditor: React.FC<PageEditorProps> = ({ page, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: page?.title || '',
    slug: page?.slug || '',
    content: page?.content || '',
    excerpt: page?.excerpt || '',
    status: page?.status || 'draft',
    template: page?.template || 'default',
    parentId: page?.parentId || '',
    order: page?.order || 0,
    publishedAt: page?.publishedAt || ''
  });

  const [slugValidation, setSlugValidation] = useState<{
    isValid: boolean;
    message: string;
    isChecking: boolean;
  }>({ isValid: true, message: '', isChecking: false });

  const templates = [
    { value: 'default', label: 'Default Template' },
    { value: 'full-width', label: 'Full Width' },
    { value: 'landing-page', label: 'Landing Page' },
    { value: 'contact-page', label: 'Contact Page' },
    { value: 'about-page', label: 'About Page' }
  ];

  const parentPages = [
    { value: '', label: 'No Parent (Top Level)' },
    { value: '1', label: 'About Us' },
    { value: '2', label: 'Services' },
    { value: '3', label: 'Contact' },
    { value: '4', label: 'Blog' }
  ];

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !page?.slug) {
      const generatedSlug = generateSlug(formData.title);
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, page?.slug]);

  // Validate slug when it changes
  useEffect(() => {
    const validateSlug = async () => {
      if (!formData.slug) {
        setSlugValidation({ isValid: true, message: '', isChecking: false });
        return;
      }

      setSlugValidation(prev => ({ ...prev, isChecking: true }));

      // Basic format validation
      if (!isValidSlug(formData.slug)) {
        setSlugValidation({
          isValid: false,
          message: 'Slug contains invalid characters',
          isChecking: false
        });
        return;
      }

      // Check uniqueness (simulated - in real app, you'd call API)
      try {
        const response = await fetch('/api/slugs/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: formData.slug,
            type: 'page',
            currentId: page?.id
          })
        });

        if (response.ok) {
          const data = await response.json();
          setSlugValidation({
            isValid: data.isUnique,
            message: data.isUnique ? 'Slug is available' : 'Slug is already in use',
            isChecking: false
          });
        }
      } catch (error) {
        // If API fails, just do basic validation
        setSlugValidation({
          isValid: true,
          message: 'Slug format is valid',
          isChecking: false
        });
      }
    };

    const timeoutId = setTimeout(validateSlug, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.slug, page?.id]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = (title: string) => {
    handleInputChange('title', title);
    if (!formData.slug) {
      handleInputChange('slug', generateSlug(title));
    }
  };

  const handleTemplateSelect = (template: PageTemplate) => {
    setFormData(prev => ({
      ...prev,
      content: template.content,
      excerpt: template.excerpt || '',
      title: template.name,
      slug: generateSlug(template.name),
      template: template.id
    }));
  };

  const handleSave = async () => {
    try {
      const pageData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt,
        status: formData.status,
        template: formData.template,
        parentId: formData.parentId || null,
        order: formData.order || 0,
        publishedAt: formData.publishedAt || null
      };

      const url = page ? `/api/pages/${page.id}` : '/api/pages';
      const method = page ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
      });

      if (response.ok) {
        const savedPage = await response.json();
        onSave(savedPage);
      } else {
        const error = await response.json();
        console.error('Error saving page:', error);
        alert('Failed to save page: ' + (error.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Failed to save page. Please try again.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Editor */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <File className="h-5 w-5 mr-2" />
                {page ? 'Edit Page' : 'Create New Page'}
              </div>
              <TemplateSelector 
                type="page" 
                onSelect={handleTemplateSelect}
              >
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Use Template
                </Button>
              </TemplateSelector>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter page title..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <div className="relative mt-1">
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="page-slug"
                  className={`pr-10 ${
                    slugValidation.isChecking ? 'border-yellow-400' :
                    !slugValidation.isValid ? 'border-red-500' :
                    formData.slug ? 'border-green-500' : ''
                  }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {slugValidation.isChecking ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                  ) : formData.slug ? (
                    slugValidation.isValid ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )
                  ) : null}
                </div>
              </div>
              {slugValidation.message && (
                <p className={`text-xs mt-1 ${
                  slugValidation.isValid ? 'text-green-600' : 'text-red-600'
                }`}>
                  {slugValidation.message}
                </p>
              )}
              {formData.slug && (
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Link className="h-3 w-3 mr-1" />
                  <span>Preview: /{formData.slug}/</span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Brief description of the page..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <div className="mt-1">
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => handleInputChange('content', content)}
                  placeholder="Write your page content here..."
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Publish */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Publish
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="publishedAt">Publish Date</Label>
              <Input
                id="publishedAt"
                type="datetime-local"
                value={formData.publishedAt}
                onChange={(e) => handleInputChange('publishedAt', e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button onClick={handleSave} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>

            {formData.status === 'published' && (
              <Button variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Page Attributes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Layers className="h-5 w-5 mr-2" />
              Page Attributes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="template">Template</Label>
              <Select value={formData.template} onValueChange={(value) => handleInputChange('template', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.value} value={template.value}>
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="parentId">Parent Page</Label>
              <Select value={formData.parentId} onValueChange={(value) => handleInputChange('parentId', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {parentPages.map((parent) => (
                    <SelectItem key={parent.value} value={parent.value}>
                      {parent.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="order">Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Featured Image */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Image className="h-5 w-5 mr-2" />
              Featured Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                No featured image selected
              </p>
              <Button variant="outline" size="sm">
                Select Image
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Page Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="showInMenu">Show in Menu</Label>
                <input
                  type="checkbox"
                  id="showInMenu"
                  defaultChecked
                  className="rounded"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="allowComments">Allow Comments</Label>
                <input
                  type="checkbox"
                  id="allowComments"
                  defaultChecked={false}
                  className="rounded"
                />
              </div>

              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Fields
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PageEditor;