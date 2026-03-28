const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'fr', 'de', 'pt'];
const dict = {};

function flattenObj(obj, parent, res = {}) {
  for (let key in obj) {
    let propName = parent ? parent + '.' + key : key;
    if (typeof obj[key] == 'object' && obj[key] !== null) {
      flattenObj(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
}

locales.forEach(loc => {
  const p = path.join(__dirname, '..', 'messages', `${loc}.json`);
  if (fs.existsSync(p)) {
    dict[loc] = flattenObj(JSON.parse(fs.readFileSync(p, 'utf8')));
  }
});

const enKeys = Object.keys(dict['en'] || {});
locales.forEach(loc => {
  if (loc === 'en') return;
  const locKeys = Object.keys(dict[loc] || {});
  
  // What's in EN but missing in loc?
  const missingInLoc = enKeys.filter(k => !locKeys.includes(k));
  if (missingInLoc.length > 0) console.log(`Missing in ${loc}:`, missingInLoc);
  
  // What's in loc but missing in EN?
  const missingInEn = locKeys.filter(k => !enKeys.includes(k));
  if (missingInEn.length > 0) console.log(`Missing in EN (from ${loc}):`, missingInEn);
});
