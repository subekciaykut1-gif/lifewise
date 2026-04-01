import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/site';

/**
 * Vercel Cron Job: Automatically notifies IndexNow (Bing, DuckDuckGo, etc.) about sitemap updates.
 * This runs on a schedule defined in vercel.json.
 */
export async function GET(request: Request) {
  // 1. Verify Authorization (Vercel standard)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
    return new Response('Unauthorized', { status: 401 });
  }

  const INDEXNOW_KEY = '8a7d3c9e2b4f5a1d6c8e0b7a9d2f4c6e';
  const INDEXNOW_URL = 'https://api.indexnow.org/indexnow';
  const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

  try {
    console.log(`🚀 Triggering IndexNow ping for ${SITE_URL}...`);

    const response = await fetch(INDEXNOW_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: 'wisetips.co',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: [SITEMAP_URL],
      }),
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Successfully notified IndexNow about sitemap update.',
        status: response.status,
      });
    } else {
      const errorText = await response.text();
      return NextResponse.json({
        success: false,
        message: 'IndexNow returned a non-200 status.',
        status: response.status,
        error: errorText,
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('❌ IndexNow ping failed:', error.message);
    return NextResponse.json({
      success: false,
      message: 'Failed to notify IndexNow.',
      error: error.message,
    }, { status: 500 });
  }
}
