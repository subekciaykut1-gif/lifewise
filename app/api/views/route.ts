import { NextResponse } from 'next/server';
import { incrementArticleViews, getArticleViews } from '@/lib/article-views';

export async function POST(request: Request) {
  try {
    const { slug, category } = await request.json();
    
    if (!slug || !category) {
      return NextResponse.json({ error: 'Missing slug or category' }, { status: 400 });
    }

    const views = await incrementArticleViews(category, slug);
    return NextResponse.json({ success: true, views }, { status: 200 });
  } catch (error) {
    console.error('Views API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const category = searchParams.get('category');

  if (!slug || !category) {
    return NextResponse.json({ error: 'Missing slug or category' }, { status: 400 });
  }

  const views = await getArticleViews(category, slug);
  return NextResponse.json({ views }, { status: 200 });
}
