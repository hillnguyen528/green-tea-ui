// Tìm Chrome đã cài trên máy; đặt CHROME_PATH để chỉ định đường dẫn khác.
import fs from "node:fs";

const CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
];

export function chromePath() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const found = CANDIDATES.find((path) => fs.existsSync(path));
  if (!found) throw new Error("Không tìm thấy Chrome. Đặt biến môi trường CHROME_PATH.");
  return found;
}

export function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    if (!key.startsWith("--")) continue;
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) args[key.slice(2)] = true;
    else args[key.slice(2)] = argv[++i];
  }
  return args;
}

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
