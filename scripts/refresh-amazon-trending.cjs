/**
 * Fetches trending products from Amazon browse node 120697190011 and writes to
 * data/amazon-trending-cache.json. The app uses this cache for affiliate picks.
 *
 * With API keys (recommended): uses Product Advertising API 5.0.
 * Without keys: scrapes the browse page for product links (best-effort; Amazon may limit bot access).
 *
 * Env (optional for PA-API): AMAZON_ACCESS_KEY, AMAZON_SECRET_KEY, AMAZON_PARTNER_TAG
 * (Partner tag defaults to wisetips-20.) When you have API access, add those three to .env
 * and run this script again — no code changes needed; API will be used automatically.
 * Optional: AMAZON_HOST, AMAZON_REGION
 */
const path = require("path");
const fs = require("fs");
const https = require("https");
const http = require("http");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const BROWSE_NODE_ID = "120697190011";
const BROWSE_URL = "https://www.amazon.com/b?node=" + BROWSE_NODE_ID;
const BEST_SELLERS_URL = "https://www.amazon.com/Best-Sellers/zgbs";
const CACHE_PATH = path.join(__dirname, "..", "data", "amazon-trending-cache.json");

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"Windows"',
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Upgrade-Insecure-Requests": "1",
};

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(url, { headers: BROWSER_HEADERS }, (res) => {
      const chunks = [];
      const gunzip =
        res.headers["content-encoding"] === "gzip"
          ? require("zlib").createGunzip()
          : null;
      const stream = gunzip ? res.pipe(gunzip) : res;
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      stream.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error("timeout"));
    });
  });
}

// Extract ASINs from /dp/ASIN or /gp/product/ASIN; ASIN is 10 alphanumeric
const ASIN_REGEX = /\/dp\/([A-Z0-9]{10})(?:\/|$|[\s"'])|\.amazon\.com\/gp\/product\/([A-Z0-9]{10})/gi;

function extractProductsFromHtml(html, baseUrl) {
  const seen = new Set();
  const products = [];
  let m;
  const regex = new RegExp(ASIN_REGEX.source, "gi");
  while ((m = regex.exec(html)) !== null) {
    const asin = (m[1] || m[2] || "").toUpperCase();
    if (!asin || seen.has(asin)) continue;
    seen.add(asin);
    const url = "https://www.amazon.com/dp/" + asin;
    // Try to find a title nearby (data-a-* or span with long text before/after this ASIN)
    const pos = m.index;
    const snippet = html.slice(Math.max(0, pos - 800), pos + 400);
    const titleMatch =
      snippet.match(/data-a-dp-title="([^"]+)"/) ||
      snippet.match(/alt="([^"]{10,120})"/) ||
      snippet.match(/title="([^"]{10,150})"/);
    let label = titleMatch
      ? titleMatch[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'").trim()
      : "Trending pick";
    if (label.length > 200) label = label.slice(0, 197) + "…";
    products.push({
      id: asin,
      categories: ["trending"],
      keywords: [],
      label,
      url,
      active: true,
    });
  }
  return products;
}

async function getProductsFromScrape() {
  for (const url of [BROWSE_URL, BEST_SELLERS_URL]) {
    try {
      const html = await fetchHtml(url);
      if (
        html.includes("dog of Amazon") ||
        html.includes("Enter the characters you see below") ||
        html.length < 5000
      ) {
        continue;
      }
      const products = extractProductsFromHtml(html, url);
      if (products.length > 0) {
        return products.slice(0, 20);
      }
    } catch (err) {
      console.warn("Scrape attempt failed for " + url + ":", err.message);
    }
  }
  return null;
}

function getProductsFromApi() {
  const accessKey = process.env.AMAZON_ACCESS_KEY;
  const secretKey = process.env.AMAZON_SECRET_KEY;
  const partnerTag =
    process.env.AMAZON_PARTNER_TAG ||
    process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG ||
    "wisetips-20";

  if (!accessKey || !secretKey || !partnerTag) {
    return null;
  }

  const ProductAdvertisingAPIv1 = require("paapi5-nodejs-sdk");
  const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;
  defaultClient.accessKey = accessKey;
  defaultClient.secretKey = secretKey;
  defaultClient.host = process.env.AMAZON_HOST || "webservices.amazon.com";
  defaultClient.region = process.env.AMAZON_REGION || "us-east-1";

  const api = new ProductAdvertisingAPIv1.DefaultApi();
  const searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();
  searchItemsRequest["PartnerTag"] = partnerTag;
  searchItemsRequest["PartnerType"] = "Associates";
  searchItemsRequest["BrowseNodeId"] = BROWSE_NODE_ID;
  searchItemsRequest["Keywords"] = "best seller"; // PA-API requires Keywords; this narrows to popular items in the node
  searchItemsRequest["SearchIndex"] = "All";
  searchItemsRequest["ItemCount"] = 20;
  searchItemsRequest["Resources"] = [
    "ItemInfo.Title",
    "ItemInfo.ByLineInfo",
    "Offers.Listings.Price",
    "Images.Primary.Medium",
  ];

  return new Promise((resolve) => {
    api.searchItems(searchItemsRequest, (error, data) => {
      if (error) {
        console.error("PA-API error:", error.message || error);
        if (error.response && error.response.text) {
          try {
            console.error("Response:", JSON.parse(error.response.text));
          } catch {
            console.error("Response text:", error.response.text);
          }
        }
        return resolve(null);
      }

      const response = ProductAdvertisingAPIv1.SearchItemsResponse.constructFromObject(data);
      const items = response.SearchResult?.Items;
      if (!items || !Array.isArray(items)) {
        if (response.Errors && response.Errors.length) {
          console.error("API errors:", JSON.stringify(response.Errors, null, 2));
        }
        return resolve(null);
      }

      const products = items
        .filter((item) => item.ASIN && item.DetailPageURL)
        .map((item) => {
          const title = item.ItemInfo?.Title?.DisplayValue || item.ASIN;
          return {
            id: item.ASIN,
            categories: ["trending"],
            keywords: [],
            label: title.length > 200 ? title.slice(0, 197) + "…" : title,
            url: item.DetailPageURL,
            active: true,
          };
        });

      resolve(products.slice(0, 20));
    });
  });
}

async function main() {
  console.log("Refreshing Amazon trending products (browse node " + BROWSE_NODE_ID + ")…");
  let products = await getProductsFromApi();
  if (products && products.length > 0) {
    console.log("Fetched " + products.length + " products via PA-API.");
  } else {
    console.log("No PA-API keys (or API failed). Trying scrape fallback…");
    products = await getProductsFromScrape();
    if (products && products.length > 0) {
      console.log("Scraped " + products.length + " product links.");
    }
  }
  if (!products || products.length === 0) {
    console.log("No products fetched. Cache not updated. Add AMAZON_ACCESS_KEY/SECRET_KEY/PARTNER_TAG for API, or run again (scrape may work from some networks).");
    process.exit(0);
    return;
  }

  const dir = path.dirname(CACHE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    CACHE_PATH,
    JSON.stringify(
      {
        fetchedAt: new Date().toISOString(),
        products,
      },
      null,
      2
    ),
    "utf8"
  );
  console.log("Wrote " + products.length + " products to " + CACHE_PATH);
}

main();
