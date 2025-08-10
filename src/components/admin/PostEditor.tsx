'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import dynamic from 'next/dynamic';
import { pageTemplates, PageTemplate } from '@/lib/templates';
import { generateSlug, isValidSlug } from '@/lib/slug';
import { 
  Save, 
  Eye, 
  FileText, 
  Image, 
  Tag, 
  Calendar,
  Plus,
  X,
  File,
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

interface PostEditorProps {
  post?: any;
  onSave: (post: any) => void;
  onCancel: () => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    status: post?.status || 'draft',
    type: post?.type || 'post',
    categoryId: post?.categoryId || '',
    publishedAt: post?.publishedAt || ''
  });

  const [tags, setTags] = useState<string[]>(post?.tags?.map((tag: any) => tag.name) || []);
  const [newTag, setNewTag] = useState('');
  const [slugValidation, setSlugValidation] = useState<{
    isValid: boolean;
    message: string;
    isChecking: boolean;
  }>({ isValid: true, message: '', isChecking: false });

  const categories = [
    { id: '1', name: 'Company News' },
    { id: '2', name: 'Remote Work' },
    { id: '3', name: 'Technology' },
    { id: '4', name: 'Business' },
    { id: '5', name: 'Case Studies' }
  ];

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !post?.slug) {
      const generatedSlug = generateSlug(formData.title);
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, post?.slug]);

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
            type: 'post',
            currentId: post?.id
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
  }, [formData.slug, post?.id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
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
      type: template.type,
      categories: template.categories || [],
      tags: template.tags || []
    }));
    
    if (template.tags) {
      setTags(template.tags);
    }
  };

  const handleSave = async () => {
    try {
      const postData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt,
        status: formData.status,
        type: formData.type,
        categoryId: formData.categoryId || null,
        publishedAt: formData.publishedAt || null,
        tags: tags.map(tag => ({ name: tag, slug: generateSlug(tag) }))
      };

      const url = post ? `/api/posts/${post.id}` : '/api/posts';
      const method = post ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const savedPost = await response.json();
        onSave(savedPost);
      } else {
        const error = await response.json();
        console.error('Error saving post:', error);
        alert('Failed to save post: ' + (error.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Please try again.');
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
                <FileText className="h-5 w-5 mr-2" />
                {post ? 'Edit Post' : 'Create New Post'}
              </div>
              <TemplateSelector 
                type={formData.type as 'post' | 'success_story'} 
                onSelect={handleTemplateSelect}
              >
                <Button variant="outline" size="sm">
                  <File className="h-4 w-4 mr-2" />
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
                placeholder="Enter post title..."
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
                  placeholder="post-slug"
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
                placeholder="Brief description of the post..."
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
                  placeholder="Write your post content here..."
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
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="post">Post</SelectItem>
                  <SelectItem value="page">Page</SelectItem>
                  <SelectItem value="success_story">Success Story</SelectItem>
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

        {/* Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={formData.categoryId} onValueChange={(value) => handleInputChange('categoryId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Tag className="h-5 w-5 mr-2" />
              Tags
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button onClick={handleAddTag} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center">
                  {tag}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
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
      </div>
    </div>
  );
};

export default PostEditor;