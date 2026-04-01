export interface ProductMapping {
  label: string;
  description: string;
  url: string;
  imageUrl?: string;
}

export const CATEGORY_PRODUCT_MAP: Record<string, ProductMapping> = {
  "life-hacks": {
    label: "Moleskine Weekly Planner",
    description: "Organize your thoughts and schedule with this classic, high-quality weekly planner.",
    url: "https://amazon.com/dp/B09NQSQCX1?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/71R2H2rJ8XL._AC_SL1500_.jpg",
  },
  "health": {
    label: "Withings Body+ Smart Scale",
    description: "Track your weight, body fat, and water percentage with this high-accuracy Wi-Fi scale.",
    url: "https://amazon.com/dp/B071XW4C5Q?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/51wUu7-jK5L._AC_SL1000_.jpg",
  },
  "food": {
    label: "OXO Good Grips 3-Piece Mixing Bowl Set",
    description: "Durable, non-slip mixing bowls that are perfect for any kitchen task.",
    url: "https://amazon.com/dp/B00004OCNS?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/71-00-5G-NL._AC_SL1500_.jpg",
  },
  "cleaning": {
    label: "Bissell Little Green Portable Cleaner",
    description: "The ultimate portable carpet and upholstery cleaner for tough stains.",
    url: "https://amazon.com/dp/B00450VXHS?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/81xU21-0-FL._AC_SL1500_.jpg",
  },
  "home-and-garden": {
    label: "Scotts Turf Builder Lawn Food",
    description: "Build a thick, green lawn with this easy-to-use fertilizer.",
    url: "https://amazon.com/dp/B000RZXPWO?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/81-0-u-o-xKL._AC_SL1500_.jpg",
  },
  "diy": {
    label: "DEWALT 20V MAX Drill Combo Kit",
    description: "A powerful, 2-tool combo kit for all your DIY and home improvement projects.",
    url: "https://amazon.com/dp/B00ET4P3HE?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/71-0-u-o-xKL._AC_SL1500_.jpg",
  },
  "beauty": {
    label: "Neutrogena Hydro Boost Face Moisturizer",
    description: "Hydrate your skin with this oil-free, non-comedogenic water gel.",
    url: "https://amazon.com/dp/B00AQ7FL0G?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/71-0-u-o-xKL._AC_SL1500_.jpg",
  },
  "finance": {
    label: "I Will Teach You To Be Rich (book)",
    description: "Ramit Sethi's best-selling guide to automating your finances and living a rich life.",
    url: "https://amazon.com/dp/1523505745?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/71-0-u-o-xKL._AC_SL1500_.jpg",
  },
  "technology": {
    label: "Anker 10,000mAh Portable Charger",
    description: "Keep your devices charged on the go with this ultra-compact power bank.",
    url: "https://amazon.com/dp/B07S829LBX?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/71-0-u-o-xKL._AC_SL1500_.jpg",
  },
  "auto": {
    label: "Chemical Guys Complete Wash Kit",
    description: "Everything you need for a professional-grade car wash at home.",
    url: "https://amazon.com/dp/B000PHRZRM?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/71-0-u-o-xKL._AC_SL1500_.jpg",
  },
  "pets": {
    label: "Furminator Deshedding Tool",
    description: "Reduce shedding by up to 90% with this expert-recommended tool.",
    url: "https://amazon.com/dp/B001SMBJWG?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/71-0-u-o-xKL._AC_SL1500_.jpg",
  },
  "travel": {
    label: "Osprey Farpoint 40 Travel Backpack",
    description: "The perfect carry-on travel backpack for your next adventure.",
    url: "https://amazon.com/dp/B00M7W1R1Q?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/71-0-u-o-xKL._AC_SL1500_.jpg",
  },
  "careers": {
    label: "Deep Work by Cal Newport (book)",
    description: "Master the ability to focus without distraction for better career success.",
    url: "https://amazon.com/dp/1455586692?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/71-0-u-o-xKL._AC_SL1500_.jpg",
  },
  "gaming": {
    label: "SteelSeries Arctis Nova 1 Headset",
    description: "Award-winning sound quality for an immersive gaming experience.",
    url: "https://amazon.com/dp/B09ZF1YZ28?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/71-0-u-o-xKL._AC_SL1500_.jpg",
  },
  "estate": {
    label: "The Book on Rental Property Investing",
    description: "A comprehensive guide to building wealth through real estate investing.",
    url: "https://amazon.com/dp/099071179X?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/71-0-u-o-xKL._AC_SL1500_.jpg",
  },
  "viral-stories": {
    label: "The Subtle Art of Not Giving a F*ck (book)",
    description: "A counterintuitive approach to living a better life.",
    url: "https://amazon.com/dp/0062457713?tag=wisetips-20",
    imageUrl: "https://m.media-amazon.com/images/I/71-0-u-o-xKL._AC_SL1500_.jpg",
  },
};
