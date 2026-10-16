# Green Tea UI

Bộ skill cho [Claude Code](https://claude.com/claude-code) để dựng giao diện web cao cấp theo phong cách **tạp chí**: bố cục bất đối xứng, nhịp sáng tối, chuyển động chậm rãi có chủ đích, chữ tiếng Việt chuẩn dấu, đạt accessibility và hiệu năng trên mobile.

Green Tea UI được rút ra từ quá trình dựng Trà Việt Số, một nền tảng trải nghiệm trà Việt, rồi viết lại thành bộ dùng chung cho mọi dự án. Stack tham chiếu: Next.js 16, Tailwind CSS 4, shadcn/ui, motion. Skill viết bằng tiếng Việt.

## Bộ skill

| Skill | Dùng khi | Kèm theo |
|---|---|---|
| `green-tea-design-system` | Viết hoặc sửa bất kỳ UI nào; dựng theme cho dự án mới | `theme.css` (8 token, contrast tự động, keyframes), nút, tiêu đề section, form, bộ lọc trên URL, nút chia sẻ, xóa hai bước |
| `green-tea-motion` | Thêm animation, transition, micro-interaction | Hằng số, `Reveal`, `Parallax`, loader `Steam`, provider reduced motion |
| `green-tea-page-patterns` | Dựng trang mới, sắp xếp section, khi trang trông giống template | Khung trang chủ 8 nhịp, công thức section, trang con, trạng thái; ví dụ mã đầy đủ |
| `green-tea-ux-writing` | Viết chữ giao diện tiếng Việt, dữ liệu mẫu, prompt AI | Mẫu hồ sơ giọng cho dự án |
| `green-tea-ui-qa` | Trước khi báo một trang là xong | Script chụp trang, smoke test, ghép ảnh, Lighthouse; bảng lỗi đã gặp thật |
| `green-tea-vietnam-map` | Cần bản đồ Việt Nam tương tác | Đường bờ biển Natural Earth, phép chiếu, component `VietnamMap` (có Hoàng Sa, Trường Sa) |

## Cài đặt

### Cách 1: plugin (khuyên dùng)

```bash
claude plugin marketplace add hillnguyen528/green-tea-ui
claude plugin install green-tea-ui@green-tea-ui
```

Hoặc trong phiên Claude Code: `/plugin marketplace add hillnguyen528/green-tea-ui` rồi `/plugin install green-tea-ui@green-tea-ui`.

Mở phiên Claude Code mới. Skill hiện với tiền tố plugin, ví dụ `green-tea-ui:green-tea-design-system`. Cập nhật: `claude plugin update green-tea-ui@green-tea-ui`.

### Cách 2: chép vào dự án

```bash
git clone https://github.com/hillnguyen528/green-tea-ui.git
cd green-tea-ui
./install.sh /đường/dẫn/dự-án      # vào <dự-án>/.claude/skills/
./install.sh --global             # vào ~/.claude/skills/, cho mọi dự án
```

Không ghi đè skill đã có trừ khi thêm `--force`. Chọn cách này khi muốn sửa skill theo thương hiệu riêng và commit cùng dự án. Trên Windows: chép các thư mục trong `plugins/green-tea-ui/skills/` vào `<dự-án>\.claude\skills\`.

### Skill và công cụ bổ trợ

| Thành phần | Vai trò | Lệnh cài | Mức độ |
|---|---|---|---|
| Plugin `vercel` | Skill `nextjs`, `shadcn`, `react-best-practices`, `verification` | `claude plugin install vercel@claude-plugins-official` | Cần với Next.js |
| Plugin `frontend-design` | Skill thiết kế giao diện của Anthropic | `claude plugin install frontend-design@claude-plugins-official` | Nên có |
| Plugin `chrome-devtools-mcp` hoặc `playwright` | Cho Claude thao tác trình duyệt khi nghiệm thu | `claude plugin install chrome-devtools-mcp@claude-plugins-official` | Nên có |
| Skill `shadcn` chính thức | Hướng dẫn component và CLI shadcn/ui | `npx skills add shadcn-ui/ui` | Tùy chọn |
| Node.js 20+, pnpm, Google Chrome | Chạy dự án, script nghiệm thu, Lighthouse | Xem docs | Cần |

Chi tiết, cách kiểm tra và gỡ: [docs/install.md](docs/install.md).

## Bắt đầu một dự án

```bash
pnpm create next-app@latest my-app --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --turbopack --yes
cd my-app && pnpm dlx shadcn@latest init -d && pnpm add motion lucide-react
```

Rồi trong Claude Code:

```text
Dùng green-tea-design-system: chép theme.css vào globals.css, cài font Fraunces và Be Vietnam Pro với subset tiếng Việt, chép các primitive cần dùng. Sau đó dùng green-tea-page-patterns dựng trang chủ cho [mô tả sản phẩm].
```

```text
Chạy green-tea-ui-qa cho các route /, /pricing, /blog ở 360 và 1440px, sửa mọi lỗi tìm thấy rồi báo điểm Lighthouse.
```

Đổi màu, font, giọng cho thương hiệu khác: [docs/theming.md](docs/theming.md).

## Cấu trúc repo

```text
.claude-plugin/marketplace.json           khai báo marketplace
plugins/green-tea-ui/
  .claude-plugin/plugin.json              khai báo plugin
  skills/green-tea-*/SKILL.md             nội dung skill
  skills/green-tea-*/references/          mã tham chiếu
  skills/green-tea-ui-qa/scripts/         script nghiệm thu
install.sh                                cài thủ công
docs/install.md                           cài đặt chi tiết và skill bổ trợ
docs/theming.md                           đổi thương hiệu
docs/ALL-SKILLS.md                        cả 6 skill gộp một tệp
CHANGELOG.md                              lịch sử thay đổi
```

## Giới hạn

- Mã tham chiếu viết cho Next.js 16 (App Router, Cache Components), Tailwind CSS 4 và thư viện `motion`. Với phiên bản khác, kiểm tra lại các mục được ghi rõ trong skill.
- `green-tea-page-patterns/references/examples.md` là mã nguyên văn từ Trà Việt Số, còn import dữ liệu riêng của dự án đó; dùng để học bố cục, không chép nguyên.

## Giấy phép

[MIT](LICENSE).
