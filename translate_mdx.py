#!/usr/bin/env python3
import sys
sys.stdout.reconfigure(encoding='utf-8')

"""
Translate MDX files using LibreTranslate API.
- Reads .mdx from content/articles (or CONTENT_DIR)
- Translates to es, fr, pt, de
- Protects: code blocks, inline code, JSX tags, URLs
- Saves to content/{lang}/filename.mdx
- Skips existing files (resumable). Logs failures to failed.log
"""

import re
import time
import json
import urllib.request
import urllib.error
from pathlib import Path

print("Starting...", flush=True)

# Config
CONTENT_DIR = Path(__file__).resolve().parent / "content" / "articles"
OUTPUT_BASE = Path(__file__).resolve().parent / "content"
API_URL = "http://127.0.0.1:5000/translate"
SOURCE_LANG = "en"
TARGET_LANGS = ["es", "fr", "pt", "de"]
DELAY_SEC = 0.3
FAILED_LOG = Path(__file__).resolve().parent / "failed.log"


def translate_text(text: str, target_lang: str) -> str:
    """Call LibreTranslate API. POST JSON body. Returns translated text or raises."""
    if not text or not text.strip():
        return text
    data = json.dumps({
        "q": text,
        "source": "en",
        "target": target_lang,
        "format": "text"
    }).encode("utf-8")

    req = urllib.request.Request(
        API_URL,
        data=data,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode())["translatedText"]


def protect_and_translate_body(body: str, target_lang: str) -> str:
    """Replace protected regions with placeholders, translate, restore."""
    placeholders = []
    count = [0]  # use list to allow mutation in nested function

    def save_placeholder(match):
        placeholders.append(match.group(0))
        idx = count[0]
        count[0] += 1
        return f"___PH_{idx}___"

    # 1. Code blocks (triple backticks)
    text = re.sub(r"```[\s\S]*?```", save_placeholder, body)
    # 2. Inline code (single backticks, not already part of ```)
    text = re.sub(r"`[^`\n]+`", save_placeholder, text)
    # 3. URLs
    text = re.sub(r"https?://[^\s\)\]\"']+", save_placeholder, text)
    # 4. Self-closing JSX/HTML tags
    text = re.sub(r"<[A-Za-z][\w\-]*[^>]*/>", save_placeholder, text)
    # 5. Paired tags (innermost first): <Tag>content</Tag> where content has no <
    while True:
        m = re.search(r"<([A-Za-z][\w\-]*)[^>]*>([^<]*)</\1>", text)
        if not m:
            break
        placeholders.append(m.group(0))
        idx = count[0]
        count[0] += 1
        text = text[: m.start()] + f"___PH_{idx}___" + text[m.end() :]
    # 6. Remaining tags (e.g. <Tag attr="x">)
    text = re.sub(r"<[A-Za-z][^>]*>", save_placeholder, text)
    text = re.sub(r"</[A-Za-z][^>]*>", save_placeholder, text)

    # Translate in chunks if very long (LibreTranslate may have limits)
    max_chunk = 4000
    if len(text) <= max_chunk:
        translated = translate_text(text, target_lang)
    else:
        parts = []
        rest = text
        while rest:
            chunk = rest[:max_chunk]
            last_br = chunk.rfind("\n")
            if last_br > max_chunk // 2:
                chunk = rest[: last_br + 1]
                rest = rest[last_br + 1 :]
            else:
                rest = rest[len(chunk) :]
            if chunk.strip():
                parts.append(translate_text(chunk, target_lang))
            else:
                parts.append(chunk)
        translated = "".join(parts)

    # Restore placeholders
    for i, orig in enumerate(placeholders):
        translated = translated.replace(f"___PH_{i}___", orig, 1)
    return translated


def translate_frontmatter_value(val):
    """Recursively translate string values in frontmatter (keys unchanged)."""
    if isinstance(val, str) and val.strip():
        return val  # caller will translate with API
    if isinstance(val, list):
        return [translate_frontmatter_value(v) for v in val]
    if isinstance(val, dict):
        return {k: translate_frontmatter_value(v) for k, v in val.items()}
    return val


def parse_frontmatter(raw: str):
    """Return (frontmatter_dict, body). Frontmatter is between first --- and second ---."""
    raw = raw.lstrip()
    if not raw.startswith("---"):
        return None, raw
    end = raw.index("---", 3)  # after first ---
    fm_raw = raw[3:end].strip()
    body = raw[end + 3 :].lstrip()
    fm = {}
    lines = fm_raw.split("\n")
    i = 0
    while i < len(lines):
        line = lines[i]
        m = re.match(r"^([a-zA-Z_][\w\-]*):\s*(.*)$", line)
        if m:
            key, rest = m.group(1), m.group(2).strip()
            if rest in ("", ">-", "|", ">- ", "| ") or (rest and rest[0] in ">|"):
                block = []
                i += 1
                while i < len(lines) and (lines[i].startswith("  ") or lines[i].strip() == ""):
                    block.append(lines[i])
                    i += 1
                full = "\n".join(block)
                # List of items?
                if re.match(r"^(\s*-\s*.+)(\n\s*-\s*.+)*", full):
                    fm[key] = re.findall(r"-\s*(.+)", full)
                else:
                    fm[key] = full.strip()
                continue
            if rest.startswith("["):
                fm[key] = rest
                i += 1
                continue
            if rest.startswith("'") or rest.startswith('"'):
                fm[key] = rest
                i += 1
                continue
            fm[key] = rest
        i += 1
    return fm, body


def dump_frontmatter(fm: dict) -> str:
    """Write frontmatter back to string (simple)."""
    lines = ["---"]
    for k, v in fm.items():
        if isinstance(v, list):
            lines.append(f"{k}:")
            for item in v:
                lines.append(f"  - {item}")
        elif isinstance(v, str) and "\n" in v:
            lines.append(f"{k}: >-")
            for line in v.split("\n"):
                lines.append(f"  {line}")
        else:
            s = str(v)
            if ":" in s or s.startswith("#"):
                lines.append(f'{k}: "{s}"')
            else:
                lines.append(f"{k}: {s}")
    lines.append("---")
    return "\n".join(lines)


# Keys we translate (human text). Skip: date, readTime, image, featured, mostRead, etc.
TEXT_KEYS = {"title", "excerpt", "description", "seoTitle", "seoDescription"}


def translate_frontmatter(fm: dict, target_lang: str) -> dict:
    """Translate only string values for text keys; leave keys and non-text as-is."""
    out = {}
    for key, val in fm.items():
        if key not in TEXT_KEYS and key not in ("tags", "keywords"):
            out[key] = val
            continue
        if isinstance(val, str) and val.strip() and not val.startswith(("http", "[", "{", "'")):
            try:
                out[key] = translate_text(val, target_lang)
                time.sleep(DELAY_SEC)
            except Exception as e:
                out[key] = val
                log_failure("(frontmatter)", key, target_lang, str(e))
        elif isinstance(val, list):
            out[key] = []
            for item in val:
                if isinstance(item, str) and item.strip():
                    try:
                        out[key].append(translate_text(item, target_lang))
                        time.sleep(DELAY_SEC)
                    except Exception as e:
                        out[key].append(item)
                        log_failure("(frontmatter)", f"{key}.item", target_lang, str(e))
                else:
                    out[key].append(item)
        else:
            out[key] = val
    return out


def log_failure(filename: str, context: str, lang: str, err: str):
    with open(FAILED_LOG, "a", encoding="utf-8") as f:
        f.write(f"{filename} | {context} | {lang} | {err}\n")


def process_file(mdx_path: Path, target_lang: str, total: int, index: int) -> bool:
    """Translate one file to target_lang. Return True if ok."""
    out_dir = OUTPUT_BASE / target_lang
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / mdx_path.name
    if out_path.exists() and out_path.stat().st_mtime >= mdx_path.stat().st_mtime:
        print(f"  [{index}/{total}] {mdx_path.name} -> {target_lang} (skip, up-to-date)", flush=True)
        return True

    raw = mdx_path.read_text(encoding="utf-8", errors="replace")
    fm, body = parse_frontmatter(raw)
    if fm is None:
        # No frontmatter: treat whole file as body
        fm = {}
        body = raw

    try:
        fm_trans = translate_frontmatter(fm, target_lang)
        time.sleep(DELAY_SEC)
        body_trans = protect_and_translate_body(body, target_lang)
    except Exception as e:
        log_failure(mdx_path.name, "translate", target_lang, str(e))
        print(f"  [{index}/{total}] {mdx_path.name} -> {target_lang} FAIL ({e})", flush=True)
        return False

    out_content = dump_frontmatter(fm_trans) + "\n\n" + body_trans
    out_path.write_text(out_content, encoding="utf-8")
    print(f"  [{index}/{total}] {mdx_path.name} -> {target_lang} OK", flush=True)
    return True


def main():
    try:
        if not CONTENT_DIR.exists():
            print(f"Content dir not found: {CONTENT_DIR}", flush=True)
            return
        mdx_files = sorted(CONTENT_DIR.glob("*.mdx"))
        total = len(mdx_files)
        print(f"Found {total} files", flush=True)
        print(f"Found {total} MDX files in {CONTENT_DIR}", flush=True)
        print(f"Output: {OUTPUT_BASE}/{{es,fr,pt,de}}/", flush=True)
        print(f"API: {API_URL}", flush=True)
        print(flush=True)

        for lang in TARGET_LANGS:
            (OUTPUT_BASE / lang).mkdir(parents=True, exist_ok=True)
            for i, path in enumerate(mdx_files, 1):
                process_file(path, lang, total, i)
                time.sleep(DELAY_SEC)
            print(f"  Done {lang}.\n", flush=True)

        print("Done.", flush=True)
    except Exception as e:
        import traceback
        print("ERROR:", flush=True)
        traceback.print_exc()
        raise


if __name__ == "__main__":
    main()
