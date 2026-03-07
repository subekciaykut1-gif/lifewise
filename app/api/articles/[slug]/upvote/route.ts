import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const result = await sql`
      SELECT upvotes FROM article_upvotes WHERE slug = ${slug}
    `;

    if (result.length === 0) {
      return NextResponse.json({ upvotes: 0 });
    }

    return NextResponse.json({ upvotes: result[0].upvotes });
  } catch (error) {
    console.error("Error fetching upvotes:", error);
    return NextResponse.json({ error: "Failed to fetch upvotes" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const result = await sql`
      INSERT INTO article_upvotes (slug, upvotes)
      VALUES (${slug}, 1)
      ON CONFLICT (slug)
      DO UPDATE SET upvotes = article_upvotes.upvotes + 1, updated_at = CURRENT_TIMESTAMP
      RETURNING upvotes;
    `;

    return NextResponse.json({ upvotes: result[0].upvotes });
  } catch (error) {
    console.error("Error incrementing upvote:", error);
    return NextResponse.json({ error: "Failed to increment upvote" }, { status: 500 });
  }
}
