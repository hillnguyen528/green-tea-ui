---
name: green-tea-design-system
description: Design system Green Tea cho web app cao cấp, ưu tiên tiếng Việt — 8 token màu theo vai trò, contrast tự động theo nền, font có subset tiếng Việt, thang chữ, layout bất đối xứng, card, form và những điều không làm. Dùng TRƯỚC KHI viết hoặc sửa bất kỳ UI nào (page, section, component, CSS), và khi dựng theme cho dự án mới.
---

# Green Tea — Design system

Hướng thẩm mỹ: **premium editorial**. Trẻ nhưng không rẻ, có bản sắc nhưng không hoài cổ, cao cấp nhưng gần gũi. Giao diện phải trông như một tạp chí được dàn trang, không như template landing page.

Mã hiện thực nằm trong `references/`. Dự án chưa có theme thì chép `references/theme.css` vào `globals.css` (Tailwind CSS 4) và các primitive cần dùng vào `src/components/ui/`.

## Màu theo vai trò

Theme mặc định "Green Tea". Đổi thương hiệu bằng cách đổi 8 giá trị hex, giữ nguyên vai trò và tên token.

| Token | Mặc định | Vai trò |
|---|---|---|
| `ink` | `#18231B` | Chữ chính; nền tối thứ hai |
| `leaf` | `#2F6B45` | Primary: nút chính, link, trạng thái chọn |
| `sprout` | `#8CCB7A` | Điểm nhấn tươi, chỉ dùng trên nền tối |
| `gold` | `#C89B45` | Accent cao cấp: nền nút nổi bật, đường kẻ, số liệu |
| `mist` | `#EEF3EA` | Nền section nhạt |
| `paper` | `#FAF8F2` | Nền trang mặc định |
| `clay` | `#B96D5A` | Accent ấm cho con người, cộng đồng, câu chuyện |
| `night` | `#101513` | Hero tối, footer |

Quy tắc:

- Không màu nào chiếm quá nửa một màn hình. Luôn có một lớp ấm (`gold` hoặc `clay`) và một lớp trung tính (`paper` hoặc `night`).
- Section xen kẽ sáng và tối để tạo nhịp, ví dụ `paper` → `night` → `mist`. Không để ba section sáng liền nhau.
- Gán màu theo ngữ nghĩa và giữ nhất quán trong cả sản phẩm, ví dụ: khám phá = `leaf`, cao cấp = `gold`, cộng đồng = `clay`.
- Không viết mã hex trong component; luôn dùng class token (`bg-paper`, `text-ink`…).

### Contrast

- **Chữ màu nhấn** (eyebrow, số thứ tự, link nhấn) dùng `text-highlight` (vai trò gold) và `text-warm` (vai trò clay), không dùng `text-gold`/`text-clay`. Hai utility này đọc biến CSS do nền gần nhất đặt: trên `bg-paper`, `bg-mist`, `bg-card` cho sắc sẫm; trên `bg-night`, `bg-ink` cho sắc sáng. Nhờ vậy luôn đạt 4.5:1. `gold` và `clay` chỉ dùng cho nền, viền và icon tô đặc.
- Khi đổi theme, tính lại 4 giá trị `--highlight-text`/`--warm-text` (sáng và tối) sao cho đạt ≥ 4.5:1 với nền tương ứng.
- Chữ phụ trên nền sáng: tối thiểu `text-ink/65`, và `text-ink/70` cho chữ 13px. Từ `/60` trở xuống không đạt 4.5:1 trên `paper`.
- `sprout` chỉ dùng trên nền tối.
- Chữ đặt trên ảnh luôn có lớp phủ gradient từ `night`.
- Kiểm tra contrast cả với phần tử nằm trong khối reveal: công cụ đo bỏ qua phần tử đang `opacity: 0`, nên điểm 100 lúc tải trang có thể che lỗi ở phần dưới.

## Chữ

- Hai họ font: một serif/display cho tiêu đề (`font-display`), một sans cho nội dung (`font-sans`). Mặc định: **Fraunces** và **Be Vietnam Pro**.
- Nạp bằng `next/font/google` với `subsets: ["latin", "vietnamese"]`. Mọi font phải có subset `vietnamese`; thử bằng chuỗi "Ướp hương trà Shan Tuyết ở Suối Giàng". Font khác có subset tiếng Việt: Lora, Playfair Display, Noto Serif (display); Inter, Noto Sans (sans).
- Font sans chỉ nạp weight 400 và 500. Không dùng `font-semibold`/`font-bold`: mỗi weight thêm làm chậm LCP trên mobile.
- Thang chữ dùng `clamp()`: hero `clamp(3.25rem, 11vw, 9rem)`, tiêu đề section `clamp(2rem, 4.5vw, 3.75rem)`, h3 `1.5rem`, nội dung `1rem`–`1.125rem`, nhỏ nhất `0.8125rem`.
- Tiêu đề: `line-height` 1.05–1.15, `text-wrap: balance`. Dấu tiếng Việt chồng (ế, ộ, ữ) cần line-height ≥ 1.1 và không bị `overflow-hidden` cắt.
- Một cụm từ trong tiêu đề được in nghiêng (`<em>`) bằng màu nhấn của section. Đây là chữ ký thị giác của theme.
- Eyebrow trên mỗi tiêu đề section: chữ hoa, `tracking-[0.2em]`, cỡ 0.75rem, `text-highlight` hoặc `text-warm`.
- Không viết hoa toàn bộ tiêu đề tiếng Việt dài.

## Layout

- Khung nội dung `container-page` (max 80rem, lề 20px mobile, 40px desktop). Hero và ảnh lớn tràn viền.
- Khoảng cách dọc giữa section: `py-20` mobile, `py-28`–`py-32` desktop. Khoảng thở là một phần của cảm giác cao cấp.
- Ưu tiên bố cục bất đối xứng trên lưới 12 cột (5/7, 4/8), ảnh lệch hàng, số thứ tự lớn. Tránh ba card bằng nhau có icon ở trên.
- Bo góc: card `rounded-3xl`, ảnh lớn `rounded-[2rem]`, nút dạng viên thuốc `rounded-full`. Gần như không đổ bóng; phân lớp bằng màu nền và đường kẻ 1px.
- Thiết kế từ 360px trở lên. Vùng bấm tối thiểu 44px (marker bản đồ dày đặc là ngoại lệ có phương án thay thế).
- Phần tử con của grid chứa danh sách cuộn ngang phải có `min-w-0`, nếu không cả cột phình ra trên mobile.

## Thành phần

Primitive có sẵn trong `references/`:

| Tệp | Dùng cho |
|---|---|
| `theme.css` | Token, keyframes, utility `container-page`, `eyebrow`, `display-hero`, `display-section`, contrast tự động, reduced motion |
| `cta-link.tsx` | Nút dạng link, 5 biến thể (`gold`, `leaf`, `ink`, `outlineLight`, `outlineDark`), cao 48px |
| `section-header.tsx` | Eyebrow + tiêu đề + câu dẫn, tông sáng hoặc tối |
| `field.tsx` | Nhãn, gợi ý, lỗi gắn `aria-describedby`; `ChipToggle` có `aria-pressed` |
| `filter-chips.tsx`, `url-filters.ts` | Bộ lọc nhiều nhóm, trạng thái lưu trên URL để chia sẻ được |
| `share-button.tsx` | Web Share API, không có thì sao chép liên kết |
| `confirm-delete-button.tsx` | Xóa hai bước, tự hủy sau 4 giây |

Card:

- Ảnh tỉ lệ cố định (4:5 sản phẩm, 4:3 hoặc 16:10 nội dung), nhãn nằm trên ảnh, tiêu đề bằng font display.
- Cả card bấm được bằng link phủ `after:absolute after:inset-0`; nút phụ trên card đặt `z-10` và nằm sau link trong DOM.
- Hover: ảnh phóng 1.05 trong 0.7s, gạch chân tiêu đề chạy từ trái sang. Thông tin chỉ hiện khi hover thì trên cảm ứng phải hiện sẵn.
- Cấp độ hay trạng thái luôn có cả chữ lẫn màu, có thể thêm chấm đếm (●●○○).
- Card đầu trang (ngay dưới `h1`) dùng `h2`, các card khác dùng `h3`.

Form:

- Ô nhập cao ≥ 48px, bo `rounded-2xl`, lỗi bằng chữ nói rõ cách sửa, gắn với ô qua `aria-describedby`.
- Nút gửi ở cuối form; với form dài, đặt thanh hành động `sticky bottom-0`.

## Không làm

- Gradient tím xanh chung chung, glassmorphism tràn lan, emoji làm icon (dùng `lucide-react`).
- Hero chỉ có gradient: màn đầu phải có ảnh thật liên quan sản phẩm.
- Lặp một kiểu section quá hai lần liên tiếp.
- Họa tiết hoài cổ nặng, font thư pháp.

## Ảnh

- Dùng `next/image` với `sizes` đúng. Chỉ ảnh LCP có `preload` (Next 16 bỏ `priority`) và `quality={60}`.
- `alt` mô tả đúng nội dung ảnh bằng ngôn ngữ giao diện; ảnh trang trí `alt=""`.
- Ảnh tạm lấy từ nguồn có giấy phép mở (Wikimedia Commons: CC0, CC BY, CC BY-SA), ghi nguồn và giấy phép trong `public/images/CREDITS.md`. Ảnh dùng thay chủ thể khác phải ghi rõ, và `alt` phải tả đúng ảnh chứ không tả chủ thể mong muốn.
- Có thể phục vụ AVIF: `images: { formats: ["image/avif", "image/webp"], qualities: [60, 75] }` trong `next.config`.
