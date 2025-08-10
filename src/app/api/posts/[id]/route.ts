import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const post = await db.post.findUnique({
      where: { id: params.id },
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
      }
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    
    // First, update the post
    const post = await db.post.update({
      where: { id: params.id },
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

    // Handle tags - remove existing and add new ones
    await db.postTag.deleteMany({
      where: { postId: params.id }
    });

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

    // Update SEO metadata if provided
    if (data.seoMetadata) {
      const existingSeo = await db.sEOMetadata.findUnique({
        where: { postId: params.id }
      });

      if (existingSeo) {
        await db.sEOMetadata.update({
          where: { id: existingSeo.id },
          data: data.seoMetadata
        });
      } else {
        await db.sEOMetadata.create({
          data: {
            ...data.seoMetadata,
            postId: post.id
          }
        });
      }
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Delete related records first
    await db.postTag.deleteMany({
      where: { postId: params.id }
    });

    await db.sEOMetadata.deleteMany({
      where: { postId: params.id }
    });

    // Delete the post
    await db.post.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}