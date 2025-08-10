import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { generateSlug, ensureUniqueSlug } from '@/lib/slug';

export async function POST(request: NextRequest) {
  try {
    const { text, type, currentId } = await request.json();

    if (!text || !type) {
      return NextResponse.json(
        { error: 'Text and type are required' },
        { status: 400 }
      );
    }

    if (!['post', 'page'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either "post" or "page"' },
        { status: 400 }
      );
    }

    // Generate base slug
    const baseSlug = generateSlug(text);

    // Get existing slugs
    let existingSlugs: string[] = [];
    
    if (type === 'post') {
      const posts = await db.post.findMany({
        where: {
          id: { not: currentId || undefined },
          slug: { contains: baseSlug }
        },
        select: { slug: true }
      });
      existingSlugs = posts.map(post => post.slug);
    } else if (type === 'page') {
      const pages = await db.page.findMany({
        where: {
          id: { not: currentId || undefined },
          slug: { contains: baseSlug }
        },
        select: { slug: true }
      });
      existingSlugs = pages.map(page => page.slug);
    }

    // Ensure uniqueness
    const uniqueSlug = ensureUniqueSlug(baseSlug, existingSlugs);

    return NextResponse.json({
      slug: uniqueSlug,
      isUnique: uniqueSlug === baseSlug,
      suggestions: existingSlugs.length > 0 ? [
        uniqueSlug,
        `${baseSlug}-2`,
        `${baseSlug}-alternative`
      ] : []
    });

  } catch (error) {
    console.error('Slug check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}