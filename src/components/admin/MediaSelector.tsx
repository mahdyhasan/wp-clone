'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Image as ImageIcon, 
  Upload, 
  Search, 
  X, 
  Eye,
  Download,
  Trash2,
  Plus
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
  type: 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO' | 'OTHER';
  createdAt: string;
}

interface MediaSelectorProps {
  onSelect: (media: MediaItem) => void;
  currentImage?: string;
  multiple?: boolean;
}

const MediaSelector: React.FC<MediaSelectorProps> = ({ 
  onSelect, 
  currentImage, 
  multiple = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/media');
      if (response.ok) {
        const data = await response.json();
        setMediaItems(data.media || []);
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

    setIsLoading(true);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await fetchMedia(); // Refresh the media list
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMedia = mediaItems.filter(item =>
    item.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.altText?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="space-y-4">
      {/* Current Image Display */}
      {currentImage && (
        <div className="relative">
          <img
            src={currentImage}
            alt="Current featured image"
            className="w-full h-48 object-cover rounded-lg"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => onSelect({} as MediaItem)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Media Selector Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full" onClick={fetchMedia}>
            <ImageIcon className="h-4 w-4 mr-2" />
            Select Media
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Media Library</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col h-[60vh]">
            {/* Header with search and upload */}
            <div className="flex items-center justify-between p-4 border-b space-x-4">
              <div className="flex items-center space-x-2 flex-1">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search media..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Label htmlFor="upload" className="cursor-pointer">
                  <Button variant="outline" size="sm" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </span>
                  </Button>
                </Label>
                <Input
                  id="upload"
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                  onChange={handleUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Media Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
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
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredMedia.map((item) => (
                    <Card 
                      key={item.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedMedia?.id === item.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedMedia(item)}
                    >
                      <CardContent className="p-2">
                        <div className="aspect-square bg-gray-100 rounded-md overflow-hidden mb-2">
                          {item.type === 'IMAGE' ? (
                            <img
                              src={item.filePath}
                              alt={item.altText || item.originalName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
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
                          <p className="text-xs text-gray-400">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with actions */}
            {selectedMedia && (
              <div className="border-t p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {selectedMedia.type === 'IMAGE' && (
                      <img
                        src={selectedMedia.filePath}
                        alt={selectedMedia.altText || selectedMedia.originalName}
                        className="h-16 w-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-medium">{selectedMedia.originalName}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(selectedMedia.fileSize)} • {selectedMedia.type}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button 
                      onClick={() => {
                        onSelect(selectedMedia);
                        setIsOpen(false);
                        setSelectedMedia(null);
                      }}
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaSelector;