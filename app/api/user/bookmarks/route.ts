import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { sql } from "@/lib/db";

// GET all bookmarks for the logged-in user
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    // If slug is provided, check if specific article is bookmarked
    if (slug) {
      const result = await sql`
        SELECT 1 FROM user_bookmarks 
        WHERE user_id = ${session.user.id} AND article_slug = ${slug}
      `;
      return NextResponse.json({ isBookmarked: result.length > 0 });
    }

    // Otherwise return all bookmarked slugs for this user
    const result = await sql`
      SELECT article_slug, created_at FROM user_bookmarks 
      WHERE user_id = ${session.user.id}
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ bookmarks: result });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json({ error: "Failed to fetch bookmarks" }, { status: 500 });
  }
}

// POST to add or remove a bookmark
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { slug, action } = body;

    if (!slug || !action || !["add", "remove"].includes(action)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (action === "add") {
      await sql`
        INSERT INTO user_bookmarks (user_id, article_slug)
        VALUES (${session.user.id}, ${slug})
        ON CONFLICT (user_id, article_slug) DO NOTHING;
      `;
      return NextResponse.json({ success: true, action: "added" });
    } else {
      await sql`
        DELETE FROM user_bookmarks
        WHERE user_id = ${session.user.id} AND article_slug = ${slug};
      `;
      return NextResponse.json({ success: true, action: "removed" });
    }
  } catch (error) {
    console.error("Error modifying bookmark:", error);
    return NextResponse.json({ error: "Failed to modify bookmark" }, { status: 500 });
  }
}
