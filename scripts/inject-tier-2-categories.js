const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'fr', 'de', 'pt'];
const messagesDir = path.join(__dirname, '..', 'messages');

const newCategories = {
  en: {
    travel: { name: "Travel & Nomadic", desc: "Budget travel hacks, destination guides, and adventurous lifestyle tips for the modern explorer." },
    auto: { name: "Auto & Vehicles", desc: "Car maintenance hacks, driving safety tips, and smart vehicle ownership guides to save you thousands." },
    pets: { name: "Pet Care", desc: "Expert pet training tips, natural animal health remedies, and clever life hacks for every pet parent." }
  },
  es: {
    travel: { name: "Viajes y Aventura", desc: "Trucos de viaje económicos, guías de destinos y consejos para el explorador moderno." },
    auto: { name: "Motor y Vehículos", desc: "Consejos de mantenimiento de coches, seguridad vial y guías inteligentes para propietarios." },
    pets: { name: "Mascotas", desc: "Entrenamiento de mascotas, remedios naturales para animales y trucos para dueños de mascotas." }
  },
  fr: {
    travel: { name: "Voyages & Aventure", desc: "Astuces pour voyager moins cher, guides de destinations et conseils pour l'explorateur moderne." },
    auto: { name: "Auto & Véhicules", desc: "Entretien automobile, conseils de sécurité routière et guides pour les propriétaires de véhicules." },
    pets: { name: "Animaux", desc: "Conseils de dressage, remèdes naturels pour les animaux et astuces pour tous les propriétaires." }
  },
  de: {
    travel: { name: "Reisen & Abenteuer", desc: "Günstige Reise-Hacks, Reiseziele und Tipps für den modernen Entdecker." },
    auto: { name: "Auto & Fahrzeuge", desc: "Auto-Wartung, Fahrsicherheitstipps und Ratgeber für den cleveren Fahrzeugbesitzer." },
    pets: { name: "Haustiere", desc: "Tipps zur Haustiererziehung, natürliche Heilmittel und Hacks für jeden Tierbesitzer." }
  },
  pt: {
    travel: { name: "Viagem e Aventura", desc: "Dicas de viagem barata, guias de destinos e dicas de estilo de vida para o explorador moderno." },
    auto: { name: "Auto e Veículos", desc: "Dicas de manutenção de carros, segurança ao dirigir e guias inteligentes para proprietários." },
    pets: { name: "Animais de Estimação", desc: "Dicas de treinamento, remédios naturais e hacks para todos os donos de animais." }
  }
};

// 1. Update i18n
locales.forEach(loc => {
  const filePath = path.join(messagesDir, `${loc}.json`);
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!data.Categories) data.Categories = {};
  data.Categories.travel = newCategories[loc].travel;
  data.Categories.auto = newCategories[loc].auto;
  data.Categories.pets = newCategories[loc].pets;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✅ Patched ${loc}.json with Travel, Auto, Pets`);
});

// 2. Update lib/categories.ts
const catFilePath = path.join(__dirname, '..', 'lib', 'categories.ts');
let catData = fs.readFileSync(catFilePath, 'utf8');

const newCatArray = `  { 
    slug: "travel", 
    name: "Travel", 
    icon: "✈️",
    description: "Budget travel hacks, destination guides, and adventurous lifestyle tips for the modern explorer."
  },
  { 
    slug: "auto", 
    name: "Auto & Vehicles", 
    icon: "🚗",
    description: "Car maintenance hacks, driving safety tips, and smart vehicle ownership guides to save you thousands."
  },
  { 
    slug: "pets", 
    name: "Pet Care", 
    icon: "🐾",
    description: "Expert pet training tips, natural animal health remedies, and clever life hacks for every pet parent."
  },
];`;

if (!catData.includes('slug: "travel"')) {
  catData = catData.replace('];', newCatArray);
  fs.writeFileSync(catFilePath, catData, 'utf8');
  console.log(`✅ Patched lib/categories.ts successfully.`);
}

console.log("Global niche expansion complete!");
