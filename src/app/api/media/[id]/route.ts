import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const media = await db.media.findUnique({
      where: { id: params.id },
      include: {
        uploader: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!media) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(media);
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    
    const media = await db.media.update({
      where: { id: params.id },
      data: {
        altText: data.altText,
        title: data.title,
        caption: data.caption,
        description: data.description
      },
      include: {
        uploader: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error('Error updating media:', error);
    return NextResponse.json(
      { error: 'Failed to update media' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get media info first to delete the file
    const media = await db.media.findUnique({
      where: { id: params.id }
    });

    if (!media) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }

    // Delete the file from filesystem
    try {
      const filePath = path.join(process.cwd(), 'public', media.filePath);
      await unlink(filePath);
    } catch (fileError) {
      console.warn('Could not delete file from filesystem:', fileError);
    }

    // Delete from database
    await db.media.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json(
      { error: 'Failed to delete media' },
      { status: 500 }
    );
  }
}