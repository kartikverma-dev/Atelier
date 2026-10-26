import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve(process.cwd(), "docs/logo-check");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log("Launching browser...");
  let browser;
  try {
    browser = await chromium.launch({ channel: "msedge", headless: true });
  } catch (e) {
    try {
      browser = await chromium.launch({ channel: "chrome", headless: true });
    } catch (e2) {
      browser = await chromium.launch({ headless: true });
    }
  }

  const combinations = [
    { theme: "light", dpr: 1 },
    { theme: "light", dpr: 2 },
    { theme: "dark", dpr: 1 },
    { theme: "dark", dpr: 2 },
  ];

  for (const { theme, dpr } of combinations) {
    console.log(`Capturing ${theme} at ${dpr}x DPR...`);
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      deviceScaleFactor: dpr,
      colorScheme: theme,
    });

    const page = await context.newPage();
    await page.goto("http://localhost:3001", { waitUntil: "networkidle" });

    // Set theme class on documentElement
    if (theme === "dark") {
      await page.evaluate(() => {
        document.documentElement.classList.add("dark");
      });
    } else {
      await page.evaluate(() => {
        document.documentElement.classList.remove("dark");
      });
    }

    await page.waitForTimeout(600);

    // 1. Header screenshot
    const header = await page.locator("header");
    await header.screenshot({
      path: path.join(outDir, `header-${theme}-${dpr}x.png`),
    });

    // 2. Hero screenshot (first section)
    const hero = await page.locator("section").first();
    await hero.screenshot({
      path: path.join(outDir, `hero-${theme}-${dpr}x.png`),
    });

    await context.close();
  }

  await browser.close();
  console.log("All screenshots saved to docs/logo-check/");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
