require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

if (!process.env.GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY in environment variables.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const reportPath = path.join(__dirname, '..', 'thin-articles-report.txt');
const articlesDir = path.join(__dirname, '..', 'content', 'articles');

async function main() {
  const reportLines = fs.readFileSync(reportPath, 'utf8').split('\n');
  const targets = [];
  
  for (let i = 0; i < reportLines.length; i++) {
    const line = reportLines[i];
    if (line.includes('[TEMPLATE_SHELL]')) {
      const slug = line.split(' | ')[0].trim();
      const category = line.split(' | ')[1].trim();
      targets.push({ slug, category, lineIndex: i, originalLine: line });
    }
  }

  console.log(`Found ${targets.length} articles to rewrite.`);

  for (const target of targets) {
    console.log(`Rewriting ${target.slug}...`);
    const filePath = path.join(articlesDir, target.slug + '.mdx');
    if (!fs.existsSync(filePath)) {
      console.log(`File missing: ${filePath}`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    
    const fmMatch = content.match(/^(---[\s\S]*?---)/);
    const frontmatter = fmMatch ? fmMatch[1] : '';
    
    const titleMatch = frontmatter.match(/title:\s*['"]?([^'"\n]+)['"]?/);
    const title = titleMatch ? titleMatch[1].trim() : target.slug;
    
    const affMatch = content.match(/(### \[.*\][\s\S]*?wisetips-20\))/);
    const affiliate = affMatch ? affMatch[1] : '';

    const prompt = `You are rewriting a lifestyle article for an online magazine.
Topic/Title: "${title}"
Category: "${target.category}"

Target length: Minimum 450 words, target 550-700 words.

Structure guidelines (use this exact Markdown layout):
[Opening paragraph — 40–60 words] Hook the reader with a specific problem or surprising fact related to "${title}". Do NOT start with "In this article" or "Today we'll cover".
## [Specific H2 Topic 1 related to ${title}]
[80-100 words core insight #1]
## [Specific H2 Topic 2 related to ${title}]
[80-100 words core insight #2]
## [Specific H2 Topic 3 related to ${title}]
[80-100 words core insight #3]
## Common Mistakes to Avoid
[60-80 words, 2-3 bullet points of real mistakes]
## Quick Tips
[40-60 words, 3-4 bullet points of actionable specific tips]
## Frequently Asked Questions
### [Realistic specific Question 1 about ${title}]
[30-50 words answer]
### [Realistic specific Question 2 about ${title}]
[30-50 words answer]

[Closing paragraph - 30-40 words] Encourage action.

Tone Rules:
- Conversational but credible. Use "you" directly. Be highly specific. No filler phrases.
- DO NOT use the phrases: "Consistency beats intensity", "doesn't always require expensive tools", "Pick one area to focus on this week".
- DO NOT output any frontmatter, JSON, or any affiliate blocks. Only output the pure markdown body content based on the layout structure above.`;

    let success = false;
    let retries = 0;
    
    while (!success && retries < 5) {
      try {
        const result = await model.generateContent(prompt);
        let newBody = result.response.text().trim();
        
        if (newBody.startsWith('\`\`\`markdown')) {
          newBody = newBody.replace(/^```markdown/i, '').replace(/```$/, '').trim();
        } else if (newBody.startsWith('\`\`\`')) {
          newBody = newBody.replace(/^```/, '').replace(/```$/, '').trim();
        }
        
        const wordCount = newBody.split(/\s+/).length;
        
        if (wordCount < 300) {
          console.log(`Failed quality check for ${target.slug} (Words: ${wordCount} - too short). Skipping.`);
          success = true; // Don't retry logic failure
          continue;
        }
        if (newBody.includes("Consistency beats intensity") || newBody.includes("doesn't always require expensive tools")) {
           console.log(`Failed quality check for ${target.slug} - used banned template phrases. Skipping.`);
           success = true;
           continue;
        }
        
        const fullContent = `${frontmatter}\n\n${newBody}\n\n${affiliate}`.trim() + '\n';
        fs.writeFileSync(filePath, fullContent, 'utf8');
        
        let currentReport = fs.readFileSync(reportPath, 'utf8').split('\n');
        currentReport[target.lineIndex] = `${target.slug} | ${target.category} | ${wordCount + 60} words [REWRITTEN]`; 
        fs.writeFileSync(reportPath, currentReport.join('\n'), 'utf8');
        
        console.log(`--> Successfully rewrote ${target.slug} (${wordCount} body words)`);
        success = true;
        
      } catch (e) {
        if (e.message.includes('429') || e.message.includes('quota') || e.message.includes('fetch')) {
          const waitTime = 15000 + (retries * 10000);
          console.error(`Rate limited or fetch error on ${target.slug}. Retrying in ${waitTime/1000}s...`);
          await new Promise(r => setTimeout(r, waitTime));
          retries++;
        } else {
          console.error(`Fatal error rewriting ${target.slug}:`, e.message);
          success = true; // Break loop
        }
      }
    }

    // 4.5 second delay to strictly respect 15 RPM Free Tier limit
    await new Promise(r => setTimeout(r, 4500));
  }
  
  console.log('All target articles have been processed!');
}

main().catch(console.error);
