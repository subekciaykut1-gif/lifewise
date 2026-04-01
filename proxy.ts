import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  // Allow next-intl to handle localized routing
  
  // Apply next-intl middleware for other routes
  return createMiddleware(routing)(request);
}

export const config = {
  // Match only internationalized pathnames — skip api, static files, etc.
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(de|en|es|fr|pt)/:path*",
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    // Explicitly exclude sitemap.xml and all sitemap files from locale handling
    "/((?!_next|_vercel|api|favicon.ico|icon.png|robots.txt|sitemap\\.xml|sitemap/|feed|.*\\..*).*)"]
};
