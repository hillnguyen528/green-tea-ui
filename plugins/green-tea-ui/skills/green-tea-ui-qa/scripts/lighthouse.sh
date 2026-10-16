#!/usr/bin/env bash
# Chạy Lighthouse (mobile) cho nhiều route trên bản production và in bảng điểm.
#   ./lighthouse.sh http://localhost:3211 / /about /blog
# Chạy trên `pnpm build && pnpm start`, tắt dev server khi đo để điểm ổn định hơn.
set -euo pipefail
BASE="${1:?Thiếu URL gốc, ví dụ http://localhost:3211}"; shift
TMP="$(mktemp -d)"
for route in "${@:-/}"; do
  npx -y lighthouse "$BASE$route" --quiet --chrome-flags="--headless=new" \
    --only-categories=performance,accessibility,seo,best-practices \
    --output=json --output-path="$TMP/report.json" >/dev/null 2>&1 || { echo "$route: lỗi khi chạy Lighthouse"; continue; }
  node -e '
    const r = require(process.argv[1]); const a = r.audits;
    const s = Object.fromEntries(Object.entries(r.categories).map(([k, v]) => [k.slice(0, 4), Math.round(v.score * 100)]));
    const fails = Object.entries(a).filter(([, x]) => x.score === 0 && x.scoreDisplayMode === "binary").map(([k]) => k);
    console.log(process.argv[2].padEnd(36), JSON.stringify(s), "LCP", a["largest-contentful-paint"].displayValue, fails.length ? "lỗi: " + fails.join(", ") : "");
  ' "$TMP/report.json" "$route"
done
rm -rf "$TMP"
