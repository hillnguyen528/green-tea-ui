// Chụp toàn trang theo từng màn hình và báo lỗi bố cục, console.
//   node shots.mjs --base http://localhost:3000 --path / --width 360 --height 760 --mobile --out ./qa/home-360
import fs from "node:fs";
import puppeteer from "puppeteer-core";
import { chromePath, parseArgs, wait } from "./_chrome.mjs";

const args = parseArgs(process.argv.slice(2));
const base = args.base ?? "http://localhost:3000";
const path = args.path ?? "/";
const width = Number(args.width ?? 1440);
const height = Number(args.height ?? 900);
const mobile = Boolean(args.mobile);
const out = args.out ?? `./qa-shots/${path.replace(/\W+/g, "_") || "home"}-${width}`;
fs.mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({ executablePath: chromePath(), headless: true });
try {
  const page = await browser.newPage();
  const logs = [];
  page.on("console", (m) => ["error", "warning"].includes(m.type()) && logs.push(`${m.type()}: ${m.text().slice(0, 300)}`));
  page.on("pageerror", (e) => logs.push(`pageerror: ${e.message.slice(0, 300)}`));
  page.on("response", (r) => r.status() >= 400 && logs.push(`${r.status()} ${r.url().slice(0, 160)}`));
  await page.setViewport({ width, height, isMobile: mobile, hasTouch: mobile });
  const response = await page.goto(base + path, { waitUntil: "networkidle0" });
  await wait(1200);

  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  let index = 0;
  // Cuộn từng màn hình để các khối reveal kịp hiện trước khi chụp.
  for (let y = 0; y < total; y += height) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await wait(1100);
    await page.screenshot({ path: `${out}/${String(index++).padStart(2, "0")}.jpg`, type: "jpeg", quality: 70 });
  }

  const report = await page.evaluate(() => {
    const vw = window.innerWidth;
    const overflowing = [...document.querySelectorAll("main *")]
      .filter((el) => {
        const box = el.getBoundingClientRect();
        return box.width > 0 && box.right > vw + 1 && !el.closest("[class*=overflow-x-auto],[class*=overflow-hidden]");
      })
      .slice(0, 5)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
    return {
      scrollWidth: document.documentElement.scrollWidth,
      h1: document.querySelectorAll("h1").length,
      title: document.title,
      overflowing,
    };
  });
  console.log(JSON.stringify({ url: base + path, status: response?.status(), viewport: `${width}x${height}`, shots: index, out, ...report, logs: [...new Set(logs)] }, null, 2));
} finally {
  await browser.close();
}
