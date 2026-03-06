export const categories = [
  { slug: "cleaning", name: "Cleaning", icon: "🧹" },
  { slug: "health", name: "Health", icon: "💚" },
  { slug: "food", name: "Food & Kitchen", icon: "🍽️" },
  { slug: "home-and-garden", name: "Home & Garden", icon: "🏡" },
  { slug: "life-hacks", name: "Life Hacks", icon: "⚡" },
  { slug: "diy", name: "DIY", icon: "🔨" },
  { slug: "beauty", name: "Beauty & Style", icon: "💄" },
  { slug: "viral-stories", name: "Viral Stories", icon: "🌟" },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((cat) => cat.slug === slug);
}
