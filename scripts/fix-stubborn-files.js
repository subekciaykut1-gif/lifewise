/**
 * fix-stubborn-files.js
 * Surgically rewrites the frontmatter of files that still have broken excerpts.
 * Reads the raw file bytes, finds the excerpt line by regex, and replaces it.
 */
const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '..', 'content', 'articles');

const FIXES = {
  '28sqm-family-of-four.mdx': {
    title: 'Family of Four Lives in 28 Square Meters',
    excerpt: 'A family of four lives in just 28 square meters. Discover their clever floor plan, storage hacks, and minimalist lifestyle secrets...',
    category: 'viral-stories',
    date: '2026-04-02',
  },
  'anti-inflammatory-foods.mdx': {
    title: 'Anti-Inflammatory Foods',
    excerpt: 'Discover the top anti-inflammatory foods that reduce chronic pain, boost energy, and improve your health with expert-backed nutrition advice...',
    category: 'health',
    date: '2026-05-01',
  },
  'airline-kindness.mdx': {
    title: 'Passenger Gives Up Business Class Seat to Exhausted Nurse',
    excerpt: 'A heartwarming story of kindness at 30,000 feet. One passenger changed a nurses life with a simple, selfless act aboard a transatlantic flight...',
    category: 'viral-stories',
    date: '2026-04-10',
  },
};

for (const [filename, fix] of Object.entries(FIXES)) {
  const filePath = path.join(articlesDir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filename}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Find the position of first --- and second ---
  const fmStart = content.indexOf('---');
  const fmEnd = content.indexOf('---', fmStart + 3);
  
  if (fmStart === -1 || fmEnd === -1) {
    console.log(`⚠️  No frontmatter found in ${filename}`);
    continue;
  }

  const body = content.slice(fmEnd + 3);

  // Build a clean frontmatter
  // Extract what we can from the existing broken FM
  const existingFM = content.slice(fmStart + 3, fmEnd);
  
  const pub = (existingFM.match(/publishedAt:\s*["']?([^\n"']+)["']?/) || [])[1] || '2026-03-28T12:00:00Z';
  const readTime = (existingFM.match(/readTime:\s*(\d+)/) || [])[1] || '5';
  const image = (existingFM.match(/image:\s*>-\s*\n\s*(.+)/) || [])[1] || '';
  const pubActual = pub.trim();

  const newFM = `---
title: "${fix.title}"
excerpt: "${fix.excerpt}"
category: ${fix.category}
tags:
  - ${fix.category}
  - tips
  - guide
date: '${fix.date}'
publishedAt: "${pubActual.includes('T') ? pubActual : pubActual + 'T12:00:00Z'}"
readTime: ${readTime}
${image ? `image: >-\n  ${image}` : ''}
featured: false
mostRead: false
---`;

  const newContent = newFM + body;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✅ Fixed: ${filename}`);
}

console.log('\n🎉 Stubborn files patched!');
