import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { parsePermalink } from '@/lib/slug';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug.join('/');

  try {
    // Try to find a page first
    const page = await db.page.findFirst({
      where: {
        slug: slugPath,
        status: 'PUBLISHED'
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        },
        seoMetadata: true
      }
    });

    if (page) {
      return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
            {page.excerpt && (
              <p className="text-xl text-gray-600 mb-4">{page.excerpt}</p>
            )}
            <div className="text-sm text-gray-500">
              By {page.author.name} • Published on{' '}
              {page.publishedAt
                ? new Date(page.publishedAt).toLocaleDateString()
                : new Date(page.createdAt).toLocaleDateString()}
            </div>
          </header>

          {page.featuredImage && (
            <div className="mb-8">
              <img
                src={page.featuredImage}
                alt={page.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content || '' }}
          />
        </article>
      );
    }

    // Try to find a post
    const post = await db.post.findFirst({
      where: {
        slug: slugPath,
        status: 'PUBLISHED'
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
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
        },
        seoMetadata: true
      }
    });

    if (post) {
      return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            {post.excerpt && (
              <p className="text-xl text-gray-600 mb-4">{post.excerpt}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <span>By {post.author.name}</span>
              {post.category && (
                <span>
                  Category: <a href={`/category/${post.category.slug}`} className="text-blue-600 hover:underline">
                    {post.category.name}
                  </a>
                </span>
              )}
              <span>
                Published on{' '}
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString()
                  : new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map(({ tag }) => (
                  <a
                    key={tag.id}
                    href={`/tag/${tag.slug}`}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200"
                  >
                    #{tag.name}
                  </a>
                ))}
              </div>
            )}
          </header>

          {post.featuredImage && (
            <div className="mb-8">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </article>
      );
    }

    // If no content found, return 404
    notFound();

  } catch (error) {
    console.error('Error fetching content:', error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug.join('/');

  try {
    // Try to find a page first
    const page = await db.page.findFirst({
      where: {
        slug: slugPath,
        status: 'PUBLISHED'
      },
      include: {
        seoMetadata: true
      }
    });

    if (page) {
      const seo = page.seoMetadata;
      return {
        title: seo?.title || page.title,
        description: seo?.description || page.excerpt,
        keywords: seo?.keywords,
        openGraph: {
          title: seo?.ogTitle || page.title,
          description: seo?.ogDescription || page.excerpt,
          images: seo?.ogImage ? [seo.ogImage] : page.featuredImage ? [page.featuredImage] : [],
        },
        twitter: {
          card: seo?.twitterCard || 'summary_large_image',
          title: seo?.twitterTitle || page.title,
          images: seo?.twitterImage ? [seo.twitterImage] : page.featuredImage ? [page.featuredImage] : [],
        },
        robots: {
          index: !seo?.noIndex,
          follow: !seo?.noFollow,
        },
      };
    }

    // Try to find a post
    const post = await db.post.findFirst({
      where: {
        slug: slugPath,
        status: 'PUBLISHED'
      },
      include: {
        seoMetadata: true
      }
    });

    if (post) {
      const seo = post.seoMetadata;
      return {
        title: seo?.title || post.title,
        description: seo?.description || post.excerpt,
        keywords: seo?.keywords,
        openGraph: {
          title: seo?.ogTitle || post.title,
          description: seo?.ogDescription || post.excerpt,
          images: seo?.ogImage ? [seo.ogImage] : post.featuredImage ? [post.featuredImage] : [],
        },
        twitter: {
          card: seo?.twitterCard || 'summary_large_image',
          title: seo?.twitterTitle || post.title,
          images: seo?.twitterImage ? [seo.twitterImage] : post.featuredImage ? [post.featuredImage] : [],
        },
        robots: {
          index: !seo?.noIndex,
          follow: !seo?.noFollow,
        },
      };
    }

  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return {
    title: 'Page Not Found',
    description: 'The requested page could not be found.',
  };
}