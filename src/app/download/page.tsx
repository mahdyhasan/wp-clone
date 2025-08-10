'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Terminal, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DownloadPage() {
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
      const response = await fetch('/augmex-dashboard-final.tar.gz');
      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'augmex-dashboard-final.tar.gz';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back to Home */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Download Augmex Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the complete WordPress-like admin dashboard source code and run it on your local machine.
          </p>
        </div>

        {/* Download Button */}
        <div className="text-center mb-12">
          <Button
            onClick={handleDownload}
            disabled={downloadStatus === 'downloading'}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-xl"
          >
            {getStatusIcon()}
            <span className="ml-2">{getStatusText()}</span>
          </Button>

          {downloadStatus === 'downloading' && (
            <div className="mt-4 w-full max-w-md mx-auto">
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardHeader>
              <FileText className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <CardTitle className="text-xl">Complete Source Code</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Full Next.js 15 project with TypeScript, Prisma, and all components included.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Terminal className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <CardTitle className="text-xl">Ready to Deploy</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Includes database setup, authentication, and all dependencies. Just run and enjoy!
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="h-12 w-12 mx-auto text-purple-600 mb-4" />
              <CardTitle className="text-xl">Production Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Complete with admin panel, media library, and content management system.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Setup Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Setup Instructions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Prerequisites</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Node.js 18+ installed</li>
                <li>npm or yarn package manager</li>
                <li>Unix/Linux/macOS or Windows with WSL</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Start</h3>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
                <p><span className="text-blue-600"># 1. Extract the archive</span></p>
                <p>tar -xzf augmex-dashboard-final.tar.gz</p>
                <p>tar -xzf augmex-dashboard-complete.tar.gz</p>
                <p>cd my-project</p>
                <p className="mt-3"><span className="text-blue-600"># 2. Install dependencies</span></p>
                <p>npm install</p>
                <p className="mt-3"><span className="text-blue-600"># 3. Setup database</span></p>
                <p>npx prisma generate</p>
                <p>npm run db:push</p>
                <p>npx tsx prisma/seed.ts</p>
                <p className="mt-3"><span className="text-blue-600"># 4. Start development server</span></p>
                <p>npm run dev</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Access the Application</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="mb-2"><strong>Frontend:</strong> http://localhost:3000</p>
                <p className="mb-2"><strong>Admin Login:</strong> http://localhost:3000/admin/login</p>
                <p><strong>Default Admin:</strong> admin@augmex.io / admin123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Included Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">🔐 Authentication System</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>JWT-based authentication</li>
                <li>HTTP-only cookie security</li>
                <li>Protected admin routes</li>
                <li>Automatic login redirects</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">📝 Content Management</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Post and page creation/editing</li>
                <li>Multiple post formats</li>
                <li>Rich text editor</li>
                <li>Featured image management</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">📸 Media Library</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>File upload with drag-and-drop</li>
                <li>Image preview and optimization</li>
                <li>File organization and filtering</li>
                <li>Multiple file type support</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">🏷️ Category & Tag System</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Hierarchical category structure</li>
                <li>Tag management with color coding</li>
                <li>Bulk operations support</li>
                <li>Content association management</li>
              </ul>
            </div>
          </div>
        </div>

        {/* File Info */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p className="mb-2">
            <strong>File Size:</strong> ~235 KB
          </p>
          <p className="mb-2">
            <strong>Includes:</strong> Complete project, setup instructions, and documentation
          </p>
          <p>
            <strong>Technical Stack:</strong> Next.js 15, TypeScript, Prisma, shadcn/ui, Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}