const fs = require('fs');
const path = require('path');
const https = require('https');

const productsPath = path.join(__dirname, '../data/affiliate-products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

async function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        // Amazon often returns 503/403 to bots, but 404 is a definite death.
        if (res.statusCode === 404) return resolve(false);

        // Check for common "Out of Stock" or "Unavailable" messages in the HTML
        const unavailableMarkers = [
          'Currently unavailable',
          'Temporarily out of stock',
          'Discontinued by manufacturer',
          'We don\'t know when or if this item will be back'
        ];
        
        const isUnavailable = unavailableMarkers.some(marker => body.includes(marker));
        if (isUnavailable) {
          console.warn(`[VALIDATOR] Product content suggests unavailability.`);
          return resolve(false);
        }

        resolve(true);
      });
    });

    
    req.on('error', () => resolve(false));
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
