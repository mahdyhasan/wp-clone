'use client';

import DashboardLayout from '@/components/admin/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Eye, 
  MousePointer, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Globe,
  Calendar
} from 'lucide-react';

export default function AnalyticsPage() {
  // Mock analytics data
  const stats = [
    {
      title: 'Total Visitors',
      value: '12,345',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      description: 'Last 30 days'
    },
    {
      title: 'Page Views',
      value: '45,678',
      change: '+8.2%',
      trend: 'up',
      icon: Eye,
      description: 'Last 30 days'
    },
    {
      title: 'Bounce Rate',
      value: '32.4%',
      change: '-2.1%',
      trend: 'down',
      icon: MousePointer,
      description: 'Last 30 days'
    },
    {
      title: 'Avg. Session',
      value: '3m 24s',
      change: '+15s',
      trend: 'up',
      icon: Clock,
      description: 'Last 30 days'
    }
  ];

  const popularPages = [
    { path: '/getting-started-with-nextjs', views: 1234, visitors: 892 },
    { path: '/react-hooks-guide', views: 987, visitors: 756 },
    { path: '/css-grid-layout', views: 876, visitors: 654 },
    { path: '/javascript-best-practices', views: 765, visitors: 543 },
    { path: '/typescript-tutorial', views: 654, visitors: 432 }
  ];

  const topReferrers = [
    { source: 'Google', visitors: 3456, percentage: 45 },
    { source: 'Direct', visitors: 1234, percentage: 16 },
    { source: 'Facebook', visitors: 987, percentage: 13 },
    { source: 'Twitter', visitors: 654, percentage: 8 },
    { source: 'LinkedIn', visitors: 432, percentage: 6 }
  ];

  const devices = [
    { type: 'Desktop', visitors: 5432, percentage: 65 },
    { type: 'Mobile', visitors: 2876, percentage: 35 },
    { type: 'Tablet', visitors: 432, percentage: 5 }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-600">
            Track your site performance and visitor insights
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {stat.change}
                  </span>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Popular Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Pages</CardTitle>
              <CardDescription>Most visited pages on your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularPages.map((page, index) => (
                  <div key={page.path} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{page.path}</p>
                        <p className="text-xs text-gray-500">{page.views} views</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{page.visitors} visitors</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Referrers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Referrers</CardTitle>
              <CardDescription>Where your visitors come from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topReferrers.map((referrer, index) => (
                  <div key={referrer.source} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{referrer.source}</p>
                        <p className="text-xs text-gray-500">{referrer.visitors} visitors</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{referrer.percentage}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Device Statistics</CardTitle>
              <CardDescription>Visitor device breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devices.map((device) => (
                  <div key={device.type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-sm">{device.type}</p>
                        <p className="text-xs text-gray-500">{device.visitors} visitors</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{device.percentage}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest site activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">New post published</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">New comment received</p>
                    <p className="text-xs text-gray-500">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">User registration</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Media uploaded</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}