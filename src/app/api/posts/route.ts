import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (status && status !== 'all') {
      where.status = status;
    }
    
    if (type && type !== 'all') {
      where.type = type;
    }
    
    if (categoryId) {
      where.categoryId = categoryId;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [posts, total] = await Promise.all([
      db.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true
            }
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          tags: {
            include: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  slug: true
                }
              }
            }
          },
          seoMetadata: true,
          _count: {
            select: {
              comments: true
            }
          }
        },
        orderBy: [
          { sticky: 'desc' },
          { publishedAt: 'desc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: limit
      }),
      db.post.count({ where })
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const post = await db.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        featuredImage: data.featuredImage,
        status: data.status,
        type: data.type,
        format: data.format,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        authorId: data.authorId,
        categoryId: data.categoryId || null,
        allowComments: data.allowComments,
        sticky: data.sticky,
        password: data.password,
        // Format-specific fields
        videoUrl: data.videoUrl,
        audioUrl: data.audioUrl,
        quoteText: data.quoteText,
        quoteAuthor: data.quoteAuthor,
        linkUrl: data.linkUrl,
        linkTitle: data.linkTitle
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            }
          }
        },
        seoMetadata: true
      }
    });

    // Handle tags
    if (data.tags && data.tags.length > 0) {
      for (const tagData of data.tags) {
        let tag = await db.tag.findUnique({
          where: { slug: tagData.slug }
        });

        if (!tag) {
          tag = await db.tag.create({
            data: {
              name: tagData.name,
              slug: tagData.slug
            }
          });
        }

        await db.postTag.create({
          data: {
            postId: post.id,
            tagId: tag.id
          }
        });
      }
    }

    // Create SEO metadata if provided
    if (data.seoMetadata) {
      await db.sEOMetadata.create({
        data: {
          ...data.seoMetadata,
          postId: post.id
        }
      });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}