const { incrementArticleViews } = require('../lib/article-views');
process.env.NODE_ENV = 'production'; // Force production mode
const count = incrementArticleViews('food', '15-kitchen-hacks');
console.log('New count:', count);
