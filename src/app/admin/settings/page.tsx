'use client';

import DashboardLayout from '@/components/admin/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your site settings and configuration
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="reading">Reading</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="permalinks">Permalinks</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic site information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="site-title">Site Title</Label>
                    <Input id="site-title" defaultValue="Augmex" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-tagline">Tagline</Label>
                    <Input id="site-tagline" defaultValue="Just another WordPress site" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">Site Address (URL)</Label>
                  <Input id="site-url" defaultValue="http://localhost:3000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Administration Email Address</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea id="site-description" rows={3} />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="site-visibility" defaultChecked />
                  <Label htmlFor="site-visibility">Discourage search engines from indexing this site</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reading">
            <Card>
              <CardHeader>
                <CardTitle>Reading Settings</CardTitle>
                <CardDescription>
                  Configure how your site content is displayed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Your homepage displays</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="homepage-latest" name="homepage" defaultChecked />
                      <Label htmlFor="homepage-latest">Your latest posts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="homepage-static" name="homepage" />
                      <Label htmlFor="homepage-static">A static page</Label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="posts-per-page">Blog pages show at most</Label>
                    <Input id="posts-per-page" type="number" defaultValue="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="syndication-feeds">Syndication feeds show the most recent</Label>
                    <Input id="syndication-feeds" type="number" defaultValue="10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feed-display">For each article in a feed, show</Label>
                  <select id="feed-display" className="w-full p-2 border rounded-md">
                    <option>Full text</option>
                    <option>Summary</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussion">
            <Card>
              <CardHeader>
                <CardTitle>Discussion Settings</CardTitle>
                <CardDescription>
                  Configure comments and discussion settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Default article settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="allow-comments" defaultChecked />
                      <Label htmlFor="allow-comments">Allow people to post comments on new articles</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="allow-trackbacks" />
                      <Label htmlFor="allow-trackbacks">Allow link notifications from other blogs (pingbacks and trackbacks)</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Other comment settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="comment-registration" />
                      <Label htmlFor="comment-registration">Users must be registered and logged in to comment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="close-comments" defaultChecked />
                      <Label htmlFor="close-comments">Automatically close comments on articles older than 14 days</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>Media Settings</CardTitle>
                <CardDescription>
                  Configure media upload and display settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Image sizes</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Thumbnail size</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Width" defaultValue="150" />
                        <Input placeholder="Height" defaultValue="150" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="thumbnail-crop" defaultChecked />
                        <Label htmlFor="thumbnail-crop">Crop thumbnail to exact dimensions</Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Medium size</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Width" defaultValue="300" />
                        <Input placeholder="Height" defaultValue="300" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Large size</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Width" defaultValue="1024" />
                        <Input placeholder="Height" defaultValue="1024" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="uploads-folder">Uploading Files</Label>
                  <Input id="uploads-folder" defaultValue="wp-content/uploads" />
                  <p className="text-sm text-gray-600">
                    Files will be organized in month-based folders
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permalinks">
            <Card>
              <CardHeader>
                <CardTitle>Permalink Settings</CardTitle>
                <CardDescription>
                  Configure URL structure for your posts and pages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Common settings</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="permalink-plain" name="permalink" />
                      <Label htmlFor="permalink-plain">Plain</Label>
                      <span className="text-sm text-gray-600">https://example.com/?p=123</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="permalink-day-name" name="permalink" />
                      <Label htmlFor="permalink-day-name">Day and name</Label>
                      <span className="text-sm text-gray-600">https://example.com/2024/01/15/sample-post/</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="permalink-month-name" name="permalink" />
                      <Label htmlFor="permalink-month-name">Month and name</Label>
                      <span className="text-sm text-gray-600">https://example.com/2024/01/sample-post/</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="permalink-post-name" name="permalink" defaultChecked />
                      <Label htmlFor="permalink-post-name">Post name</Label>
                      <span className="text-sm text-gray-600">https://example.com/sample-post/</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category-base">Category base</Label>
                  <Input id="category-base" placeholder="category" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tag-base">Tag base</Label>
                  <Input id="tag-base" placeholder="tag" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">Reset</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}