import { NextRequest, NextResponse } from "next/server";
import { getArticleBySlug } from "@/lib/articles";
import { createPin, isPinterestConfigured } from "@/lib/pinterest";
import { getPinterestImageUrl } from "@/lib/pinterestImage";
import { SITE_URL } from "@/lib/site";

export async function POST(request: NextRequest) {
  try {
    if (!isPinterestConfigured()) {
      return NextResponse.json(
        { error: "Pinterest is not configured. Set PINTEREST_APP_ID and PINTEREST_ACCESS_TOKEN." },
        { status: 503 }
      );
    }

    const boardId = process.env.PINTEREST_BOARD_ID;
    if (!boardId) {
      return NextResponse.json(
        { error: "PINTEREST_BOARD_ID is not set. Add it to .env.local for auto-publish." },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const slug = body.slug ?? request.nextUrl.searchParams.get("slug");
    const category = body.category ?? request.nextUrl.searchParams.get("category");
    const targetBoardId = body.board_id ?? boardId;

    if (!slug || !category) {
      return NextResponse.json(
        { error: "Missing slug or category. Send JSON: { slug, category } or query params." },
        { status: 400 }
      );
    }

    const article = getArticleBySlug(slug, category);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const articleUrl = `${SITE_URL.replace(/\/$/, "")}/${category}/${slug}`;
    const imageUrl = getPinterestImageUrl(article, SITE_URL);

    const pin = await createPin({
      boardId: targetBoardId,
      title: article.title,
      description: article.excerpt || article.title,
      imageUrl,
      articleUrl,
    });

    return NextResponse.json({
      success: true,
      pin_id: pin.id,
      link: pin.link,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create pin";
    console.error("[pinterest/publish]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
