# Cài đặt chi tiết

Hướng dẫn cài bộ skill và mọi thứ đi kèm trên một máy mới, kể cả khi dùng tài khoản Claude khác. Skill và plugin nằm trên máy, không gắn với tài khoản Claude.

## 1. Chuẩn bị máy

| Công cụ | Phiên bản | Kiểm tra |
|---|---|---|
| Claude Code | bản mới nhất | `claude --version` |
| Node.js | 20 trở lên | `node -v` |
| pnpm | 9 trở lên | `pnpm -v` (cài: `npm install -g pnpm` hoặc `corepack enable`) |
| Git | bất kỳ | `git --version` |
| Google Chrome | bất kỳ | dùng cho Lighthouse và chụp màn hình |

## 2. Cài Green Tea UI

### Dạng plugin

```bash
claude plugin marketplace add hillnguyen528/green-tea-ui
claude plugin install green-tea-ui@green-tea-ui
claude plugin list
```

`claude plugin list` phải có dòng `green-tea-ui@green-tea-ui`. Mặc định plugin cài cho người dùng hiện tại (mọi dự án). Mở phiên Claude Code mới, gõ `/` và tìm `green-tea` để thấy 6 skill.

Cập nhật: `claude plugin marketplace update green-tea-ui` rồi `claude plugin update green-tea-ui@green-tea-ui`, sau đó khởi động lại Claude Code.

Gỡ: `claude plugin uninstall green-tea-ui@green-tea-ui`.

Đã cài bản cũ `tvs-ui-skills@tra-viet-so-ui-skills`? Gỡ bản đó (`claude plugin uninstall tvs-ui-skills@tra-viet-so-ui-skills`, `claude plugin marketplace remove tra-viet-so-ui-skills`) rồi cài lại theo lệnh trên.

### Chép thủ công

```bash
git clone https://github.com/hillnguyen528/green-tea-ui.git
cd green-tea-ui
./install.sh /đường/dẫn/dự-án     # vào <dự-án>/.claude/skills/
./install.sh --global            # vào ~/.claude/skills/
```

Kiểm tra: thư mục đích có 6 thư mục `green-tea-*`, mỗi thư mục có `SKILL.md`. Gỡ: xóa 6 thư mục đó.

Nên chọn một trong hai cách. Cài cả hai thì Claude thấy hai bản của cùng skill (một bản có tiền tố `green-tea-ui:`).

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

Cung cấp các skill dùng cùng Green Tea UI:

- `vercel:nextjs`: App Router, Server Components, metadata, `next/image`, `next/font`.
- `vercel:shadcn`: khởi tạo và dùng shadcn/ui (`shadcn init -d`), theming.
- `vercel:react-best-practices`: rà soát component sau khi viết nhiều TSX.
- `vercel:verification`, agent `vercel:performance-optimizer`: kiểm tra luồng và tối ưu Core Web Vitals.

### frontend-design (nên có)

```bash
claude plugin install frontend-design@claude-plugins-official
```

Skill thiết kế giao diện của Anthropic. Dùng cùng `green-tea-design-system`: skill đó lo hướng thẩm mỹ chung, `green-tea-design-system` đặt quy tắc và token cụ thể.

### Trình duyệt cho nghiệm thu (nên có, chọn một)

```bash
claude plugin install chrome-devtools-mcp@claude-plugins-official
# hoặc
claude plugin install playwright@claude-plugins-official
```

`green-tea-ui-qa` yêu cầu chạy app thật, chụp ở 360, 768, 1440 px và đọc console. Một trong hai plugin này cho Claude thao tác trình duyệt bằng tay. Việc quét hàng loạt đã có script sẵn trong skill (mục 4); tiện ích Claude in Chrome cũng dùng được.

### Skill shadcn chính thức (tùy chọn)

```bash
npx skills add shadcn-ui/ui
```

Lệnh hỏi chọn skill và nơi cài; chọn `shadcn`. Bổ sung cho `vercel:shadcn` với hướng dẫn của chính shadcn/ui.

### Có sẵn, không cần cài

- `dataviz`: quy tắc vẽ biểu đồ (màu, contrast, tooltip, bảng thay thế).

## 4. Script nghiệm thu

Skill `green-tea-ui-qa` có sẵn thư mục `scripts/`. Cài phụ thuộc một lần:

```bash
# Cài dạng plugin: thư mục skill nằm trong ~/.claude/plugins/cache/green-tea-ui/green-tea-ui/<phiên bản>/
# Cài thủ công: <dự-án>/.claude/skills/green-tea-ui-qa/
cd <thư-mục-skill-green-tea-ui-qa>/scripts && npm install
```

Dùng:

```bash
node smoke.mjs --base http://localhost:3000 --routes /,/about --widths 360,1440
node shots.mjs --base http://localhost:3000 --path / --width 360 --height 760 --mobile --out ./qa/home-360
node contact-sheet.mjs --in ./qa/home-360 --mobile
pnpm build && pnpm start --port 3211   # ở terminal khác
./lighthouse.sh http://localhost:3211 / /about
```

Script tự tìm Chrome trên macOS, Linux, Windows; đặt `CHROME_PATH` nếu Chrome nằm chỗ khác. Mục tiêu Lighthouse mobile: Performance ≥ 85, Accessibility ≥ 90 (nên 100), SEO ≥ 90. Điểm Performance dao động vài điểm giữa các lần đo trên máy cá nhân; tắt dev server khi đo.

## 5. Khởi tạo một dự án mới theo cùng stack

```bash
pnpm create next-app@latest my-app --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --turbopack --yes
cd my-app
pnpm dlx shadcn@latest init -d
pnpm add motion lucide-react
```

Sau đó mở Claude Code trong `my-app` và yêu cầu: "Dùng green-tea-design-system và green-tea-motion: chép `theme.css` vào `globals.css`, cài font có subset tiếng Việt, chép các primitive trong `references/` vào dự án."
