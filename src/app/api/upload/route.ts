import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

// Helper function to get media type from MIME type
function getMediaType(mimeType: string): 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT' | 'OTHER' {
  if (mimeType.startsWith('image/')) return 'IMAGE';
  if (mimeType.startsWith('video/')) return 'VIDEO';
  if (mimeType.startsWith('audio/')) return 'AUDIO';
  if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('sheet') || mimeType.includes('presentation')) return 'DOCUMENT';
  return 'OTHER';
}

// Helper function to create organized directory structure
async function getUploadPath(mimeType: string): Promise<string> {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  
  const mediaType = getMediaType(mimeType);
  const typeDir = mediaType.toLowerCase();
  
  const uploadDir = join(process.cwd(), 'public', 'uploads', typeDir, `${year}`, `${month}`);
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (error) {
    // Directory already exists
  }
  
  return uploadDir;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const files: File[] = data.getAll('files') as unknown as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      );
    }

    const uploadedFiles = [];
    const errors = [];

    // For now, we'll use a default user ID. In a real app, this would come from authentication
    const userId = 'default-user-id';

    for (const file of files) {
      try {
        // Validate file type
        const allowedTypes = [
          // Images
          'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
          // Videos
          'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime',
          // Audio
          'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm',
          // Documents
          'application/pdf', 
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'text/plain',
          'text/csv'
        ];

        if (!allowedTypes.includes(file.type)) {
          errors.push({
            fileName: file.name,
            error: 'File type not allowed'
          });
          continue;
        }

        // Validate file size (50MB max)
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
          errors.push({
            fileName: file.name,
            error: 'File size exceeds 50MB limit'
          });
          continue;
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Get organized upload path
        const uploadDir = await getUploadPath(file.type);

        // Generate unique filename
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const fileExtension = file.name.split('.').pop();
        const fileName = `${timestamp}-${randomId}.${fileExtension}`;
        const filePath = join(uploadDir, fileName);

        // Save file
        await writeFile(filePath, buffer);

        // Create relative path for database storage
        const relativePath = filePath.split('public')[1];
        const mediaType = getMediaType(file.type);

        // Save to database
        const mediaRecord = await db.media.create({
          data: {
            filename: fileName,
            originalName: file.name,
            filePath: relativePath,
            fileSize: file.size,
            mimeType: file.type,
            type: mediaType,
            uploadedBy: userId
          }
        });

        uploadedFiles.push({
          id: mediaRecord.id,
          name: fileName,
          originalName: file.name,
          url: relativePath,
          size: file.size,
          type: file.type,
          mediaType: mediaType,
          uploadedAt: new Date().toISOString()
        });

      } catch (error) {
        console.error('Error uploading file:', file.name, error);
        errors.push({
          fileName: file.name,
          error: 'Failed to upload file'
        });
      }
    }

    return NextResponse.json({
      message: 'Upload process completed',
      uploadedFiles,
      errors,
      totalFiles: files.length,
      successfulUploads: uploadedFiles.length,
      failedUploads: errors.length
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}