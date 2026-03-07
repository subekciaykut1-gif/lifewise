import { redirect } from 'next/navigation';

export function GET() {
  // Redirect any locale-specific sitemap requests to the main sitemap
  redirect('/sitemap.xml');
}
