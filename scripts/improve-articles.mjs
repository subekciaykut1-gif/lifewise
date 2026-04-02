import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import http from 'http';

const ARTICLES_DIR = './content/articles';
const OLLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL = 'mistral';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let lastCallTime = 0;
const MIN_INTERVAL = 2000;

/**
 * Robust HTTP request for Ollama
 * Using basic 'http' instead of 'fetch' to have absolute control over Header timeouts.
 */
function callOllamaRaw(prompt) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: MODEL,
      prompt,
      stream: false
    });

    const options = {
      hostname: 'localhost',
      port: 11434,
      path: '/api/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 600000 // 10 minutes socket timeout
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.response);
        } catch (e) {
          reject(new Error('Invalid JSON from Ollama'));
        }
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Ollama Timeout (10m)'));
    });

    req.on('error', (e) => reject(e));
    req.write(postData);
    req.end();
  });
}

async function callOllama(prompt, retries = 2) {
  for (let i = 0; i < retries; i++) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;
    if (timeSinceLastCall < MIN_INTERVAL) {
      await sleep(MIN_INTERVAL - timeSinceLastCall);
    }
    
    try {
      const responseText = await callOllamaRaw(prompt);
      lastCallTime = Date.now();
      // Clean up "Ollama-isms" in single-line responses (Titles/Meta)
      return responseText.trim().replace(/^["']|["']$/g, '').replace(/\*\*/g, '').split('\n')[0].trim();
    } catch (error) {
      if (i === retries - 1) {
        console.error(`Ollama Error (Final Attempt):`, error.message || error);
        return null;
      }
      console.log(`  ... Connection Issue/Timeout. Retrying (${i + 2}/${retries})...`);
      await sleep(5000);
    }
  }
}

const GENERIC_TITLES = [
  "Paint a Room", "Meeting Efficiency", "Bathroom Storage", "Fridge Organization",
  "Time Blocking", "Evening Routine", "Basic Tool Kit", "Caulking Gaps", "Calendar Tips"
];

const stats = {
  total: 0,
  repaired: 0,
  expanded: [],
  titles: [],
  metaAdded: 0,
  errors: []
};

async function repairSyntax(filename) {
  try {
    const filePath = path.join(ARTICLES_DIR, filename);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data: frontmatter, content: body } = matter(fileContent);
    
    let newBody = body;
    const oldBody = body;
    
    newBody = newBody.replace(/A:\*\*\s*/g, 'A: ');
    newBody = newBody.replace(/Q:\*\*\s*/g, 'Q: ');
    
    const lines = newBody.split('\n');
    const fixedLines = lines.map(line => {
      if ((line.match(/\*\*/g) || []).length % 2 !== 0) {
        return line.replace(/(\b\w+)\*\*/g, '$1');
      }
      return line;
    });
    newBody = fixedLines.join('\n');
    
    if (newBody !== oldBody) {
      const updatedContent = matter.stringify(newBody, frontmatter);
      await fs.writeFile(filePath, updatedContent, 'utf-8');
      stats.repaired++;
    }
  } catch (err) {
    console.error(`Repair Error ${filename}:`, err);
  }
}

async function improveContent(filename) {
  try {
    const filePath = path.join(ARTICLES_DIR, filename);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data: frontmatter, content: body } = matter(fileContent);
    let newBody = body;
    let newFrontmatter = { ...frontmatter };
    let modified = false;

    stats.total++;

    // --- TASK B: Title Fix ---
    const title = frontmatter.title || "";
    const isGeneric = GENERIC_TITLES.some(gt => title.toLowerCase().includes(gt.toLowerCase()));
    if (title.length < 40 || isGeneric) {
      console.log(`[${stats.total}] ${filename} — TITLE FIX: "${title}"`);
      const prompt = `You are an SEO expert. Generate an improved blog article title that:
- Is 50-60 characters long
- Includes the main keyword naturally
- Ends with no punctuation
- Return ONLY the new title text, no quotes, no labels, no markdown.

CURRENT TITLE: ${title}
TOPIC: ${newBody.substring(0, 200)}`;
      
      const newTitle = await callOllama(prompt);
      if (newTitle) {
        // Double-check sanitization here
        const cleanTitle = newTitle.replace(/\*\*/g, '').replace(/^["']|["']$/g, '').trim();
        stats.titles.push({ file: filename, old: title, new: cleanTitle });
        newFrontmatter.title = cleanTitle;
        if (newFrontmatter.metaTitle) newFrontmatter.metaTitle = cleanTitle;
        modified = true;
      }
    }

    // --- TASK D: Meta Description ---
    if (!newFrontmatter.metaDescription || newFrontmatter.metaDescription.length < 120 || newFrontmatter.metaDescription.includes('characters)')) {
      console.log(`[${stats.total}] ${filename} — GENERATING META`);
      const prompt = `Write a meta description for this article. 
Requirements:
- Length: 150-160 characters
- Content: Natural, compelling, keyword-rich
- NO quotes, NO character counts, NO mention of length.
- Return ONLY the text of the description.

TITLE: ${newFrontmatter.title || title}
CONTENT: ${newBody.substring(0, 300)}`;

      const meta = await callOllama(prompt);
      if (meta) {
        newFrontmatter.metaDescription = meta.replace(/^["']|["']$/g, '').trim();
        stats.metaAdded++;
        modified = true;
      }
    }

    // --- TASK A: Fix thin content ---
    const wordCount = newBody.trim().split(/\s+/).length;
    if (wordCount < 600) {
      console.log(`[${stats.total}] ${filename} — ${wordCount} words — EXPANDING`);
      const prompt = `You are an expert content writer for a lifestyle blog called LifeWise.
The following article is too short and needs to be expanded to at least 800 words.

RULES:
- Keep ALL existing content exactly as is, only ADD to it
- Match the existing writing style and tone
- Add 2-3 new relevant H2/H3 sections
- Add a "Pro Tips" section specific to this article topic
- Add 2-3 more FAQ questions with detailed answers
- Write in clear, engaging, helpful English
- Return ONLY the complete improved MDX body content, nothing else

CURRENT ARTICLE TITLE: ${newFrontmatter.title || title}
CONTENT:
${newBody}`;

      let expandedBodyRaw = null;
      for (let i = 0; i < 2; i++) {
        try {
          expandedBodyRaw = await callOllamaRaw(prompt);
          if (expandedBodyRaw) break;
        } catch (error) {
          if (i === 1) console.error(`Expansion Error (Final Attempt):`, error.message || error);
          else console.log(`  ... Expansion Timeout/Issue. Retrying...`);
          await sleep(5000);
        }
      }
      
      if (expandedBodyRaw && expandedBodyRaw.length > newBody.length) {
        const expandedBody = expandedBodyRaw.trim();
        const newWordCount = expandedBody.split(/\s+/).length;
        stats.expanded.push({ file: filename, before: wordCount, after: newWordCount });
        newBody = expandedBody;
        modified = true;
      }
    }

    if (modified) {
      const updatedContent = matter.stringify(newBody, newFrontmatter);
      await fs.writeFile(filePath, updatedContent, 'utf-8');
    }
  } catch (err) {
    console.error(`Error processing ${filename}:`, err);
    stats.errors.push({ file: filename, error: err.message });
  }
}

async function run() {
  const files = (await fs.readdir(ARTICLES_DIR)).filter(f => f.endsWith('.mdx'));
  
  console.log('--- TASK C: Syntax Repair (All Files) ---');
  for (const file of files) {
    await repairSyntax(file);
  }
  console.log(`Repaired syntax in ${stats.repaired} files.\n`);

  console.log('--- TASKS B, D, A: AI Improvements (Serialized) ---');
  for (const file of files) {
    await improveContent(file);
  }

  console.log('\n--- IMPROVEMENT SUMMARY ---');
  console.log(`Total articles processed: ${stats.total}`);
  console.log(`Titles updated: ${stats.titles.length}`);
  stats.titles.forEach(t => console.log(`  - ${t.file}: ${t.old} -> ${t.new}`));
  console.log(`Meta descriptions fixed/added: ${stats.metaAdded}`);
  console.log(`Articles expanded: ${stats.expanded.length}`);
  stats.expanded.forEach(e => console.log(`  - ${e.file}: ${e.before} -> ${e.after} words`));
  if (stats.errors.length > 0) {
    console.log(`Errors encountered: ${stats.errors.length}`);
    stats.errors.forEach(e => console.log(`  - ${e.file}: ${e.error}`));
  }
}

run().catch(err => {
  console.error('TOP LEVEL ERROR:', err);
  process.exit(1);
});
