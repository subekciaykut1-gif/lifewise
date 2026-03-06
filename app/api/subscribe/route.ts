import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Server-only env var (no NEXT_PUBLIC_ prefix so it's never exposed to the browser)
    const mailchimpUrl = process.env.MAILCHIMP_URL ?? process.env.NEXT_PUBLIC_MAILCHIMP_URL;

    if (!mailchimpUrl || mailchimpUrl === '#') {
      return NextResponse.json(
        { error: 'Please configure NEXT_PUBLIC_MAILCHIMP_URL in your .env.local file to enable newsletter subscriptions.' },
        { status: 400 }
      );
    }

    // Convert standard form action to JSON API endpoint for verification
    // e.g. https://xyz.usX.list-manage.com/subscribe/post?u=123&id=456
    // into https://xyz.usX.list-manage.com/subscribe/post-json?u=123&id=456&EMAIL=test@example.com
    const jsonUrl = mailchimpUrl.replace('/subscribe/post?', '/subscribe/post-json?');
    const targetUrl = new URL(jsonUrl);
    targetUrl.searchParams.append('EMAIL', email);
    
    // Perform a JSON request instead of form encoded to get actual response data
    const res = await fetch(targetUrl.toString(), {
      method: 'GET', // Mailchimp JSON endpoints expect GET
    });

    const text = await res.text();
    // Mailchimp returns JSON, but often wrapped in a callback function if `&c=?` is used.
    // Since we didn't provide `&c=`, it might be valid JSON.
    let responseData;
    try {
      responseData = JSON.parse(text);
    } catch {
      // Fallback if parsing fails (shouldn't happen on standard endpoint)
      console.warn("Could not parse Mailchimp response:", text);
    }

    if (responseData && responseData.result === 'error') {
      // e.g. "test@example.com is already subscribed to list LifeWise."
      const cleanMessage = responseData.msg ? responseData.msg.replace(/<[^>]*>?/gm, '') : 'Subscription failed.';
      return NextResponse.json(
        { error: cleanMessage },
        { status: 400 }
      );
    }

    // Success
    console.log(`New subscriber recorded in Mailchimp: ${email}`);
    return NextResponse.json({ success: true, message: 'Subscribed successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
