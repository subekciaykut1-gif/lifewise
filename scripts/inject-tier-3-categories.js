const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'fr', 'de', 'pt'];
const messagesDir = path.join(__dirname, '..', 'messages');

const newCategories = {
  en: {
    estate: { name: "Real Estate", desc: "Smarter home buying hacks, rental investment guides, and property value secrets every owner should know." },
    careers: { name: "Career & Money", desc: "Expert side-hustle ideas, salary negotiation tactics, and productivity hacks for professional growth." }
  },
  es: {
    estate: { name: "Bienes Raíces", desc: "Trucos para comprar casa, guías de inversión y secretos del valor de la propiedad." },
    careers: { name: "Carrera y Dinero", desc: "Ideas de ingresos extra, tácticas de negociación salarial y hacks de productividad." }
  },
  fr: {
    estate: { name: "Immobilier", desc: "Astuces pour l'achat d'une maison, guides d'investissement et secrets de la valeur immobilière." },
    careers: { name: "Carrière & Argent", desc: "Idées de revenus complémentaires, tactiques de négociation de salaire et astuces de productivité." }
  },
  de: {
    estate: { name: "Immobilien", desc: "Hacks zum Hauskauf, Ratgeber für Mietinvestitionen und Geheimnisse des Immobilienwerts." },
    careers: { name: "Karriere & Geld", desc: "Ideen für Nebenbeschäftigungen, Taktiken für Gehaltsverhandlungen und Produktivitäts-Hacks." }
  },
  pt: {
    estate: { name: "Imobiliário", desc: "Dicas para comprar casa, guias de investimento em aluguel e segredos do valor do imóvel." },
    careers: { name: "Carreira e Dinheiro", desc: "Ideias de renda extra, táticas de negociação salarial e hacks de produtividade profissional." }
  }
};

locales.forEach(loc => {
  const filePath = path.join(messagesDir, `${loc}.json`);
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!data.Categories) data.Categories = {};
  data.Categories.estate = newCategories[loc].estate;
  data.Categories.careers = newCategories[loc].careers;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✅ Patched ${loc}.json with Real Estate & Careers`);
});

const catFilePath = path.join(__dirname, '..', 'lib', 'categories.ts');
let catData = fs.readFileSync(catFilePath, 'utf8');

const newCatArray = `  { 
    slug: "estate", 
    name: "Real Estate", 
    icon: "🏗️",
    description: "Smarter home buying hacks, rental investment guides, and property value secrets every owner should know."
  },
  { 
    slug: "careers", 
    name: "Careers", 
    icon: "💼",
    description: "Expert side-hustle ideas, salary negotiation tactics, and productivity hacks for professional growth."
  },
];`;

if (!catData.includes('slug: "estate"')) {
  catData = catData.replace('];', newCatArray);
  fs.writeFileSync(catFilePath, catData, 'utf8');
  console.log(`✅ Patched lib/categories.ts successfully.`);
}

console.log("Ultimate AdSense expansion complete!");
