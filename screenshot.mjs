import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3001/";
const outDir = process.argv[3] || ".";

const browser = await chromium.launch();

const desktop = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
const dpage = await desktop.newPage();
const errors = [];
dpage.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
await dpage.goto(url, { waitUntil: "networkidle" });
await dpage.waitForTimeout(1000);
await dpage.screenshot({ path: `${outDir}/desktop-full.png`, fullPage: true });
await dpage.close();

const mobile = await browser.newContext({ viewport: { width: 390, height: 1600 } });
const mpage = await mobile.newPage();
mpage.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
await mpage.goto(url, { waitUntil: "networkidle" });
await mpage.waitForTimeout(1000);
await mpage.screenshot({ path: `${outDir}/mobile-full.png`, fullPage: true });
await mpage.close();

await browser.close();

console.log("Console errors:", errors.length ? errors : "none");
