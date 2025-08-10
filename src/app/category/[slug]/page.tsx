import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  try {
    // Find the category
    const category = await db.category.findUnique({
      where: { slug },
      include: {
        posts: {
          where: {
            status: 'PUBLISHED'
          },
          include: {
            author: {
              select: {
                name: true
              }
            }
          },
          orderBy: {
            publishedAt: 'desc'
          }
        }
      }
    });

    if (!category) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Category: {category.name}</h1>
          {category.description && (
            <p className="text-xl text-gray-600">{category.description}</p>
          )}
          <p className="text-gray-500 mt-2">
            {category.posts.length} {category.posts.length === 1 ? 'post' : 'posts'} in this category
          </p>
        </header>

        {category.posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts found in this category.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.posts.map((post) => (
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
    console.error('Error fetching category:', error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;

  try {
    const category = await db.category.findUnique({
      where: { slug }
    });

    if (category) {
      return {
        title: `Category: ${category.name}`,
        description: category.description || `Browse all posts in the ${category.name} category`,
        openGraph: {
          title: `Category: ${category.name}`,
          description: category.description || `Browse all posts in the ${category.name} category`,
        },
      };
    }
  } catch (error) {
    console.error('Error generating category metadata:', error);
  }

  return {
    title: 'Category Not Found',
    description: 'The requested category could not be found.',
  };
}