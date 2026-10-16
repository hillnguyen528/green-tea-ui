---
name: green-tea-ui-qa
description: Quy trình và checklist nghiệm thu UI theo chuẩn Green Tea — chạy app thật, chụp ở 360/768/1440px, smoke test mọi route, accessibility, Lighthouse mobile, SEO/Open Graph, cùng danh sách lỗi đã gặp thật (Next.js 16, Tailwind 4). Có sẵn script trong thư mục scripts/. Dùng sau khi xong một trang hoặc section, và TRƯỚC KHI báo một phần việc UI là xong.
---

# Green Tea — Nghiệm thu UI

Build qua và lint sạch chưa phải là xong. Phải chạy app thật, nhìn ảnh chụp và đo.

## Script có sẵn

Thư mục `scripts/` của skill này. Cài một lần: `cd <thư-mục-skill>/scripts && npm install` (cần Node 20+ và Google Chrome; đặt `CHROME_PATH` nếu Chrome nằm chỗ khác).

| Script | Làm gì |
|---|---|
| `shots.mjs --base <url> --path /x --width 360 --height 760 --mobile --out <dir>` | Cuộn từng màn hình và chụp (đợi reveal chạy xong), in JSON: status, `scrollWidth`, số `h1`, phần tử tràn ngang, lỗi console, request lỗi |
| `contact-sheet.mjs --in <dir> [--mobile]` | Ghép các ảnh chụp thành một tờ để xem cả trang trong một lần đọc ảnh |
| `smoke.mjs --base <url> --routes /,/a,/b --widths 360,1440` | Mở mọi route ở mọi bề rộng, báo status khác 200, cuộn ngang, số `h1` khác 1, lỗi console; sau đó mở mọi link nội bộ tìm thấy và báo link hỏng |
| `lighthouse.sh <url> /a /b` | Lighthouse mobile cho từng route, in điểm 4 nhóm, LCP và các audit trượt |

Nếu có công cụ trình duyệt (Claude in Chrome, chrome-devtools-mcp, playwright), dùng chúng để thao tác tay; script dùng để quét hàng loạt và lặp lại.

## Quy trình

1. `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`: không lỗi.
2. `pnpm dev`; chạy `smoke.mjs` cho mọi route đã đổi.
3. Chụp từng trang đã đổi ở 360 và 1440 (thêm 768 nếu có lưới phức tạp), ghép tờ, **xem ảnh**: bố cục, chữ bị cắt, dấu tiếng Việt, màu, khoảng thở.
4. Thử tương tác chính bằng script hoặc trình duyệt: lọc, chọn, gửi form, luồng nhiều bước, trạng thái trống và lỗi.
5. Trang dành cho thành viên: kiểm tra ở trạng thái **đã đăng nhập**, không chỉ màn chặn.
6. Đo Lighthouse trên bản production (`pnpm build && pnpm start`), tắt dev server khi đo, đo 2 lần với trang quan trọng.
7. Báo cáo đúng những gì đã kiểm tra, kèm con số; mục chưa kiểm tra thì nói là chưa.

## Checklist

**Responsive**
- [ ] Không cuộn ngang ở 360px. `scrollWidth` có thể vẫn bằng bề rộng nếu section có `overflow-hidden`, nên phải nhìn ảnh.
- [ ] Chữ không bị cắt hay tràn khỏi card; dấu tiếng Việt không bị xén.
- [ ] Chữ nhỏ nhất ≥ 13px; vùng bấm ≥ 44px.
- [ ] Thứ chỉ hiện khi hover thì trên cảm ứng phải hiện sẵn hoặc bấm được.
- [ ] Menu mobile mở/đóng được, khóa cuộn nền, đóng bằng Escape.

**Sản phẩm** (sửa theo dự án)
- [ ] Màn đầu có ảnh thật; hiểu sản phẩm trong 10 giây.
- [ ] Có tương tác dùng được trong 5 giây đầu.
- [ ] Tới nội dung quan trọng nhất trong ≤ 3 click.
- [ ] Trang không giống template: bố cục có nhịp, không lặp ba card bằng nhau.

**Accessibility** (mục tiêu Lighthouse ≥ 90, nên đạt 100)
- [ ] Contrast ≥ 4.5:1 cho mọi chữ, kể cả chữ trên ảnh và chữ trong khối reveal ở cuối trang.
- [ ] Mỗi trang một `h1`; card đầu trang ngay dưới `h1` dùng `h2`.
- [ ] Ảnh nội dung có `alt` tả đúng ảnh; ảnh trang trí `alt=""`.
- [ ] Nút chỉ có icon có `aria-label`; nút bật/tắt có `aria-pressed`.
- [ ] Dùng được bằng bàn phím, focus ring nhìn thấy.
- [ ] Lỗi form bằng chữ, gắn `aria-describedby`.
- [ ] Không truyền tin chỉ bằng màu.
- [ ] `dl` chỉ chứa `dt`/`dd` hoặc `div` bọc trực tiếp chúng.
- [ ] Bật `prefers-reduced-motion`: không còn parallax và hiệu ứng lặp, nội dung vẫn hiện đủ.

**Hiệu năng** (mục tiêu Lighthouse mobile ≥ 85)
- [ ] Ảnh LCP có `preload` và `quality={60}`, không có animation mờ dần.
- [ ] Font qua `next/font`, font sans chỉ 2 weight.
- [ ] Không có layout shift (CLS = 0).
- [ ] Client component chỉ ở chỗ cần tương tác; trang nội dung được dựng tĩnh.

**SEO và chia sẻ**
- [ ] Mỗi trang public có `title`, `description`, `canonical`, `og:*`, `twitter:card`. Open Graph của trang con ghi đè toàn bộ bản ở layout, nên dùng một hàm dựng metadata chung để không mất `siteName`, `locale`.
- [ ] `lang` đúng ngôn ngữ trên `<html>`.
- [ ] Bài viết có JSON-LD `Article` (escape `<` thành `<`).
- [ ] Trang riêng tư (dashboard, hồ sơ chỉ có trên trình duyệt) đặt `robots: { index: false }`.

## Lỗi đã gặp thật

| Triệu chứng | Nguyên nhân | Cách sửa |
|---|---|---|
| Cả cột phình, trang cuộn ngang trên mobile | Phần tử con của grid chứa danh sách `overflow-x-auto` thiếu `min-w-0` | Thêm `min-w-0` cho phần tử con của grid |
| Dev báo `encountered URL data during prerendering` | Đọc `params` ngoài `Suspense` khi bật Cache Components (Next 16) | Có `generateStaticParams`; trang trả về `<Suspense>{params.then(...)}</Suspense>` |
| Dev báo `Could not validate that a segment ... instant navigation` | Layout chặn quyền không dựng trang con ở server | `export const instant = false` trong trang đó |
| `generateStaticParams` trả mảng rỗng làm build lỗi | Cache Components yêu cầu ít nhất một tham số | Trả ít nhất một giá trị thật |
| Ảnh `fill` báo parent `position: static` | Bọc ảnh trong `motion.div` của parallax | Thêm `relative` cho khối bọc |
| Marker bản đồ trôi khỏi hình | Khung có `max-h-*` làm lệch tỉ lệ với SVG | Giới hạn bằng chiều rộng tính từ chiều cao (prop `maxHeight`) |
| Sửa `globals.css` mà giao diện dev không đổi | Cache Turbopack dev giữ CSS cũ, kể cả sau khi khởi động lại | Tắt dev, xóa `.next/dev`, chạy lại; bản `build` không bị |
| Dev báo hàm không tồn tại, lệch hydration sau khi sửa tệp bằng script | Dev server giữ module cũ | Khởi động lại dev rồi kiểm tra lại trước khi kết luận |
| Lighthouse báo contrast ở chữ vàng/đất nung | Dùng màu accent làm màu chữ trên nền sáng | Dùng `text-highlight` / `text-warm` |
| Lighthouse báo `heading-order` | Card đầu trang dùng `h3` ngay sau `h1` | Cho card đầu trang dùng `h2` |
| `text-accent` không ra màu mong muốn | Trùng tên với token `accent` của shadcn/ui | Không đặt utility trùng tên token có sẵn |
| Script test bấm trượt hoặc không thấy nút | Thanh `sticky` che nút; nút của bước sau chưa xuất hiện do `AnimatePresence` | Cuộn phần tử vào giữa trước khi bấm; chờ phần tử xuất hiện thay vì chờ cố định |
| Chữ trong nút có chữ cái đầu viết hoa bằng CSS | Nội dung DOM vẫn viết thường | Tìm theo nội dung DOM (`textContent`), không theo chữ hiển thị |
