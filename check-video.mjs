import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("http://localhost:3000/videos/Sponsor-Us-Button-Animation-DH26-Jitter.mp4");
await page.waitForTimeout(1500);
const dims = await page.evaluate(() => {
  const v = document.querySelector("video");
  return v ? { w: v.videoWidth, h: v.videoHeight, duration: v.duration } : null;
});
console.log("video native dims:", dims);
await browser.close();
