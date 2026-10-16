// Mở nhiều route ở nhiều bề rộng, báo route lỗi và kiểm tra mọi link nội bộ tìm thấy.
//   node smoke.mjs --base http://localhost:3000 --routes /,/about,/blog --widths 360,1440
import puppeteer from "puppeteer-core";
import { chromePath, parseArgs, wait } from "./_chrome.mjs";

const args = parseArgs(process.argv.slice(2));
const base = args.base ?? "http://localhost:3000";
const routes = String(args.routes ?? "/").split(",");
const widths = String(args.widths ?? "360,1440").split(",").map(Number);

const browser = await puppeteer.launch({ executablePath: chromePath(), headless: true });
const problems = [];
const links = new Set();
try {
  for (const width of widths) {
    const mobile = width < 768;
    const page = await browser.newPage();
    await page.setViewport({ width, height: mobile ? 760 : 900, isMobile: mobile, hasTouch: mobile });
    let logs = [];
    page.on("console", (m) => ["error", "warning"].includes(m.type()) && logs.push(m.text().slice(0, 260)));
    page.on("pageerror", (e) => logs.push(`pageerror: ${e.message.slice(0, 260)}`));
    for (const route of routes) {
      logs = [];
      const response = await page.goto(base + route, { waitUntil: "networkidle0" });
      await wait(500);
      const info = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        h1: document.querySelectorAll("h1").length,
        links: [...document.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href").split(/[?#]/)[0]),
      }));
      info.links.forEach((link) => links.add(link));
      const issues = [];
      if (response?.status() !== 200) issues.push(`status ${response?.status()}`);
      if (info.scrollWidth > width) issues.push(`cuộn ngang: scrollWidth ${info.scrollWidth}`);
      if (info.h1 !== 1) issues.push(`có ${info.h1} thẻ h1`);
      if (logs.length) issues.push(...logs);
      if (issues.length) problems.push({ width, route, issues });
    }
    await page.close();
  }
  const page = await browser.newPage();
  const broken = [];
  for (const link of [...links].sort()) {
    const response = await page.goto(base + link, { waitUntil: "domcontentloaded" });
    if ((response?.status() ?? 0) >= 400) broken.push(`${link} ${response?.status()}`);
  }
  console.log(JSON.stringify({ routes: routes.length, widths, problems, linksChecked: links.size, broken }, null, 2));
  process.exitCode = problems.length || broken.length ? 1 : 0;
} finally {
  await browser.close();
}
