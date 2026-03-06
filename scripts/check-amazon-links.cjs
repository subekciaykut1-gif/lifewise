const fs = require('fs');
const path = require('path');
const https = require('https');

const productsPath = path.join(__dirname, '../data/affiliate-products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

async function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        const statusCode = res.statusCode;
        
        // 1. Check for 404 or specific Amazon error status
        if (statusCode === 404) return resolve(false);

        // 2. Check for "Dog Page" indicators in title or body
        const errorMarkers = [
          '<title>Amazon.com Page Not Found</title>',
          'Sorry, we couldn\'t find that page',
          'dog of Amazon', // The "Meet the dogs of Amazon" page
          'Looking for something?'
        ];
        
        const isErrorPage = errorMarkers.some(marker => body.includes(marker));
        if (isErrorPage) {
          console.warn(`[VALIDATOR] Amazon returned an error page for ${url}`);
          return resolve(false);
        }

        // 3. Check for availability
        const unavailableMarkers = [
          'Currently unavailable',
          'Temporarily out of stock',
          'Discontinued by manufacturer'
        ];
        
        const isUnavailable = unavailableMarkers.some(marker => body.includes(marker));
        if (isUnavailable) {
          console.warn(`[VALIDATOR] Product is currently unavailable: ${url}`);
          // We might keep it active but mark it as low priority later. For now, let's keep it true unless it's a 404.
          // resolve(true); 
        }

        resolve(true);
      });
    });

    req.on('error', (e) => {
      console.warn(`[VALIDATOR] Request error for ${url}: ${e.message}`);
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
