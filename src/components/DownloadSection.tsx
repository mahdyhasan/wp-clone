'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Terminal, CheckCircle, AlertCircle } from 'lucide-react';

export default function DownloadSection() {
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = async () => {
    setDownloadStatus('downloading');
    setDownloadProgress(0);

    try {
      // Simulate download progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Create download link
      const response = await fetch('/api/download');
      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'augmex-dashboard-complete.tar.gz';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      clearInterval(progressInterval);
      setDownloadProgress(100);
      setDownloadStatus('success');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setDownloadStatus('idle');
        setDownloadProgress(0);
      }, 3000);

    } catch (error) {
      console.error('Download error:', error);
      setDownloadStatus('error');
      setTimeout(() => {
        setDownloadStatus('idle');
        setDownloadProgress(0);
      }, 3000);
    }
  };

  const getStatusIcon = () => {
    switch (downloadStatus) {
      case 'downloading':
        return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Download className="h-4 w-4" />;
    }
  };

  const getStatusText = () => {
    switch (downloadStatus) {
      case 'downloading':
        return `Downloading... ${downloadProgress}%`;
      case 'success':
        return 'Download Complete!';
      case 'error':
        return 'Download Failed';
      default:
        return 'Download Complete Project';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Download Augmex Admin Dashboard
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get the complete WordPress-like admin dashboard source code and run it on your local machine.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardHeader>
              <FileText className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <CardTitle className="text-lg">Complete Source Code</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Full Next.js 15 project with TypeScript, Prisma, and all components included.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Terminal className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <CardTitle className="text-lg">Ready to Deploy</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Includes database setup, authentication, and all dependencies. Just run and enjoy!
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="h-8 w-8 mx-auto text-purple-600 mb-2" />
              <CardTitle className="text-lg">Production Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Complete with admin panel, media library, and content management system.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            onClick={handleDownload}
            disabled={downloadStatus === 'downloading'}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            {getStatusIcon()}
            <span className="ml-2">{getStatusText()}</span>
          </Button>

          {downloadStatus === 'downloading' && (
            <div className="mt-4 w-full max-w-md mx-auto">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="mt-8 text-sm text-gray-600">
            <p className="mb-2">
              <strong>File Size:</strong> ~2-5 MB (varies based on project content)
            </p>
            <p className="mb-2">
              <strong>Includes:</strong> Complete project, setup instructions, and documentation
            </p>
            <p>
              <strong>Requirements:</strong> Node.js 18+, npm or yarn
            </p>
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm max-w-2xl mx-auto">
            <h3 className="font-semibold mb-2">Quick Start After Download:</h3>
            <div className="text-left text-sm text-gray-600 space-y-1">
              <p>1. Extract: <code className="bg-gray-100 px-1 rounded">tar -xzf augmex-dashboard-complete.tar.gz</code></p>
              <p>2. Navigate: <code className="bg-gray-100 px-1 rounded">cd my-project</code></p>
              <p>3. Install: <code className="bg-gray-100 px-1 rounded">npm install</code></p>
              <p>4. Setup: <code className="bg-gray-100 px-1 rounded">npx prisma generate && npm run db:push</code></p>
              <p>5. Start: <code className="bg-gray-100 px-1 rounded">npm run dev</code></p>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              Default admin: admin@augmex.io / admin123
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}