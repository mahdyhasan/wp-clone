'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  File, 
  Image, 
  MessageSquare, 
  Users, 
  Eye,
  TrendingUp,
  Calendar,
  Plus
} from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    {
      title: 'Total Posts',
      value: '24',
      change: '+12%',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pages',
      value: '8',
      change: '+0%',
      icon: File,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Media Files',
      value: '156',
      change: '+23%',
      icon: Image,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Comments',
      value: '89',
      change: '+5%',
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Users',
      value: '5',
      change: '+1',
      icon: Users,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Views Today',
      value: '1,234',
      change: '+18%',
      icon: Eye,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  const recentPosts = [
    {
      title: 'Building Elite Remote Teams: A Complete Guide',
      author: 'John Doe',
      date: '2024-01-15',
      status: 'Published'
    },
    {
      title: 'Cost Savings with Remote Development Teams',
      author: 'Jane Smith',
      date: '2024-01-14',
      status: 'Published'
    },
    {
      title: 'AI Talent Acquisition Trends 2024',
      author: 'Mike Johnson',
      date: '2024-01-13',
      status: 'Draft'
    },
    {
      title: 'Remote Team Management Best Practices',
      author: 'Sarah Wilson',
      date: '2024-01-12',
      status: 'Published'
    }
  ];

  const recentComments = [
    {
      author: 'Alex Thompson',
      post: 'Building Elite Remote Teams',
      content: 'Great article! Very informative...',
      date: '2 hours ago',
      status: 'Pending'
    },
    {
      author: 'Emma Davis',
      post: 'Cost Savings with Remote Teams',
      content: 'This helped us save 70% on development costs...',
      date: '5 hours ago',
      status: 'Approved'
    },
    {
      author: 'Chris Lee',
      post: 'AI Talent Acquisition Trends',
      content: 'Looking forward to more insights on AI hiring...',
      date: '1 day ago',
      status: 'Approved'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Augmex Admin</h1>
        <p className="text-blue-100 mb-4">
          Manage your content, media, and website settings from here.
        </p>
        <div className="flex gap-4">
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            New Page
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col" variant="outline">
              <FileText className="h-6 w-6 mb-2" />
              New Post
            </Button>
            <Button className="h-20 flex-col" variant="outline">
              <File className="h-6 w-6 mb-2" />
              New Page
            </Button>
            <Button className="h-20 flex-col" variant="outline">
              <Image className="h-6 w-6 mb-2" />
              Upload Media
            </Button>
            <Button className="h-20 flex-col" variant="outline">
              <Users className="h-6 w-6 mb-2" />
              Add User
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Posts</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{post.title}</h4>
                    <p className="text-xs text-gray-500">by {post.author} • {post.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      post.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status}
                    </span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Comments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Comments</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComments.map((comment, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{comment.author}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        comment.status === 'Approved' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {comment.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">on {comment.post}</p>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                  <p className="text-xs text-gray-500 mt-2">{comment.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Site Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">New post published: "Building Elite Remote Teams"</p>
                <p className="text-xs text-gray-500">2 hours ago by John Doe</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">New user registered: Jane Smith</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Media uploaded: team-photo.jpg</p>
                <p className="text-xs text-gray-500">1 day ago by Mike Johnson</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Comment approved on "Cost Savings with Remote Teams"</p>
                <p className="text-xs text-gray-500">1 day ago by Sarah Wilson</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;