# Cài đặt chi tiết

Hướng dẫn cài bộ skill và mọi thứ đi kèm trên một máy mới, kể cả khi dùng tài khoản Claude khác. Skill và plugin nằm trên máy, không gắn với tài khoản Claude.

## 1. Chuẩn bị máy

| Công cụ | Phiên bản | Kiểm tra |
|---|---|---|
| Claude Code | bản mới nhất | `claude --version` |
| Node.js | 20 trở lên | `node -v` |
| pnpm | 9 trở lên | `pnpm -v` (cài: `npm install -g pnpm` hoặc `corepack enable`) |
| Git | bất kỳ | `git --version` |
| GitHub CLI | tùy chọn, cần nếu repo riêng tư | `gh auth status` |
| Google Chrome | bất kỳ | dùng cho Lighthouse và chụp màn hình |

Nếu repo này đang riêng tư, đăng nhập GitHub trước: `gh auth login`.

## 2. Cài bộ skill Trà Việt Số

### Dạng plugin

```bash
claude plugin marketplace add hillnguyen528/tra-viet-so-ui-skills
claude plugin install tvs-ui-skills@tra-viet-so-ui-skills
claude plugin list
```

`claude plugin list` phải có dòng `tvs-ui-skills@tra-viet-so-ui-skills`. Mặc định plugin cài cho người dùng hiện tại (mọi dự án). Mở phiên Claude Code mới, gõ `/` và tìm `tvs-` để thấy các skill.

Cập nhật: `claude plugin marketplace update tra-viet-so-ui-skills` rồi `claude plugin update tvs-ui-skills@tra-viet-so-ui-skills`, sau đó khởi động lại Claude Code.

Gỡ: `claude plugin uninstall tvs-ui-skills@tra-viet-so-ui-skills`.

### Chép thủ công

```bash
git clone https://github.com/hillnguyen528/tra-viet-so-ui-skills.git
cd tra-viet-so-ui-skills
./install.sh /đường/dẫn/dự-án     # vào <dự-án>/.claude/skills/
./install.sh --global            # vào ~/.claude/skills/
```

Kiểm tra: thư mục đích có 5 thư mục `tvs-*`, mỗi thư mục có `SKILL.md`. Gỡ: xóa 5 thư mục đó.

Nên chọn một trong hai cách. Cài cả hai thì Claude thấy hai bản của cùng skill (một bản có tiền tố `tvs-ui-skills:`).

Khi chép skill vào thư mục dự án, commit cả `.claude/skills/` để cả nhóm dùng chung.

## 3. Skill và plugin bổ trợ

Các plugin dưới đây nằm trong marketplace chính thức `claude-plugins-official`, thường có sẵn trong Claude Code. Nếu lệnh cài báo không tìm thấy marketplace, thêm nó trước:

```bash
claude plugin marketplace add anthropics/claude-plugins-official
```

### vercel (cần cho dự án Next.js)

```bash
claude plugin install vercel@claude-plugins-official
```

Cung cấp các skill đã dùng khi dựng Trà Việt Số:

- `vercel:nextjs`: App Router, Server Components, metadata, `next/image`, `next/font`.
- `vercel:shadcn`: khởi tạo và dùng shadcn/ui (`shadcn init -d`), theming.
- `vercel:react-best-practices`: rà soát component sau khi viết nhiều TSX.
- `vercel:verification`, agent `vercel:performance-optimizer`: kiểm tra luồng và tối ưu Core Web Vitals.

### frontend-design (nên có)

```bash
claude plugin install frontend-design@claude-plugins-official
```

Skill thiết kế giao diện của Anthropic. Dùng cùng `tvs-design-system`: skill này lo hướng thẩm mỹ chung, `tvs-design-system` đặt quy tắc cụ thể.

### Trình duyệt cho nghiệm thu (nên có, chọn một)

```bash
claude plugin install chrome-devtools-mcp@claude-plugins-official
# hoặc
claude plugin install playwright@claude-plugins-official
```

`tvs-ui-qa` yêu cầu chạy app thật, chụp ở 360, 768, 1440 px và đọc console. Một trong hai plugin này cho Claude làm việc đó. Thay thế khác là tiện ích Claude in Chrome, hoặc tự chạy script với `puppeteer-core` trỏ tới Chrome đã cài.

### Skill shadcn chính thức (tùy chọn)

```bash
npx skills add shadcn-ui/ui
```

Lệnh hỏi chọn skill và nơi cài; chọn `shadcn`. Bổ sung cho `vercel:shadcn` với hướng dẫn của chính shadcn/ui.

### Có sẵn, không cần cài

- `dataviz`: quy tắc vẽ biểu đồ, dùng cho biểu đồ radar hồ sơ vị.

## 4. Kiểm tra hiệu năng và accessibility

`tvs-ui-qa` đặt mục tiêu Lighthouse mobile: Performance ≥ 85, Accessibility ≥ 90, SEO ≥ 90. Chạy trên bản production, không chạy trên `pnpm dev`:

```bash
pnpm build && pnpm start --port 3211
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  npx -y lighthouse http://localhost:3211/ --quiet --chrome-flags="--headless=new" \
  --only-categories=performance,accessibility,seo --output=html --output-path=./lighthouse.html
```

Trên Linux hoặc Windows, đổi `CHROME_PATH` theo nơi cài Chrome. Điểm Performance dao động vài điểm giữa các lần đo trên máy cá nhân; đo vài lần và tắt dev server khi đo.

## 5. Khởi tạo một dự án mới theo cùng stack

```bash
pnpm create next-app@latest my-app --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --turbopack --yes
cd my-app
pnpm dlx shadcn@latest init -d
pnpm add motion lucide-react
```

Sau đó mở Claude Code trong `my-app` và yêu cầu: "Đọc `references/code.md` của skill tvs-design-system và tvs-motion, dựng token màu, font và các primitive chuyển động cho dự án này."
