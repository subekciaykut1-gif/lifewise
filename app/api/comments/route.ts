import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { auth } from '@/lib/auth';

/** 
 * GET /api/comments?slug=article-slug 
 * Fetch all comments for a specific article, joined with user info
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Missing article slug' }, { status: 400 });
  }

  try {
    // Join comments with users to get author details (name, image)
    const comments = await sql`
      SELECT 
        c.id, 
        c.content, 
        c.created_at, 
        u.name as author_name, 
        u.image as author_image
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.article_slug = ${slug}
      ORDER BY c.created_at DESC
    `;
    
    return NextResponse.json({ comments });
  } catch (e) {
    console.error('Error fetching comments:', e);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

/** 
 * POST /api/comments
 * body: { slug, content }
 * Create a new comment for an article (Protected)
 */
export async function POST(request: Request) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug, content } = await request.json();

    if (!slug || !content || content.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const rows = await sql`
      INSERT INTO comments (article_slug, user_id, content)
      VALUES (${slug}, ${session.user.id}, ${content.trim()})
      RETURNING id, content, created_at
    `;
    
    // Return the new comment with user info for optimistic UI updates
    return NextResponse.json({ 
      comment: {
        ...rows[0],
        author_name: session.user.name,
        author_image: session.user.image
      } 
    });
  } catch (e) {
    console.error('Error posting comment:', e);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
