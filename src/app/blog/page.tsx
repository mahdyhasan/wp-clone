import { db } from '@/lib/db';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, FolderOpen } from 'lucide-react';

export default async function BlogPage() {
  try {
    const posts = await db.post.findMany({
      where: {
        status: 'PUBLISHED'
      },
      include: {
        author: {
          select: {
            name: true
          }
        },
        category: {
          select: {
            name: true,
            slug: true
          }
        },
        tags: {
          include: {
            tag: {
              select: {
                name: true,
                slug: true
              }
            }
          }
        }
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: 10 // Limit to 10 posts for the blog page
    });

    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600">Latest news and insights</p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts published yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {post.featuredImage && (
                  <Link href={`/${post.slug}/`}>
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    <Link href={`/${post.slug}/`} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {post.excerpt && (
                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString()
                          : new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author.name}</span>
                    </div>
                    {post.category && (
                      <div className="flex items-center">
                        <FolderOpen className="h-4 w-4 mr-1" />
                        <Link 
                          href={`/category/${post.category.slug}`} 
                          className="text-blue-600 hover:underline"
                        >
                          {post.category.name}
                        </Link>
                      </div>
                    )}
                  </div>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map(({ tag }) => (
                        <Link
                          key={tag.id}
                          href={`/tag/${tag.slug}`}
                          className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200"
                        >
                          #{tag.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/${post.slug}/`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Read more →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Unable to load posts at this time.</p>
        </div>
      </div>
    );
  }
}

// Generate metadata for SEO
export const metadata = {
  title: 'Blog',
  description: 'Latest news and insights from our team',
  openGraph: {
    title: 'Blog',
    description: 'Latest news and insights from our team',
  },
};