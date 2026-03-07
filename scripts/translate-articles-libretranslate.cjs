/**
 * translate-articles-libretranslate.cjs
 *
 * Translates MDX articles from English into other locales using the
 * LibreTranslate API (public or self-hosted). No Google dependency.
 *
 * Environment:
 *   LIBRETRANSLATE_URL    Base URL (default: https://libretranslate.com)
 *   LIBRETRANSLATE_API_KEY  Optional API key (required by some instances)
 *
 * Usage:
 *   node scripts/translate-articles-libretranslate.cjs
 *   node scripts/translate-articles-libretranslate.cjs --langs=es,fr
 *   node scripts/translate-articles-libretranslate.cjs --limit=50
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const SOURCE_LANG = "en";
const DEFAULT_TARGET_LANGS = ["es", "fr", "de", "pt"];
const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const DELAY_MS = 500; // be nice to the API
const MAX_CHARS_PER_REQUEST = 4500; // chunk long text to avoid limits

const baseUrl = (process.env.LIBRETRANSLATE_URL || "https://libretranslate.com").replace(/\/$/, "");
const apiKey = process.env.LIBRETRANSLATE_API_KEY || "";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseCliArgs() {
  const options = {};
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith("--langs=")) {
      options.langs = arg.replace("--langs=", "").split(",").map((s) => s.trim()).filter(Boolean);
    } else if (arg.startsWith("--limit=")) {
      const v = Number(arg.replace("--limit=", ""));
      if (!Number.isNaN(v) && v > 0) options.limit = v;
    }
  }
  return options;
}

/**
 * Split text into chunks that fit under MAX_CHARS_PER_REQUEST, trying to break at newlines.
 */
function chunkText(text) {
  if (!text || text.length <= MAX_CHARS_PER_REQUEST) return [text].filter(Boolean);
  const chunks = [];
  let remaining = text;
  while (remaining.length > 0) {
    let chunk = remaining.slice(0, MAX_CHARS_PER_REQUEST);
    const nextStart = chunk.length;
    if (remaining.length > MAX_CHARS_PER_REQUEST) {
      const lastNewline = chunk.lastIndexOf("\n");
      if (lastNewline > MAX_CHARS_PER_REQUEST / 2) {
        chunk = chunk.slice(0, lastNewline + 1);
        remaining = remaining.slice(lastNewline + 1);
      } else {
        remaining = remaining.slice(nextStart);
      }
    } else {
      remaining = "";
    }
    if (chunk.trim()) chunks.push(chunk);
  }
  return chunks.length ? chunks : [text];
}

async function translateWithLibreTranslate(text, targetLang) {
  if (typeof text !== "string" || text.trim() === "") return text;
  const chunks = chunkText(text);
  const translatedChunks = [];
  for (const chunk of chunks) {
    const body = {
      q: chunk,
      source: SOURCE_LANG,
      target: targetLang,
      format: "text",
    };
    if (apiKey) body.api_key = apiKey;
    const res = await fetch(`${baseUrl}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`LibreTranslate ${res.status}: ${errText}`);
    }
    const data = await res.json();
    translatedChunks.push(data.translatedText || chunk);
    await sleep(DELAY_MS);
  }
  return translatedChunks.join("");
}

async function translateArticleFile(filePath, targetLang) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const baseName = path.basename(filePath);
  const slug = path.basename(filePath, ".mdx");

  const translatedData = { ...data };
  const frontmatterKeys = ["title", "excerpt", "description", "seoTitle", "seoDescription"];

  for (const key of frontmatterKeys) {
    if (data[key]) {
      translatedData[key] = await translateWithLibreTranslate(String(data[key]), targetLang);
      await sleep(DELAY_MS);
    }
  }

  const translatedContent = await translateWithLibreTranslate(content, targetLang);

  const targetDir = path.join(process.cwd(), "content", `articles-${targetLang}`);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  const outPath = path.join(targetDir, baseName);
  const output = matter.stringify(translatedContent, {
    ...translatedData,
    lang: targetLang,
    originalSlug: data.slug || slug,
    originalLang: SOURCE_LANG,
  });
  fs.writeFileSync(outPath, output, "utf8");
  console.log(`  [${targetLang}] ${baseName}`);
}

async function main() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.error("content/articles not found.");
    process.exit(1);
  }

  console.log("LibreTranslate URL:", baseUrl);
  if (apiKey) console.log("Using API key (set)"); else console.log("No API key (public instance)");

  const options = parseCliArgs();
  const targetLangs = options.langs?.length ? options.langs : DEFAULT_TARGET_LANGS;
  const allFiles = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx")).map((f) => path.join(ARTICLES_DIR, f));
  const files = typeof options.limit === "number" ? allFiles.slice(0, options.limit) : allFiles;

  console.log(`Articles: ${files.length} (of ${allFiles.length}). Languages: ${targetLangs.join(", ")}\n`);

  for (const lang of targetLangs) {
    console.log(`=== [${lang}] ===`);
    for (const filePath of files) {
      try {
        await translateArticleFile(filePath, lang);
      } catch (err) {
        console.error(`  ERROR ${path.basename(filePath)}:`, err.message);
      }
      await sleep(DELAY_MS);
    }
    console.log(`Done [${lang}]. → content/articles-${lang}\n`);
  }
  console.log("✅ Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
