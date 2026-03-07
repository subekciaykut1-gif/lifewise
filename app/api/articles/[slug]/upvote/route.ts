import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const result = await sql`
      SELECT upvotes FROM article_upvotes WHERE slug = ${params.slug}
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
  { params }: { params: { slug: string } }
) {
  try {
    // Upsert the upvote count (increase by 1)
    const result = await sql`
      INSERT INTO article_upvotes (slug, upvotes)
      VALUES (${params.slug}, 1)
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
