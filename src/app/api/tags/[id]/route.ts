import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const tag = await db.tag.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    });

    if (!tag) {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(tag);
  } catch (error) {
    console.error('Error fetching tag:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tag' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    
    // Check if tag with same name or slug already exists (excluding current one)
    const existingTag = await db.tag.findFirst({
      where: {
        OR: [
          { name: data.name },
          { slug: data.slug }
        ],
        NOT: {
          id: params.id
        }
      }
    });

    if (existingTag) {
      return NextResponse.json(
        { error: 'Tag with this name or slug already exists' },
        { status: 400 }
      );
    }

    const tag = await db.tag.update({
      where: { id: params.id },
      data: {
        name: data.name,
        slug: data.slug,
        color: data.color
      },
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.error('Error updating tag:', error);
    return NextResponse.json(
      { error: 'Failed to update tag' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Remove all post-tag associations first
    await db.postTag.deleteMany({
      where: { tagId: params.id }
    });

    // Delete the tag
    await db.tag.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json(
      { error: 'Failed to delete tag' },
      { status: 500 }
    );
  }
}