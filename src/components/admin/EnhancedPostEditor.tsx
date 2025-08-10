'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import dynamic from 'next/dynamic';
import { pageTemplates, PageTemplate } from '@/lib/templates';
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
  Video,
  Music,
  MessageSquare,
  Link as LinkIcon,
  Gallery,
  Settings,
  Clock,
  Users,
  Globe
} from 'lucide-react';

// Dynamically import components that cause hydration issues
const RichTextEditor = dynamic(() => import('./RichTextEditor').then(mod => mod.RichTextEditor), {
  ssr: false,
  loading: () => <div className="border rounded-lg p-4 min-h-[200px] bg-gray-50">Loading editor...</div>
});

const TemplateSelector = dynamic(() => import('./TemplateSelector').then(mod => mod.TemplateSelector), {
  ssr: false
});

const MediaSelector = dynamic(() => import('./MediaSelector').then(mod => mod.MediaSelector), {
  ssr: false
});

interface PostEditorProps {
  post?: any;
  onSave: (post: any) => void;
  onCancel: () => void;
}

interface PostFormat {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const postFormats: PostFormat[] = [
  {
    id: 'STANDARD',
    name: 'Standard',
    icon: <FileText className="h-4 w-4" />,
    description: 'Standard blog post with title and content'
  },
  {
    id: 'GALLERY',
    name: 'Gallery',
    icon: <Gallery className="h-4 w-4" />,
    description: 'Image gallery post'
  },
  {
    id: 'VIDEO',
    name: 'Video',
    icon: <Video className="h-4 w-4" />,
    description: 'Video post with embedded media'
  },
  {
    id: 'AUDIO',
    name: 'Audio',
    icon: <Music className="h-4 w-4" />,
    description: 'Audio post or podcast'
  },
  {
    id: 'QUOTE',
    name: 'Quote',
    icon: <MessageSquare className="h-4 w-4" />,
    description: 'Quote post with attribution'
  },
  {
    id: 'LINK',
    name: 'Link',
    icon: <LinkIcon className="h-4 w-4" />,
    description: 'Link to external content'
  }
];

const EnhancedPostEditor: React.FC<PostEditorProps> = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    status: post?.status || 'DRAFT',
    type: post?.type || 'POST',
    format: post?.format || 'STANDARD',
    categoryId: post?.categoryId || '',
    publishedAt: post?.publishedAt || '',
    featuredImage: post?.featuredImage || '',
    allowComments: post?.allowComments ?? true,
    sticky: post?.sticky ?? false,
    password: post?.password || '',
    // Format-specific fields
    videoUrl: post?.videoUrl || '',
    audioUrl: post?.audioUrl || '',
    quoteText: post?.quoteText || '',
    quoteAuthor: post?.quoteAuthor || '',
    linkUrl: post?.linkUrl || '',
    linkTitle: post?.linkTitle || ''
  });

  const [tags, setTags] = useState<string[]>(post?.tags?.map((tag: any) => tag.name) || []);
  const [newTag, setNewTag] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
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
      type: template.type.toUpperCase(),
      format: template.format || 'STANDARD'
    }));
    
    if (template.tags) {
      setTags(template.tags);
    }
  };

  const handleMediaSelect = (media: any) => {
    handleInputChange('featuredImage', media.filePath);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const postData = {
        ...formData,
        tags: tags.map(tag => ({ name: tag, slug: generateSlug(tag) }))
      };

      const response = await fetch('/api/posts' + (post ? `/${post.id}` : ''), {
        method: post ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const savedPost = await response.json();
        onSave(savedPost);
      } else {
        console.error('Error saving post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedFormat = postFormats.find(f => f.id === formData.format);

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
                type={formData.type.toLowerCase() as 'post' | 'success_story' | 'service' | 'blog'} 
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
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="post-slug"
                className="mt-1"
              />
            </div>

            {/* Format-specific fields */}
            {formData.format === 'QUOTE' && (
              <div className="space-y-4 border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded">
                <div>
                  <Label htmlFor="quoteText">Quote Text</Label>
                  <Textarea
                    id="quoteText"
                    value={formData.quoteText}
                    onChange={(e) => handleInputChange('quoteText', e.target.value)}
                    placeholder="Enter the quote..."
                    rows={3}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="quoteAuthor">Quote Author</Label>
                  <Input
                    id="quoteAuthor"
                    value={formData.quoteAuthor}
                    onChange={(e) => handleInputChange('quoteAuthor', e.target.value)}
                    placeholder="Author name..."
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {formData.format === 'VIDEO' && (
              <div className="space-y-4 border-l-4 border-red-500 pl-4 bg-red-50 p-4 rounded">
                <div>
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <Input
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {formData.format === 'AUDIO' && (
              <div className="space-y-4 border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded">
                <div>
                  <Label htmlFor="audioUrl">Audio URL</Label>
                  <Input
                    id="audioUrl"
                    value={formData.audioUrl}
                    onChange={(e) => handleInputChange('audioUrl', e.target.value)}
                    placeholder="https://example.com/audio.mp3"
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {formData.format === 'LINK' && (
              <div className="space-y-4 border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded">
                <div>
                  <Label htmlFor="linkUrl">Link URL</Label>
                  <Input
                    id="linkUrl"
                    value={formData.linkUrl}
                    onChange={(e) => handleInputChange('linkUrl', e.target.value)}
                    placeholder="https://example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="linkTitle">Link Title</Label>
                  <Input
                    id="linkTitle"
                    value={formData.linkTitle}
                    onChange={(e) => handleInputChange('linkTitle', e.target.value)}
                    placeholder="Link title..."
                    className="mt-1"
                  />
                </div>
              </div>
            )}

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
        {/* Post Format */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Post Format
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={formData.format} onValueChange={(value) => handleInputChange('format', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {postFormats.map((format) => (
                  <SelectItem key={format.id} value={format.id}>
                    <div className="flex items-center space-x-2">
                      {format.icon}
                      <span>{format.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedFormat && (
              <p className="text-sm text-gray-600">{selectedFormat.description}</p>
            )}
          </CardContent>
        </Card>

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
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                  <SelectItem value="TRASH">Trash</SelectItem>
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
                  <SelectItem value="POST">Post</SelectItem>
                  <SelectItem value="PAGE">Page</SelectItem>
                  <SelectItem value="SUCCESS_STORY">Success Story</SelectItem>
                  <SelectItem value="SERVICE">Service</SelectItem>
                  <SelectItem value="BLOG">Blog</SelectItem>
                  <SelectItem value="PORTFOLIO">Portfolio</SelectItem>
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

            <div className="flex items-center justify-between">
              <Label htmlFor="sticky">Sticky Post</Label>
              <Switch
                id="sticky"
                checked={formData.sticky}
                onCheckedChange={(checked) => handleInputChange('sticky', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="allowComments">Allow Comments</Label>
              <Switch
                id="allowComments"
                checked={formData.allowComments}
                onCheckedChange={(checked) => handleInputChange('allowComments', checked)}
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button onClick={handleSave} className="flex-1" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>

            {formData.status === 'PUBLISHED' && (
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
            <MediaSelector
              onSelect={handleMediaSelect}
              currentImage={formData.featuredImage}
            />
          </CardContent>
        </Card>

        {/* Post Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Privacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="password">Post Password (optional)</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Leave empty for public post"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedPostEditor;