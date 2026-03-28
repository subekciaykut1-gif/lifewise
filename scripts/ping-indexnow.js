/**
 * scripts/ping-indexnow.js
 * Automatically notifies IndexNow (Bing, DuckDuckGo, etc.) about sitemap updates.
 * Run this during the postbuild phase.
 */
const https = require('https');

const SITE_URL = 'https://wisetips.co';
const KEY = '8a7d3c9e2b4f5a1d6c8e0b7a9d2f4c6e';
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

const payload = JSON.stringify({
  host: 'wisetips.co',
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: [SITEMAP_URL],
});

const options = {
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
  },
};

console.log(`🚀 Pinging IndexNow for ${SITE_URL}...`);

const req = https.request(options, (res) => {
  console.log(`📡 IndexNow status: ${res.statusCode}`);
  if (res.statusCode === 200) {
    console.log('✅ IndexNow ping successful!');
  } else {
    console.log('⚠️  IndexNow returned a non-200 status. Check key verification.');
  }
});

req.on('error', (e) => {
  console.error(`❌ IndexNow ping failed: ${e.message}`);
});

req.write(payload);
req.end();
