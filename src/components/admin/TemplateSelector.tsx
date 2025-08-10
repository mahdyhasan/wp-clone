'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Copy, Eye } from 'lucide-react';
import { pageTemplates, PageTemplate } from '@/lib/templates';

interface TemplateSelectorProps {
  type: 'page' | 'post' | 'success_story';
  onSelect: (template: PageTemplate) => void;
  children: React.ReactNode;
}

export function TemplateSelector({ type, onSelect, children }: TemplateSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<PageTemplate | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<PageTemplate | null>(null);

  const templates = pageTemplates.filter(template => template.type === type);

  const handleSelectTemplate = (template: PageTemplate) => {
    setSelectedTemplate(template);
    onSelect(template);
    setOpen(false);
  };

  const handlePreviewTemplate = (template: PageTemplate) => {
    setPreviewTemplate(template);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-[calc(90vh-120px)]">
          <ScrollArea className="flex-1 pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span className="flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        {template.name}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {template.type.replace('_', ' ')}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600">{template.description}</p>
                    
                    {template.excerpt && (
                      <div className="p-2 bg-gray-50 rounded text-xs">
                        <strong>Excerpt:</strong> {template.excerpt}
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleSelectTemplate(template)}
                        className="flex-1"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Use Template
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePreviewTemplate(template)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>

                    {template.categories && template.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {template.categories.map((category) => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {template.tags && template.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>

      {/* Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Preview: {previewTemplate?.name}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4">
            <div className="prose prose-sm max-w-none">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: previewTemplate?.content || '' 
                }} 
              />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}