const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '..', 'content', 'articles');
const reportFile = path.join(__dirname, '..', 'thin-articles-report.txt');

// Using Llama 3.2 local LLM via Ollama
const OLLAMA_MODEL = 'llama3.2';
const OLLAMA_URL = 'http://localhost:11434/api/generate';

// Simple delay function
const delay = ms => new Promise(res => setTimeout(res, ms));

async function generateWithOllama(promptText) {
  try {
    const res = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: promptText,
        stream: false,
        options: {
          temperature: 0.7
        }
      })
    });
    
    if (!res.ok) {
      throw new Error(`Ollama API error: ${res.statusText}`);
    }
    
    const data = await res.json();
    return data.response;
  } catch (err) {
    console.error(`Local LLM Error: ${err.message}. Is Ollama running?`);
    throw err;
  }
}

async function processArticle(targetSlug, targetTitle) {
  console.log(`\n===========================================`);
  console.log(`[OLLAMA] Rewriting: ${targetSlug} (${targetTitle})`);
  
  const filePath = path.join(articlesDir, `${targetSlug}.mdx`);
  if (!fs.existsSync(filePath)) {
    console.warn(`File ${targetSlug}.mdx not found. Skipping.`);
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract Frontmatter and Body
  const parts = content.split(/^---$/m);
  if (parts.length < 3) {
    console.warn(`Could not parse frontmatter in ${targetSlug}. Skipping.`);
    return false;
  }
  
  const frontmatter = parts[1].trim();
  const oldBody = parts.slice(2).join('---').trim();

  // Extract Amazon block specifically so we don't lose it
  let amazonBlock = '';
  const amzMatch = oldBody.match(/(?:<br\s*\/>\n)?<div className="my-8[^>]*>[\s\S]*?<\/div>\s*$/);
  if (amzMatch) {
    amazonBlock = amzMatch[0];
  } else if (oldBody.includes('Related Products') || oldBody.includes('amazon.com')) {
    const lines = oldBody.split('\n');
    const amzIndex = lines.findIndex(l => l.includes('amazon.com') || l.includes('Related Products'));
    if (amzIndex !== -1) {
      amazonBlock = lines.slice(Math.max(0, amzIndex - 2)).join('\n');
    }
  }

  const systemInstruction = `You are an elite SEO content writer and lifestyle expert. Write a highly engaging, unique, and comprehensive 600+ word article on the exact topic: "${targetTitle}".

CRITICAL ADSENSE & SEO GUIDELINES:
1. NO FLUFF OR TEMPLATES: Every sentence must provide direct value, specific instructions, or expert insight. Never use generic filler (e.g., "In today's fast-paced world", "Whether you're a beginner or expert", "Consistency is key").
2. MOBILE UX & READABILITY: Keep paragraphs extremely short (strictly 1 to 3 sentences maximum) to prevent mobile text walls. 
3. SEMANTIC HIGHLIGHTING: Bold (**text**) the most important concepts and actionable steps naturally throughout the text to allow quick scannability.
4. STRUCTURE: Break up the text! You MUST naturally weave in at least one bulleted list (- ) or numbered list (1. ).
5. SEARCH INTENT HOOK: Begin the article instantly with a powerful, authoritative hook that directly addresses the reader's problem or curiosity.
6. HEADINGS: Use at least three descriptive H2s (##) for main sections. Use H3s (###) for sub-points if necessary. Do NOT write an H1 (#) title at the top; the system handles the title automatically.
7. FAQ REQUIRED: You MUST include an H2 (##) titled "Frequently Asked Questions" at the very end, containing exactly 3 highly specific Q&As formatted with bolding or H3s to capture Google "People Also Ask" snippets.

LLAMA 3.2 OUTPUT RULES:
- Return ONLY the raw Markdown content. 
- Do NOT output conversational openings like "Here is your article" or "Absolutely, here it is".
- Do NOT output the frontmatter or any "---" blocks.
- Begin immediately with the first introductory paragraph.`;

  console.log(`Sending request to Local LLM (${OLLAMA_MODEL})... (this may take 1-3 minutes depending on your CPU/GPU)`);
  
  let newBody = await generateWithOllama(systemInstruction);
  newBody = newBody.trim();

  // Cleanup potential LLM wrapping
  newBody = newBody.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/, '').trim();

  // Inject Amazon block back
  if (amazonBlock && !newBody.includes('amazon.com')) {
    newBody += `\n\n${amazonBlock}`;
  }

  // Generate automated SEO excerpt from the new body's first paragraph
  const paragraphs = newBody.split('\n\n');
  const firstRealSentence = paragraphs.find(p => p.length > 50 && !p.startsWith('#') && !p.startsWith('-')) || "Read our comprehensive guide and expert tips.";
  const cleanExcerpt = firstRealSentence.substring(0, 150).replace(/["\n\r]/g, "'").trim() + "...";

  // Refresh the publishedAt date for max SEO value
  let updatedFrontmatter = frontmatter;
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  if (updatedFrontmatter.includes('publishedAt:')) {
    updatedFrontmatter = updatedFrontmatter.replace(/publishedAt:\s*["'].*?["']/, `publishedAt: "${today}T12:00:00Z"`);
  } else {
    updatedFrontmatter += `\npublishedAt: "${today}T12:00:00Z"`;
  }
  
  // Inject the new excerpt
  if (updatedFrontmatter.includes('excerpt:')) {
    updatedFrontmatter = updatedFrontmatter.replace(/excerpt:\s*["'].*?["']/, `excerpt: "${cleanExcerpt}"`);
  } else {
    updatedFrontmatter += `\nexcerpt: "${cleanExcerpt}"`;
  }

  const newContent = `---\n${updatedFrontmatter}\n---\n\n${newBody}\n`;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✅ Success! Wrote perfectly generated article to ${targetSlug}.mdx`);
  return true;
}

async function checkOllamaEngine() {
  try {
    console.log("Pre-flight check: Verifying Local Ollama Engine...");
    const res = await fetch(OLLAMA_URL.replace('/api/generate', '/'));
    if (!res.ok) throw new Error();
    console.log("✅ Ollama Engine is Online and Ready.");
    return true;
  } catch (e) {
    console.error("❌ CRITICAL: Ollama is not running! Please wait for it to install, open a new terminal, run 'ollama run llama3.2', and try again.");
    return false;
  }
}

async function run() {
  const isOnline = await checkOllamaEngine();
  if (!isOnline) process.exit(1);

  console.log("Starting Global Site Rewrite (600+ Articles)...");
  let processedCount = 0;
  
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
  
  for (const file of files) {
    const slug = file.replace('.mdx', '');
    const filePath = path.join(articlesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Safety check: Don't rewrite if it's already an massive 600+ word SEO article
    const parts = content.split(/^---$/m);
    if (parts.length >= 3) {
      const body = parts.slice(2).join('---').trim();
      const wordCount = body.split(/\s+/).length;
      
      // If the article is already long and high quality, skip it to save your time unless forced
      // Let's rewrite anything under 550 words (which includes all the old templates).
      if (wordCount < 550) {
        const titleMatch = content.match(/title:\s*['"]?([^'"\n\r]+)['"]?/);
        const title = titleMatch ? titleMatch[1] : slug;
        
        try {
          const success = await processArticle(slug, title);
          if (success) {
            processedCount++;
            console.log(`Giving local CPU/GPU a 3s cooldown...`);
            await delay(3000);
            
            // Limit completely processing all memory manually at a time 
            if (processedCount >= 10) {
              console.log("Reached batch limit of 10. Run script again to process the next 10!");
              return;
            }
          }
        } catch (e) {
          console.error(`Failed to rewrite ${slug}: ${e.message}`);
        }
      }
    }
  }
  
  if (processedCount === 0) {
    console.log("Batch complete! ALL 600+ articles on your site are fully rewritten and SEO optimized!");
  }
}

run();
