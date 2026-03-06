export const categories = [
  { 
    slug: "cleaning", 
    name: "Cleaning", 
    icon: "🧹",
    description: "Discover the best cleaning hacks, deep-cleaning guides, and organization tips to keep your home sparkling and stress-free."
  },
  { 
    slug: "health", 
    name: "Health", 
    icon: "💚",
    description: "Expert-backed health advice, wellness tips, and natural remedies focused on improving your everyday physical and mental well-being."
  },
  { 
    slug: "food", 
    name: "Food & Kitchen", 
    icon: "🍽️",
    description: "Smarter kitchen hacks, healthy recipes, and food preservation tips to save you time, money, and effort in the heart of your home."
  },
  { 
    slug: "home-and-garden", 
    name: "Home & Garden", 
    icon: "🏡",
    description: "Transform your living space with practical gardening guides, interior decor ideas, and home maintenance tips for every season."
  },
  { 
    slug: "life-hacks", 
    name: "Life Hacks", 
    icon: "⚡",
    description: "Clever solutions to common problems. Our best productivity tips and everyday shortcuts to make your life simpler and more efficient."
  },
  { 
    slug: "diy", 
    name: "DIY", 
    icon: "🔨",
    description: "Step-by-step DIY projects, upcycling ideas, and home improvement tutorials for the creative hands-on enthusiast."
  },
  { 
    slug: "beauty", 
    name: "Beauty & Style", 
    icon: "💄",
    description: "Natural beauty remedies, skincare routines, and timeless style tips to help you look and feel your best every single day."
  },
  { 
    slug: "viral-stories", 
    name: "Viral Stories", 
    icon: "🌟",
    description: "Interesting stories, trending news, and inspiring human experiences from across the web that are worth sharing."
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((cat) => cat.slug === slug);
}
