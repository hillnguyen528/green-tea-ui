# Trà Việt Số UI Skills

Bộ 5 skill cho [Claude Code](https://claude.com/claude-code) để dựng giao diện web cao cấp: bố cục kiểu tạp chí, chuyển động có chủ đích, chữ tiếng Việt chuẩn dấu, đạt accessibility và hiệu năng trên mobile.

Các skill được rút ra trong quá trình dựng **Trà Việt Số**, nền tảng trải nghiệm trà Việt (Next.js 16, Tailwind CSS 4, shadcn/ui, motion). Skill viết bằng tiếng Việt.

## Có gì trong bộ skill

| Skill | Dùng khi | Mang sang dự án khác |
|---|---|---|
| `tvs-design-system` | Viết hoặc sửa bất kỳ UI nào: màu, chữ, layout, card, những điều không làm. Kèm `references/code.md` (globals.css, font, nút, tiêu đề section). | Giữ quy tắc, thay thương hiệu và bảng màu |
| `tvs-motion` | Thêm animation, transition, micro-interaction. Kèm `references/code.md` (hằng số, Reveal, Parallax, Steam, Hero). | Dùng gần như nguyên |
| `tvs-ui-qa` | Trước khi báo một trang là xong: 360px, accessibility, Lighthouse, SEO, các lỗi đã gặp thật. | Dùng gần như nguyên, sửa mục "Sản phẩm" |
| `tvs-content-voice` | Viết chữ hiển thị: heading kể chuyện, microcopy, giới hạn nội dung sức khỏe. | Chỉ giữ khung |
| `tvs-atlas-map` | Làm bản đồ Việt Nam tương tác (bắt buộc có Hoàng Sa, Trường Sa). | Khi cần bản đồ Việt Nam |

## Cài nhanh

### Cách 1: cài dạng plugin (khuyên dùng)

Repo này là một marketplace Claude Code. Chạy trong terminal:

```bash
claude plugin marketplace add hillnguyen528/tra-viet-so-ui-skills
claude plugin install tvs-ui-skills@tra-viet-so-ui-skills
```

Hoặc gõ trong phiên Claude Code:

```text
/plugin marketplace add hillnguyen528/tra-viet-so-ui-skills
/plugin install tvs-ui-skills@tra-viet-so-ui-skills
```

Mở phiên Claude Code mới. Skill hiện với tên có tiền tố plugin, ví dụ `tvs-ui-skills:tvs-design-system`. Cập nhật về sau bằng `claude plugin update tvs-ui-skills@tra-viet-so-ui-skills`.

### Cách 2: chép thẳng skill vào dự án

```bash
git clone https://github.com/hillnguyen528/tra-viet-so-ui-skills.git
cd tra-viet-so-ui-skills
./install.sh /đường/dẫn/dự-án      # chỉ cho một dự án: <dự-án>/.claude/skills/
./install.sh --global             # cho mọi dự án: ~/.claude/skills/
```

Script không ghi đè skill đã có; thêm `--force` để ghi đè. Cách này cho phép bạn sửa skill ngay trong dự án, phù hợp khi chuyển bộ skill sang thương hiệu khác.

Trên Windows không có bash: chép từng thư mục trong `plugins/tvs-ui-skills/skills/` vào `<dự-án>\.claude\skills\`.

## Cài thêm các skill và công cụ bổ trợ

Bộ skill này đặt quy tắc thiết kế. Để Claude dựng và kiểm tra giao diện tốt như ở Trà Việt Số, cài thêm những thứ dưới đây. Hướng dẫn chi tiết, cách kiểm tra đã cài đúng và cách gỡ ở [docs/install.md](docs/install.md).

| Thành phần | Vai trò | Lệnh cài | Mức độ |
|---|---|---|---|
| Plugin `vercel` | Skill `nextjs`, `shadcn`, `react-best-practices`, `verification`, agent `performance-optimizer` | `claude plugin install vercel@claude-plugins-official` | Cần (dự án Next.js) |
| Plugin `frontend-design` | Skill thiết kế giao diện của Anthropic, tránh cảm giác "AI template" | `claude plugin install frontend-design@claude-plugins-official` | Nên có |
| Plugin `chrome-devtools-mcp` hoặc `playwright` | Cho Claude mở trình duyệt, chụp màn hình, đọc console để nghiệm thu | `claude plugin install chrome-devtools-mcp@claude-plugins-official` | Nên có |
| Skill `shadcn` của shadcn/ui | Hướng dẫn chính thức về component và CLI shadcn | `npx skills add shadcn-ui/ui` | Tùy chọn |
| Node.js 20+, pnpm, Google Chrome | Chạy dự án, Lighthouse, chụp màn hình | Xem docs | Cần |

Skill `dataviz` (biểu đồ) có sẵn trong Claude Code, không cần cài.

## Dùng thế nào

Skill tự được gọi khi việc bạn yêu cầu khớp với mô tả của skill. Có thể gọi rõ ràng:

```text
Dùng skill tvs-design-system và tvs-motion, dựng trang chủ cho [dự án] với hero ảnh lớn, ba CTA và một tương tác trong 5 giây đầu.
```

```text
Chạy checklist tvs-ui-qa cho trang /pricing ở 360px và 1440px, sửa mọi lỗi tìm thấy.
```

## Dùng cho dự án khác

Skill viết riêng cho Trà Việt Số (tên `tvs-*`, bảng màu trà, ví dụ về trà). Cài bằng cách 2 vào dự án mới rồi nhờ Claude chuyển đổi theo [docs/adapting.md](docs/adapting.md).

## Cấu trúc repo

```text
.claude-plugin/marketplace.json        khai báo marketplace
plugins/tvs-ui-skills/
  .claude-plugin/plugin.json           khai báo plugin
  skills/<tên-skill>/SKILL.md          nội dung skill
  skills/<tên-skill>/references/       mã tham chiếu (design system, motion)
install.sh                             cài thủ công
docs/install.md                        cài đặt chi tiết và skill bổ trợ
docs/adapting.md                       chuyển bộ skill sang dự án khác
docs/ALL-UI-SKILLS.md                  cả 5 skill gộp một tệp để đọc nhanh
```

## Giới hạn

- Skill mô tả quy tắc; `references/code.md` chứa phần mã cốt lõi, không phải toàn bộ component của Trà Việt Số.
- Một số quy tắc gắn với phiên bản: Next.js 16 (`preload` thay `priority`, đọc `params` trong `Suspense` khi bật Cache Components), Tailwind CSS 4 (`@theme`, `@utility`), thư viện `motion`.

## Giấy phép

[MIT](LICENSE). Bạn được dùng, sửa và phân phối lại bộ skill, kể cả cho mục đích thương mại, miễn giữ thông báo bản quyền.
