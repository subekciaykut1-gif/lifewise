const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '..', 'content', 'articles');

const newArticles = [
  // TECHNOLOGY
  { slug: "smartphone-security-tips", title: "Essential Smartphone Security Tips Every User Needs", category: "technology" },
  { slug: "extend-laptop-battery-life", title: "How to Extend Your Laptop Battery Life Significantly", category: "technology" },
  { slug: "best-productivity-apps", title: "Best Productivity Apps to Transform Your Workflow", category: "technology" },
  { slug: "smart-home-devices-worth-it", title: "Are Smart Home Devices Actually Worth the Money?", category: "technology" },
  { slug: "stop-data-tracking-online", title: "How to Stop Apps from Tracking Your Data Online", category: "technology" },
  
  // GAMING
  { slug: "optimize-pc-for-gaming", title: "How to Optimize Your PC for Maximum Gaming Performance", category: "gaming" },
  { slug: "best-co-op-games", title: "The Best Co-Op Games to Play with Friends This Weekend", category: "gaming" },
  { slug: "gaming-setup-essentials", title: "Essential Gear for the Ultimate PC Gaming Setup", category: "gaming" },
  { slug: "prevent-gamer-neck-pain", title: "How to Prevent Neck and Back Pain During Long Gaming Sessions", category: "gaming" },
  { slug: "budget-gaming-monitor-guide", title: "The Ultimate Guide to Buying a Budget Gaming Monitor", category: "gaming" },
  
  // FINANCE
  { slug: "smart-budgeting-strategies", title: "Smart Budgeting Strategies for Complete Beginners", category: "finance" },
  { slug: "profitable-side-hustle-ideas", title: "Profitable Side Hustle Ideas You Can Start Today", category: "finance" },
  { slug: "stop-living-paycheck-to-paycheck", title: "How to Stop Living Paycheck to Paycheck", category: "finance" },
  { slug: "cut-monthly-expenses-fast", title: "10 Easy Ways to Cut Your Monthly Expenses Fast", category: "finance" },
  { slug: "build-emergency-fund", title: "How to Build a 6-Month Emergency Fund on a Low Income", category: "finance" },
];

newArticles.forEach(article => {
  const filePath = path.join(articlesDir, `${article.slug}.mdx`);
  const template = `---
title: "${article.title}"
excerpt: "Learn how to master ${article.title.toLowerCase()} with these exclusive expert tips."
category: "${article.category}"
author: "LifeWise Editors"
publishedAt: "${new Date().toISOString().split('T')[0]}T12:00:00Z"
---

This is a temporary blank shell. It will be seamlessly rewritten by the local Ollama LLM execution runtime.`;

  fs.writeFileSync(filePath, template, 'utf8');
  console.log(`Created stub: ${article.slug}.mdx [${article.category}]`);
});

console.log(`Successfully scaffolded ${newArticles.length} high-RPM placeholder articles.`);
