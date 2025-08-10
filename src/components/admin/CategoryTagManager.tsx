'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Tag as TagIcon,
  FolderOpen,
  Hash,
  Save,
  X,
  Palette,
  Copy,
  MoreVertical,
  BarChart3
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  createdAt: string;
  _count: {
    posts: number;
  };
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  createdAt: string;
  _count: {
    posts: number;
  };
}

interface CategoryTagManagerProps {
  onCategorySelect?: (category: Category) => void;
  onTagSelect?: (tag: Tag) => void;
  multiple?: boolean;
}

const CategoryTagManager: React.FC<CategoryTagManagerProps> = ({
  onCategorySelect,
  onTagSelect,
  multiple = false
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('categories');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const colorOptions = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Yellow', value: '#f59e0b' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Gray', value: '#6b7280' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [categoriesResponse, tagsResponse] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/tags')
      ]);

      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.categories || []);
      }

      if (tagsResponse.ok) {
        const tagsData = await tagsResponse.json();
        setTags(tagsData.tags || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (categoryData: any) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        await fetchData();
        setEditingCategory(null);
      }
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleUpdateCategory = async (categoryId: string, categoryData: any) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        await fetchData();
        setEditingCategory(null);
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category? This will affect all posts in this category.')) return;

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleCreateTag = async (tagData: any) => {
    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tagData),
      });

      if (response.ok) {
        await fetchData();
        setEditingTag(null);
      }
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  };

  const handleUpdateTag = async (tagId: string, tagData: any) => {
    try {
      const response = await fetch(`/api/tags/${tagId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tagData),
      });

      if (response.ok) {
        await fetchData();
        setEditingTag(null);
      }
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    if (!confirm('Are you sure you want to delete this tag? This will remove it from all posts.')) return;

    try {
      const response = await fetch(`/api/tags/${tagId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectItem = (item: Category | Tag, type: 'category' | 'tag') => {
    if (multiple) {
      const newSelection = new Set(selectedItems);
      const itemId = `${type}-${item.id}`;
      if (newSelection.has(itemId)) {
        newSelection.delete(itemId);
      } else {
        newSelection.add(itemId);
      }
      setSelectedItems(newSelection);
    } else {
      if (type === 'category' && onCategorySelect) {
        onCategorySelect(item as Category);
      } else if (type === 'tag' && onTagSelect) {
        onTagSelect(item as Tag);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories & Tags</h1>
          <p className="text-gray-600">Organize your content with categories and tags</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingCategory(null)}>
                <FolderOpen className="h-4 w-4 mr-2" />
                New Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? 'Edit Category' : 'Create New Category'}
                </DialogTitle>
              </DialogHeader>
              <CategoryForm
                category={editingCategory}
                onSave={(data) => {
                  if (editingCategory) {
                    handleUpdateCategory(editingCategory.id, data);
                  } else {
                    handleCreateCategory(data);
                  }
                }}
                onCancel={() => setEditingCategory(null)}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={!!editingTag} onOpenChange={(open) => !open && setEditingTag(null)}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingTag(null)}>
                <TagIcon className="h-4 w-4 mr-2" />
                New Tag
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingTag ? 'Edit Tag' : 'Create New Tag'}
                </DialogTitle>
              </DialogHeader>
              <TagForm
                tag={editingTag}
                onSave={(data) => {
                  if (editingTag) {
                    handleUpdateTag(editingTag.id, data);
                  } else {
                    handleCreateTag(data);
                  }
                }}
                onCancel={() => setEditingTag(null)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search categories and tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="categories">
            Categories ({filteredCategories.length})
          </TabsTrigger>
          <TabsTrigger value="tags">
            Tags ({filteredTags.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : filteredCategories.length === 0 ? (
                <div className="text-center py-8">
                  <FolderOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 mb-4">No categories found</p>
                  <Button onClick={() => setEditingCategory(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Category
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredCategories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      isSelected={selectedItems.has(`category-${category.id}`)}
                      onSelect={() => handleSelectItem(category, 'category')}
                      onEdit={() => setEditingCategory(category)}
                      onDelete={() => handleDeleteCategory(category.id)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tags" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : filteredTags.length === 0 ? (
                <div className="text-center py-8">
                  <TagIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 mb-4">No tags found</p>
                  <Button onClick={() => setEditingTag(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Tag
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredTags.map((tag) => (
                    <TagCard
                      key={tag.id}
                      tag={tag}
                      isSelected={selectedItems.has(`tag-${tag.id}`)}
                      onSelect={() => handleSelectItem(tag, 'tag')}
                      onEdit={() => setEditingTag(tag)}
                      onDelete={() => handleDeleteTag(tag.id)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Category Card Component
const CategoryCard: React.FC<{
  category: Category;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ category, isSelected, onSelect, onEdit, onDelete }) => {
  return (
    <div 
      className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50 border-blue-200' : ''
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        {category.color && (
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: category.color }}
          />
        )}
        <div>
          <h3 className="font-medium">{category.name}</h3>
          <p className="text-sm text-gray-500">{category.slug}</p>
          {category.description && (
            <p className="text-sm text-gray-600 mt-1">{category.description}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium">{category._count.posts} posts</p>
          <p className="text-xs text-gray-500">Created {new Date(category.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Tag Card Component
const TagCard: React.FC<{
  tag: Tag;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ tag, isSelected, onSelect, onEdit, onDelete }) => {
  return (
    <div 
      className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50 border-blue-200' : ''
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        {tag.color && (
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: tag.color }}
          />
        )}
        <div className="flex items-center gap-2">
          <Hash className="h-4 w-4 text-gray-400" />
          <div>
            <h3 className="font-medium">{tag.name}</h3>
            <p className="text-sm text-gray-500">{tag.slug}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium">{tag._count.posts} posts</p>
          <p className="text-xs text-gray-500">Created {new Date(tag.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Category Form Component
const CategoryForm: React.FC<{
  category?: Category | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}> = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    color: category?.color || ''
  });

  const colorOptions = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Yellow', value: '#f59e0b' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Gray', value: '#6b7280' }
  ];

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: category?.slug || generateSlug(name)
    }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Category name..."
          required
        />
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          placeholder="category-slug"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Category description..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="color">Color</Label>
        <Select value={formData.color} onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select a color" />
          </SelectTrigger>
          <SelectContent>
            {colorOptions.map((color) => (
              <SelectItem key={color.value} value={color.value}>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color.value }}
                  />
                  <span>{color.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          {category ? 'Update' : 'Create'} Category
        </Button>
      </div>
    </form>
  );
};

// Tag Form Component
const TagForm: React.FC<{
  tag?: Tag | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}> = ({ tag, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: tag?.name || '',
    slug: tag?.slug || '',
    color: tag?.color || ''
  });

  const colorOptions = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Yellow', value: '#f59e0b' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Gray', value: '#6b7280' }
  ];

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: tag?.slug || generateSlug(name)
    }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Tag name..."
          required
        />
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          placeholder="tag-slug"
          required
        />
      </div>

      <div>
        <Label htmlFor="color">Color</Label>
        <Select value={formData.color} onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select a color" />
          </SelectTrigger>
          <SelectContent>
            {colorOptions.map((color) => (
              <SelectItem key={color.value} value={color.value}>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color.value }}
                  />
                  <span>{color.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          {tag ? 'Update' : 'Create'} Tag
        </Button>
      </div>
    </form>
  );
};

export default CategoryTagManager;