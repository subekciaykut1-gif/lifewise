const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, 'messages');
const locales = ['en', 'es', 'fr', 'de', 'pt'];
const translations = {
  en: "Latest Tips",
  es: "Últimos consejos",
  fr: "Derniers conseils",
  de: "Neueste Tipps",
  pt: "Últimas dicas"
};

locales.forEach(locale => {
  const filePath = path.join(messagesDir, `${locale}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (!data.Home) data.Home = {};
    data.Home.latestTips = translations[locale];
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Updated ${locale}.json`);
  }
});

console.log('Fix 2 complete.');
