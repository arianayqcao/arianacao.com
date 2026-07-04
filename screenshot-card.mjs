import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 1200 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
const link = page.locator('a[href="/work/dubhacks-2026"]').first();
const box = await link.boundingBox();
console.log("box", box);
await link.screenshot({ path: process.argv[2] });
await browser.close();
