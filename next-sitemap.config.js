/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://wisetips.co',
  generateRobotsTxt: true,
  sitemapSize: 50000, // Increased to generate single sitemap
  generateIndexSitemap: false, // Disable sitemap index
  outDir: 'public', // Output to public directory directly
};
