import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const outputDir = path.resolve("output", "playwright");
await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const pages = [
  { name: "home-desktop", url: "http://localhost:3021/", viewport: { width: 1440, height: 1100 } },
  { name: "products-desktop", url: "http://localhost:3021/products", viewport: { width: 1440, height: 1100 } },
  { name: "detail-desktop", url: "http://localhost:3021/products/jm53055-cropped-zip-cardigan", viewport: { width: 1440, height: 1100 } },
  { name: "home-mobile", url: "http://localhost:3021/", viewport: { width: 390, height: 900 } },
  { name: "contact-mobile", url: "http://localhost:3021/contact", viewport: { width: 390, height: 900 } }
];

const results = [];
for (const item of pages) {
  const page = await browser.newPage({ viewport: item.viewport });
  await page.goto(item.url, { waitUntil: "networkidle" });
  const title = await page.title();
  const imageStats = await page.evaluate(() => {
    const images = Array.from(document.images);
    return {
      total: images.length,
      loaded: images.filter((image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0).length,
      headings: Array.from(document.querySelectorAll("h1,h2")).map((node) => node.textContent?.trim()).filter(Boolean).slice(0, 6)
    };
  });
  const screenshotPath = path.join(outputDir, `${item.name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  results.push({ ...item, title, imageStats, screenshotPath });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
