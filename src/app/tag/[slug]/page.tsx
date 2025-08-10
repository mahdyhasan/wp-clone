import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Link from 'next/link';

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;

  try {
    // Find the tag
    const tag = await db.tag.findUnique({
      where: { slug },
      include: {
        posts: {
          where: {
            post: {
              status: 'PUBLISHED'
            }
          },
          include: {
            post: {
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
                }
              }
            }
          },
          orderBy: {
            post: {
              publishedAt: 'desc'
            }
          }
        }
      }
    });

    if (!tag) {
      notFound();
    }

    const posts = tag.posts.map(pt => pt.post);

    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Tag: #{tag.name}</h1>
          <p className="text-gray-500">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with "#{tag.name}"
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts found with this tag.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {post.featuredImage && (
                  <Link href={`/${post.slug}/`}>
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">
                    <Link href={`/${post.slug}/`} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  )}
                  <div className="text-sm text-gray-500">
                    <span>By {post.author.name}</span>
                    {post.category && (
                      <>
                        <span className="mx-2">•</span>
                        <span>
                          Category: <a href={`/category/${post.category.slug}`} className="text-blue-600 hover:underline">
                            {post.category.name}
                          </a>
                        </span>
                      </>
                    )}
                    <span className="mx-2">•</span>
                    <span>
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching tag:', error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: TagPageProps) {
  const { slug } = await params;

  try {
    const tag = await db.tag.findUnique({
      where: { slug }
    });

    if (tag) {
      return {
        title: `Tag: #${tag.name}`,
        description: `Browse all posts tagged with #${tag.name}`,
        openGraph: {
          title: `Tag: #${tag.name}`,
          description: `Browse all posts tagged with #${tag.name}`,
        },
      };
    }
  } catch (error) {
    console.error('Error generating tag metadata:', error);
  }

  return {
    title: 'Tag Not Found',
    description: 'The requested tag could not be found.',
  };
}