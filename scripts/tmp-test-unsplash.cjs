const urls = [
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1592150621344-82839b6fc236?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=1200'
];

async function testUrls() {
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(`${res.status} HTTP for ${url}`);
    } catch (err) {
      console.log(`ERROR fetching ${url}`, err.message);
    }
  }
}

testUrls();
