import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

const VALID_EMOJIS = ['❤️', '💡', '😂', '🔥'];

/** GET /api/reactions?category=food&slug=article-slug */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const slug = searchParams.get('slug');

  if (!category || !slug) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  }

  try {
    const rows = await sql`
      SELECT emoji, count FROM article_reactions
      WHERE category = ${category} AND slug = ${slug}
    `;
    // Build a full map with 0 for emojis not yet voted on
    const reactions: Record<string, number> = {};
    for (const emoji of VALID_EMOJIS) reactions[emoji] = 0;
    for (const row of rows) reactions[row.emoji] = row.count;
    return NextResponse.json({ reactions });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}

/** POST /api/reactions  body: { category, slug, emoji } */
export async function POST(request: Request) {
  try {
    const { category, slug, emoji } = await request.json();

    if (!category || !slug || !VALID_EMOJIS.includes(emoji)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const rows = await sql`
      INSERT INTO article_reactions (category, slug, emoji, count)
      VALUES (${category}, ${slug}, ${emoji}, 1)
      ON CONFLICT (category, slug, emoji)
      DO UPDATE SET count = article_reactions.count + 1
      RETURNING count
    `;
    return NextResponse.json({ count: rows[0].count });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
