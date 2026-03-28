const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'fr', 'de', 'pt'];
const messagesDir = path.join(__dirname, '..', 'messages');

const newCategories = {
  en: {
    technology: { name: "Technology", desc: "Tech & gadget hacks, software guides, and digital lifestyle tips to keep you connected and secure." },
    gaming: { name: "Gaming", desc: "Level up with our best gaming strategies, hardware reviews, and hidden features for casual and hardcore players alike." },
    finance: { name: "Personal Finance", desc: "Smart money-saving strategies, side-hustle ideas, and practical budgeting tips to achieve ultimate financial freedom." }
  },
  es: {
    technology: { name: "Tecnología", desc: "Trucos tecnológicos, guías de software y consejos de estilo de vida digital para mantenerte conectado de forma segura." },
    gaming: { name: "Videojuegos", desc: "Sube de nivel con nuestras mejores estrategias de juego, reseñas de hardware y funciones ocultas." },
    finance: { name: "Finanzas Personales", desc: "Estrategias de ahorro inteligentes, ideas de ingresos adicionales y consejos prácticos de presupuesto." }
  },
  fr: {
    technology: { name: "Technologie", desc: "Astuces technologiques, guides de logiciels et conseils pour un mode de vie numérique connecté et sécurisé." },
    gaming: { name: "Jeux Vidéo", desc: "Passez au niveau supérieur avec nos meilleures stratégies, critiques de matériel et fonctionnalités cachées." },
    finance: { name: "Finances Personnelles", desc: "Des stratégies d'économie intelligentes et des conseils pratiques de budgétisation pour la liberté financière." }
  },
  de: {
    technology: { name: "Technologie", desc: "Tech-Hacks, Software-Guides und Tipps für einen vernetzten und sicheren digitalen Lebensstil." },
    gaming: { name: "Gaming", desc: "Steigen Sie auf mit unseren besten Spielstrategien, Hardware-Bewertungen und versteckten Funktionen." },
    finance: { name: "Persönliche Finanzen", desc: "Intelligente Sparstrategien, Ideen für Nebenverdienste und praktische Budgetierungstipps." }
  },
  pt: {
    technology: { name: "Tecnologia", desc: "Dicas de gadgets, guias de software e estilo de vida digital para mantê-lo conectado e seguro." },
    gaming: { name: "Jogos", desc: "Suba de nível com nossas melhores estratégias de jogos, análises de hardware e recursos ocultos." },
    finance: { name: "Finanças Pessoais", desc: "Estratégias inteligentes de economia, dicas de orçamento e ideias de renda extra." }
  }
};

let success = true;

// 1. Update i18n Maps
locales.forEach(loc => {
  const filePath = path.join(messagesDir, `${loc}.json`);
  if (!fs.existsSync(filePath)) return;
  
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.Categories) data.Categories = {};
  
  data.Categories.technology = newCategories[loc].technology;
  data.Categories.gaming = newCategories[loc].gaming;
  data.Categories.finance = newCategories[loc].finance;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✅ Patched ${loc}.json with new AdSense Categories`);
});

// 2. Safely Update lib/categories.ts
const catFilePath = path.join(__dirname, '..', 'lib', 'categories.ts');
let catData = fs.readFileSync(catFilePath, 'utf8');

const newCatArray = `  { 
    slug: "technology", 
    name: "Technology", 
    icon: "💻",
    description: "Tech & gadget hacks, software guides, and digital lifestyle tips to keep you connected and secure."
  },
  { 
    slug: "gaming", 
    name: "Gaming", 
    icon: "🎮",
    description: "Level up with our best gaming strategies, hardware reviews, and hidden features for casual and hardcore players alike."
  },
  { 
    slug: "finance", 
    name: "Personal Finance", 
    icon: "💰",
    description: "Smart money-saving strategies, side-hustle ideas, and practical budgeting tips to achieve ultimate financial freedom."
  },
];`;

if (!catData.includes('slug: "technology"')) {
  catData = catData.replace('];', newCatArray);
  fs.writeFileSync(catFilePath, catData, 'utf8');
  console.log(`✅ Patched lib/categories.ts successfully.`);
}

console.log("Global architectural category expansion complete!");
