const https = require('https');
const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync('data/affiliate-products.json', 'utf8'));

async function check(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const isBroken = res.statusCode === 404 || body.includes('Sorry, we couldn\'t find that page') || body.includes('dog of Amazon');
        resolve({ url, status: res.statusCode, isBroken });
      });
    }).on('error', () => resolve({ url, status: 'ERROR', isBroken: true }));
  });
}

async function run() {
  console.log("Checking products...");
  for (const p of products) {
    if (!p.active) continue;
    const result = await check(p.url);
    if (result.isBroken) {
      console.log(`❌ BROKEN: ${p.label} (${p.url}) - Status: ${result.status}`);
    } else {
      console.log(`✅ OK: ${p.label}`);
    }
  }
}

run();
