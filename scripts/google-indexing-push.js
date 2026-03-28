/**
 * scripts/google-indexing-push.js
 * Manual utility to push specific URLs to Google's Indexing API for priority crawling.
 * 
 * SETUP REQUIRED:
 * 1. Go to Google Cloud Console, enable "Indexing API".
 * 2. Create a Service Account, download the JSON Key.
 * 3. Place the JSON as 'service-account.json' in this folder.
 * 4. Add the service account email to your Search Console as an 'Owner'.
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// --- CONFIG ---
const KEY_FILE = path.join(__dirname, 'service-account.json');
const URLS_TO_NOTIFY = [
  'https://wisetips.co/en/viral-stories/28sqm-family-of-four', // Example
  // Add more URLs here
];
// --------------

if (!fs.existsSync(KEY_FILE)) {
  console.error('❌ Error: service-account.json not found in scripts/ folder.');
  console.log('Follow setup instructions in the script header to use this tool.');
  process.exit(1);
}

const jwtClient = new google.auth.JWT(
  require(KEY_FILE).client_email,
  null,
  require(KEY_FILE).private_key,
  ['https://www.googleapis.com/auth/indexing'],
  null
);

jwtClient.authorize((err, tokens) => {
  if (err) {
    console.error('❌ Authentication failed:', err);
    return;
  }

  const indexing = google.indexing({ version: 'v3', auth: jwtClient });

  URLS_TO_NOTIFY.forEach(url => {
    indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    }, (err, res) => {
      if (err) {
        console.error(`❌ Failed to notify Google for ${url}:`, err.message);
      } else {
        console.log(`✅ Successfully notified Google for ${url}`);
      }
    });
  });
});
