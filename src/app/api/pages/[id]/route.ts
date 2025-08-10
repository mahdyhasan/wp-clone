import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const page = await db.page.findUnique({
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
        parent: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        },
        children: {
          select: {
            id: true,
            title: true,
            slug: true,
            order: true
          }
        },
        seoMetadata: true
      }
    });

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    
    const page = await db.page.update({
      where: { id: params.id },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        featuredImage: data.featuredImage,
        status: data.status,
        template: data.template,
        parentId: data.parentId || null,
        order: data.order || 0,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null
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
        parent: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        },
        children: {
          select: {
            id: true,
            title: true,
            slug: true,
            order: true
          }
        },
        seoMetadata: true
      }
    });

    // Update SEO metadata if provided
    if (data.seoMetadata) {
      const existingSeo = await db.sEOMetadata.findUnique({
        where: { pageId: params.id }
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
            pageId: page.id
          }
        });
      }
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error updating page:', error);
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if page has children
    const children = await db.page.findMany({
      where: { parentId: params.id }
    });

    if (children.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete page with children. Please move or delete child pages first.' },
        { status: 400 }
      );
    }

    // Delete related records first
    await db.sEOMetadata.deleteMany({
      where: { pageId: params.id }
    });

    // Delete the page
    await db.page.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}