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
import { Progress } from '@/components/ui/progress';
import { 
  Image as ImageIcon, 
  Upload, 
  Search, 
  X, 
  Eye,
  Download,
  Trash2,
  Plus,
  Edit,
  Filter,
  Grid,
  List,
  FolderOpen,
  Calendar,
  FileText,
  Video,
  Music,
  File,
  RotateCcw,
  Crop,
  Sliders
} from 'lucide-react';

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  altText?: string;
  title?: string;
  caption?: string;
  description?: string;
  type: 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO' | 'OTHER';
  createdAt: string;
  uploader: {
    id: string;
    name: string;
    email: string;
  };
}

interface MediaLibraryProps {
  onSelect?: (media: MediaItem) => void;
  multiple?: boolean;
  currentSelection?: string[];
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({ 
  onSelect, 
  multiple = false,
  currentSelection = []
}) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set(currentSelection));
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);

  useEffect(() => {
    fetchMedia();
  }, [typeFilter, dateFilter]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchMedia();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '50',
        ...(searchTerm && { search: searchTerm }),
        ...(typeFilter !== 'all' && { type: typeFilter })
      });

      const response = await fetch(`/api/media?${params}`);
      if (response.ok) {
        const data = await response.json();
        setMediaItems(data.media);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      };

      xhr.onload = async () => {
        if (xhr.status === 200) {
          await fetchMedia();
          setUploadProgress(0);
          setIsUploading(false);
        }
      };

      xhr.onerror = () => {
        console.error('Upload failed');
        setIsUploading(false);
        setUploadProgress(0);
      };

      xhr.open('POST', '/api/upload', true);
      xhr.send(formData);
    } catch (error) {
      console.error('Error uploading files:', error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSelectItem = (item: MediaItem) => {
    if (multiple) {
      const newSelection = new Set(selectedItems);
      if (newSelection.has(item.id)) {
        newSelection.delete(item.id);
      } else {
        newSelection.add(item.id);
      }
      setSelectedItems(newSelection);
    } else {
      setSelectedItems(new Set([item.id]));
      if (onSelect) {
        onSelect(item);
      }
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this media file?')) return;

    try {
      const response = await fetch(`/api/media/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchMedia();
        setSelectedItems(prev => {
          const newSelection = new Set(prev);
          newSelection.delete(itemId);
          return newSelection;
        });
      }
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  const handleEditMetadata = async (item: MediaItem, metadata: any) => {
    try {
      const response = await fetch(`/api/media/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
      });

      if (response.ok) {
        await fetchMedia();
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Error updating media metadata:', error);
    }
  };

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.altText?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'IMAGE':
        return <ImageIcon className="h-4 w-4" />;
      case 'VIDEO':
        return <Video className="h-4 w-4" />;
      case 'AUDIO':
        return <Music className="h-4 w-4" />;
      case 'DOCUMENT':
        return <FileText className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  const selectedMediaItems = mediaItems.filter(item => selectedItems.has(item.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600">Manage your images, videos, and documents</p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="upload" className="cursor-pointer">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </Label>
          <Input
            id="upload"
            type="file"
            multiple
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uploading files...</span>
                <span className="text-sm text-gray-500">{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search media..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="IMAGE">Images</SelectItem>
                  <SelectItem value="VIDEO">Videos</SelectItem>
                  <SelectItem value="AUDIO">Audio</SelectItem>
                  <SelectItem value="DOCUMENT">Documents</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selection Bar */}
      {selectedItems.size > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-blue-900">
                  {selectedItems.size} item{selectedItems.size > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                {onSelect && (
                  <Button size="sm" onClick={() => {
                    selectedMediaItems.forEach(item => onSelect(item));
                  }}>
                    Use Selected
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedItems(new Set())}
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Media Grid/List */}
      <Card>
        <CardHeader>
          <CardTitle>Media Files ({filteredMedia.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">No media files found</p>
              <Label htmlFor="upload-empty" className="cursor-pointer">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Media
                </Button>
              </Label>
              <Input
                id="upload-empty"
                type="file"
                multiple
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                onChange={handleUpload}
                className="hidden"
              />
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredMedia.map((item) => (
                <MediaGridItem
                  key={item.id}
                  item={item}
                  isSelected={selectedItems.has(item.id)}
                  onSelect={() => handleSelectItem(item)}
                  onDelete={() => handleDelete(item.id)}
                  onEdit={() => setEditingItem(item)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMedia.map((item) => (
                <MediaListItem
                  key={item.id}
                  item={item}
                  isSelected={selectedItems.has(item.id)}
                  onSelect={() => handleSelectItem(item)}
                  onDelete={() => handleDelete(item.id)}
                  onEdit={() => setEditingItem(item)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Metadata Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Media Details</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <MediaMetadataEditor
              item={editingItem}
              onSave={(metadata) => handleEditMetadata(editingItem, metadata)}
              onCancel={() => setEditingItem(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Media Grid Item Component
const MediaGridItem: React.FC<{
  item: MediaItem;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onEdit: () => void;
}> = ({ item, isSelected, onSelect, onDelete, onEdit }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-2">
        <div className="aspect-square bg-gray-100 rounded-md overflow-hidden mb-2 relative group">
          {item.type === 'IMAGE' ? (
            <img
              src={item.filePath}
              alt={item.altText || item.originalName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {item.type === 'VIDEO' && <Video className="h-8 w-8 text-gray-400" />}
              {item.type === 'AUDIO' && <Music className="h-8 w-8 text-gray-400" />}
              {item.type === 'DOCUMENT' && <FileText className="h-8 w-8 text-gray-400" />}
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-1">
              <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                <Edit className="h-3 w-3" />
              </Button>
              <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium truncate" title={item.originalName}>
            {item.originalName}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{formatFileSize(item.fileSize)}</span>
            <Badge variant="secondary" className="text-xs">
              {item.type}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Media List Item Component
const MediaListItem: React.FC<{
  item: MediaItem;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onEdit: () => void;
}> = ({ item, isSelected, onSelect, onDelete, onEdit }) => {
  return (
    <div 
      className={`flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
        isSelected ? 'bg-blue-50 border-blue-200' : ''
      }`}
      onClick={onSelect}
    >
      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
        {item.type === 'IMAGE' ? (
          <img
            src={item.filePath}
            alt={item.altText || item.originalName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {item.type === 'VIDEO' && <Video className="h-6 w-6 text-gray-400" />}
            {item.type === 'AUDIO' && <Music className="h-6 w-6 text-gray-400" />}
            {item.type === 'DOCUMENT' && <FileText className="h-6 w-6 text-gray-400" />}
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium">{item.originalName}</h3>
          <Badge variant="secondary" className="text-xs">
            {item.type}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 mb-1">
          {formatFileSize(item.fileSize)} • {formatDate(item.createdAt)}
        </p>
        {item.altText && (
          <p className="text-sm text-gray-600 truncate">{item.altText}</p>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Media Metadata Editor Component
const MediaMetadataEditor: React.FC<{
  item: MediaItem;
  onSave: (metadata: any) => void;
  onCancel: () => void;
}> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: item.title || '',
    altText: item.altText || '',
    caption: item.caption || '',
    description: item.description || ''
  });

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Media title..."
          />
        </div>
        <div>
          <Label htmlFor="altText">Alt Text</Label>
          <Input
            id="altText"
            value={formData.altText}
            onChange={(e) => setFormData(prev => ({ ...prev, altText: e.target.value }))}
            placeholder="Alternative text..."
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="caption">Caption</Label>
        <Input
          id="caption"
          value={formData.caption}
          onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
          placeholder="Image caption..."
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Detailed description..."
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

// Helper functions
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export default MediaLibrary;