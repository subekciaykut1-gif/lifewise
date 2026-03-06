import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";
import { getArticleBySlug } from "@/lib/articles";
import { PINTEREST_IMAGE_WIDTH, PINTEREST_IMAGE_HEIGHT } from "@/lib/pinterestImage";

function escapeSvgText(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapTitle(title: string, maxCharsPerLine = 35): string {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if (current.length + w.length + 1 <= maxCharsPerLine) {
      current = current ? `${current} ${w}` : w;
    } else {
      if (current) lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines.join("\n");
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");

    if (!slug || !category) {
      return NextResponse.json({ error: "Missing slug or category" }, { status: 400 });
    }

    const article = await getArticleBySlug(slug, category);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const imageSrc = article.image || `https://picsum.photos/seed/${slug}/1200/630`;
    let inputBuffer: Buffer;

    if (imageSrc.startsWith("http")) {
      const res = await fetch(imageSrc);
      if (!res.ok) throw new Error("Failed to fetch image");
      const arr = await res.arrayBuffer();
      inputBuffer = Buffer.from(arr);
    } else {
      const publicPath = path.join(process.cwd(), "public", imageSrc.replace(/^\//, ""));
      const fs = await import("fs/promises");
      inputBuffer = await fs.readFile(publicPath);
    }

    const resized = await sharp(inputBuffer)
      .resize(PINTEREST_IMAGE_WIDTH, PINTEREST_IMAGE_HEIGHT, { fit: "cover", position: "center" })
      .jpeg({ quality: 85 });

    const titleLines = wrapTitle(article.title);
    const lines = titleLines.split("\n");
    const overlaySvg = `
      <svg width="${PINTEREST_IMAGE_WIDTH}" height="${PINTEREST_IMAGE_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="overlay" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="rgba(0,0,0,0.7)"/>
            <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#overlay)"/>
        <text x="${PINTEREST_IMAGE_WIDTH / 2}" y="${PINTEREST_IMAGE_HEIGHT - 100}" font-family="Georgia, serif" font-size="44" font-weight="bold" fill="white" text-anchor="middle">
          ${lines.map((line, i) => `<tspan x="${PINTEREST_IMAGE_WIDTH / 2}" dy="${i === 0 ? 0 : 52}">${escapeSvgText(line)}</tspan>`).join("")}
        </text>
      </svg>
    `;

    const overlayBuffer = Buffer.from(overlaySvg);
    const finalBuffer = await resized
      .composite([{ input: overlayBuffer, top: 0, left: 0 }])
      .png()
      .toBuffer();

    return new NextResponse(new Uint8Array(finalBuffer), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (err) {
    console.error("[pinterest-image]", err);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
