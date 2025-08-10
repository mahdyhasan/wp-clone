/**
 * Slug utility functions for WordPress-style permalinks
 */

/**
 * Convert a string to a URL-friendly slug
 * @param text The text to convert to slug
 * @returns URL-friendly slug string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Ensure a slug is unique by adding a suffix if needed
 * @param baseSlug The base slug to check
 * @param existingSlugs Array of existing slugs to check against
 * @returns Unique slug
 */
export function ensureUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

/**
 * Generate a permalink based on post/page data and permalink structure
 * @param type Content type ('post' or 'page')
 * @param slug The slug of the content
 * @returns Full permalink URL
 */
export function generatePermalink(
  type: 'post' | 'page',
  slug: string
): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  
  // Both posts and pages use simple slug-based URLs
  return `${baseUrl}/${slug}/`;
}

/**
 * Parse a permalink to extract slug and other information
 * @param permalink The full permalink URL
 * @param type Content type ('post' or 'page')
 * @returns Object containing extracted information
 */
export function parsePermalink(permalink: string, type: 'post' | 'page') {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const path = permalink.replace(baseUrl, '').replace(/^\//, '').replace(/\/$/, '');
  
  // Both posts and pages use simple slug-based URLs
  return {
    slug: path,
    type: type
  };
}

/**
 * Validate a slug format
 * @param slug The slug to validate
 * @returns True if slug is valid
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length > 0;
}