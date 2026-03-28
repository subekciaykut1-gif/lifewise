const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, 'messages');

function updateJson(locale, updater) {
  const file = path.join(messagesDir, `${locale}.json`);
  if (!fs.existsSync(file)) return;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  updater(data);
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// 1. Fix en.json (Missing SavedHacks)
updateJson('en', (data) => {
  if (!data.SavedHacks) {
    data.SavedHacks = {
      title: "My Saved Hacks",
      userDashboard: "User Dashboard",
      subtitle: "Your personal library of bookmarked tips and hacks.",
      noSaved: "No saved hacks yet",
      noSavedDesc: "When you find a hack you love, click the bookmark icon on the article to save it here for quick reference.",
      exploreTopHacks: "Explore Top Hacks"
    };
    console.log("Fixed en.json: Added SavedHacks");
  }
});

// 2. Fix es.json (Missing Footer.cookiePolicy)
updateJson('es', (data) => {
  if (data.Footer && !data.Footer.cookiePolicy) {
    data.Footer.cookiePolicy = "Política de cookies";
    console.log("Fixed es.json: Added Footer.cookiePolicy");
  }
});

// 3. Fix fr.json (Missing Nav.authRequired and Footer.cookiePolicy)
updateJson('fr', (data) => {
  if (data.Nav && !data.Nav.authRequired) {
    data.Nav.authRequired = "Veuillez vous connecter pour enregistrer cette astuce";
    console.log("Fixed fr.json: Added Nav.authRequired");
  }
  if (data.Footer && !data.Footer.cookiePolicy) {
    data.Footer.cookiePolicy = "Politique relative aux cookies";
    console.log("Fixed fr.json: Added Footer.cookiePolicy");
  }
});

// 4. Fix de.json (Missing Nav.authRequired and Footer.cookiePolicy)
updateJson('de', (data) => {
  if (data.Nav && !data.Nav.authRequired) {
    data.Nav.authRequired = "Bitte melden Sie sich an, um diesen Hack zu speichern";
    console.log("Fixed de.json: Added Nav.authRequired");
  }
  if (data.Footer && !data.Footer.cookiePolicy) {
    data.Footer.cookiePolicy = "Cookie-Richtlinie";
    console.log("Fixed de.json: Added Footer.cookiePolicy");
  }
});

// 5. Fix pt.json (Missing Nav.authRequired and Footer.cookiePolicy)
updateJson('pt', (data) => {
  if (data.Nav && !data.Nav.authRequired) {
    data.Nav.authRequired = "Inicie sessão para guardar este truque";
    console.log("Fixed pt.json: Added Nav.authRequired");
  }
  if (data.Footer && !data.Footer.cookiePolicy) {
    data.Footer.cookiePolicy = "Política de Cookies";
    console.log("Fixed pt.json: Added Footer.cookiePolicy");
  }
});

console.log("All missing i18n keys have been natively restored.");
