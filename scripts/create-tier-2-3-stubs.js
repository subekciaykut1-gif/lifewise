const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '..', 'content', 'articles');

const newArticles = [
  // TRAVEL
  { slug: "budget-europe-trip-hacks", title: "10 Genius Hacks for a Budget Europe Trip", category: "travel" },
  { slug: "solo-travel-safety-guide", title: "The Ultimate Safety Guide for Solo Female Travelers", category: "travel" },
  { slug: "packing-light-tips", title: "How to Pack Everything for a Month in One Carry-On", category: "travel" },
  { slug: "cheapest-flights-booking-secrets", title: "Hidden Secrets to Booking the Cheapest Flights Every Time", category: "travel" },
  { slug: "digital-nomad-essentials", title: "Essential Gear for the Successful Digital Nomad Lifestyle", category: "travel" },

  // AUTO
  { slug: "car-maintenance-saves-money", title: "DIY Car Maintenance That Saves You Thousands Every Year", category: "auto" },
  { slug: "fuel-efficiency-hacks", title: "Surprising Ways to Improve Your Car's Fuel Efficiency", category: "auto" },
  { slug: "buying-used-car-checklist", title: "The Ultimate Checklist Before Buying a Used Car", category: "auto" },
  { slug: "winter-driving-safety-tips", title: "Crucial Winter Driving Safety Tips to Prevent Accidents", category: "auto" },
  { slug: "clean-car-interior-hacks", title: "Professional Interior Car Cleaning Hacks for Beginners", category: "auto" },

  // PETS
  { slug: "natural-dog-health-tips", title: "Natural Health Tips Every Dog Owner Should Know", category: "pets" },
  { slug: "cat-behavior-explained", title: "Decoding Your Cat's Behavior: What They Are Really Saying", category: "pets" },
  { slug: "budget-pet-ownership", title: "How to Be a Great Pet Owner on a Tight Budget", category: "pets" },
  { slug: "homemade-pet-treat-recipes", title: "Healthy Homemade Pet Treat Recipes Your Pets Will Love", category: "pets" },
  { slug: "apartment-living-with-dogs", title: "Success Secrets for Apartment Living with Large Dogs", category: "pets" },

  // REAL ESTATE
  { slug: "first-time-home-buyer-secrets", title: "Secrets Every First-Time Home Buyer Needs to Know", category: "estate" },
  { slug: "increase-property-value-low-cost", title: "Low-Cost Ways to Instantly Increase Your Property Value", category: "estate" },
  { slug: "investing-in-rental-property", title: "A Beginner's Guide to Investing in Rental Property", category: "estate" },
  { slug: "negotiate-lower-rent", title: "How to Successfully Negotiate Lower Rent with Your Landlord", category: "estate" },
  { slug: "staging-home-to-sell", title: "Professional Home Staging Tips to Sell Your House Fast", category: "estate" },

  // CAREERS
  { slug: "salary-negotiation-tactics", title: "Proven Salary Negotiation Tactics for Your Next Review", category: "careers" },
  { slug: "productive-home-office-hacks", title: "Productivity Hacks for the Ultimate Home Office Setup", category: "careers" },
  { slug: "best-side-hustles-2026", title: "The Most Profitable Side Hustles to Start in 2026", category: "careers" },
  { slug: "resume-tips-for-remote-work", title: "Modern Resume Tips to Land Your Dream Remote Job", category: "careers" },
  { slug: "overcoming-workplace-burnout", title: "Practical Strategies for Overcoming Workplace Burnout", category: "careers" },
];

newArticles.forEach(article => {
  const filePath = path.join(articlesDir, `${article.slug}.mdx`);
  const template = `---
title: "${article.title}"
excerpt: "Master the secrets of ${article.title.toLowerCase()} with our comprehensive expert guide."
category: "${article.category}"
author: "LifeWise Editors"
publishedAt: "${new Date().toISOString().split('T')[0]}T12:00:00Z"
---

This is a structural placeholder. The AI engine will populate this with 600+ words of elite, AdSense-compliant content shortly.`;

  fs.writeFileSync(filePath, template, 'utf8');
  console.log(`Scaffolded: ${article.slug} [${article.category}]`);
});

console.log(`${newArticles.length} additional high-revenue stubs created successfully.`);
