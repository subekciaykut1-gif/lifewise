const fs = require('fs');
const path = require('path');
const https = require('https');

const productsPath = path.join(__dirname, '../data/affiliate-products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

async function checkUrl(url) {
  return new Promise((resolve) => {
    // Standard User-Agent to avoid immediate bot detection
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    };

    const req = https.get(url, { headers }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        const statusCode = res.statusCode;
        
        // 1. Definite 404
        if (statusCode === 404) return resolve(false);

        // 2. The "Dog of Amazon" detection
        // Amazon often returns 200 OK but shows a "Dog" page if the ASIN is dead.
        const errorMarkers = [
          'dog of Amazon',
          'Meet the dogs of Amazon',
          'Sorry, we couldn\'t find that page',
          'Page Not Found',
          'Looking for something?',
          'enter the characters you see below' // Bot detection
        ];
        
        const isErrorPage = errorMarkers.some(marker => body.includes(marker));
        if (isErrorPage) {
          console.warn(`[VALIDATOR] ❌ Amazon Error/Dog Page detected for ${url}`);
          return resolve(false);
        }

        // 3. Availability check (optional but good for UX)
        const isUnavailable = body.includes('Currently unavailable') || body.includes('Temporarily out of stock');
        if (isUnavailable) {
          console.warn(`[VALIDATOR] ⚠️ Product is out of stock: ${url}`);
        }

        resolve(true);
      });
    });

    req.on('error', (e) => {
      console.error(`[VALIDATOR] ❌ Request error for ${url}: ${e.message}`);
      resolve(false);
    });
    req.end();
  });
}

async function validate() {
  console.log('🔍 Validating Amazon Affiliate Links...');
  let hasChanges = false;

  for (const product of products) {
    if (!product.active) continue;

    const isAlive = await checkUrl(product.url);
    if (!isAlive) {
      console.warn(`⚠️ Warning: Product "${product.label}" (${product.id}) might be offline. Marking as inactive.`);
      product.active = false;
      hasChanges = true;
    }
  }

  if (hasChanges) {
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
    console.log('✅ Catalog updated with link health status.');
  } else {
    console.log('✅ All active links passed basic health check.');
  }
}

validate();
