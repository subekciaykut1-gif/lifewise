/**
 * translate-messages.cjs
 *
 * Uses google-translate-api-x (free, no API key) to auto-translate
 * the messages/en.json UI dictionary into all other supported languages.
 *
 * Run once: node scripts/translate-messages.cjs
 */
const fs = require("fs");
const path = require("path");
const translate = require("google-translate-api-x");

const SOURCE_LANG = "en";
const TARGET_LANGS = ["es", "fr", "de", "pt"];
const MESSAGES_DIR = path.join(__dirname, "..", "messages");
const DELAY_MS = 200; // polite rate-limiter

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function translateValue(text, targetLang) {
  if (typeof text !== "string" || text.trim() === "") return text;
  try {
    const result = await translate(text, { from: SOURCE_LANG, to: targetLang });
    return result.text;
  } catch (err) {
    console.error(`  Error translating "${text}" to ${targetLang}:`, err.message);
    return text; // Fall back to English on error
  }
}

async function translateObject(obj, targetLang) {
  const translated = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === "object" && value !== null) {
      translated[key] = await translateObject(value, targetLang);
    } else {
      translated[key] = await translateValue(value, targetLang);
      await sleep(DELAY_MS);
    }
  }
  return translated;
}

async function main() {
  const sourceFile = path.join(MESSAGES_DIR, `${SOURCE_LANG}.json`);
  const sourceMessages = JSON.parse(fs.readFileSync(sourceFile, "utf-8"));

  for (const lang of TARGET_LANGS) {
    const targetFile = path.join(MESSAGES_DIR, `${lang}.json`);

    // Skip if already exists — run with --force to overwrite
    if (fs.existsSync(targetFile) && !process.argv.includes("--force")) {
      console.log(`[${lang}] Already exists, skipping. (use --force to overwrite)`);
      continue;
    }

    console.log(`\n[${lang}] Translating UI messages...`);
    const translatedMessages = await translateObject(sourceMessages, lang);
    fs.writeFileSync(targetFile, JSON.stringify(translatedMessages, null, 2), "utf-8");
    console.log(`[${lang}] ✓ Saved to messages/${lang}.json`);
  }

  console.log("\n✅ All UI messages translated successfully!");
}

main().catch(console.error);
