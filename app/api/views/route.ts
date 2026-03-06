import { NextResponse } from 'next/server';
import { incrementArticleViews } from '@/lib/article-views';

export async function POST(request: Request) {
  try {
    const { slug, category } = await request.json();
    
    if (!slug || !category) {
      return NextResponse.json({ error: 'Missing slug or category' }, { status: 400 });
    }

    const views = incrementArticleViews(category, slug);
    return NextResponse.json({ success: true, views }, { status: 200 });
  } catch (error) {
    console.error('Views API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
