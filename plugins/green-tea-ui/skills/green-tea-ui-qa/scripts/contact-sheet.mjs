// Ghép nhiều ảnh chụp thành một tờ để xem nhanh cả trang trong một lần.
//   node contact-sheet.mjs --in ./qa/home-360 --out ./qa/home-360.jpg --cols 6 --mobile
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { parseArgs } from "./_chrome.mjs";

const args = parseArgs(process.argv.slice(2));
const dir = args.in;
if (!dir) throw new Error("Thiếu --in <thư mục ảnh>");
const out = args.out ?? `${dir.replace(/\/$/, "")}.jpg`;
const mobile = Boolean(args.mobile);
const cols = Number(args.cols ?? (mobile ? 6 : 3));
const W = mobile ? 300 : 640;
const H = mobile ? 662 : 428;
const LABEL = 28;

const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
const rows = Math.ceil(files.length / cols);
const layers = [];
for (const [i, file] of files.entries()) {
  const left = (i % cols) * W;
  const top = Math.floor(i / cols) * H;
  const image = await sharp(path.join(dir, file)).resize(W, H - LABEL, { fit: "contain", background: "#222" }).toBuffer();
  const label = Buffer.from(`<svg width="${W}" height="${LABEL}"><rect width="100%" height="100%" fill="#000"/><text x="6" y="20" font-size="18" fill="#fff" font-family="Helvetica">${file}</text></svg>`);
  layers.push({ input: image, left, top }, { input: label, left, top: top + H - LABEL });
}
await sharp({ create: { width: W * cols, height: H * rows, channels: 3, background: "#222" } })
  .composite(layers)
  .jpeg({ quality: 80 })
  .toFile(out);
console.log(`${files.length} ảnh -> ${out}`);
