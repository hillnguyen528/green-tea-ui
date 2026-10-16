---
name: tvs-design-system
description: Design system của Trà Việt Số — token màu, typography tiếng Việt, layout, cấu trúc card và các quy tắc tránh cảm giác template. Dùng TRƯỚC KHI viết hoặc sửa bất kỳ UI nào (page, section, component, CSS) trong dự án này.
---

# Trà Việt Số — Design system

Hướng thẩm mỹ: **premium editorial + interactive atlas + social community**. Trẻ nhưng không rẻ, Việt Nam nhưng không hoài cổ, cao cấp nhưng gần gũi. Mỗi màn hình phải trả lời được: "Trà Việt không cũ".

## Màu

Token khai báo trong `src/app/globals.css` (`@theme`), dùng qua class Tailwind (`bg-tea-ink`, `text-oolong-gold`…). Không viết mã hex trực tiếp trong component.

| Token | Hex | Vai trò |
|---|---|---|
| `tea-ink` | `#18231B` | Text chính, nền tối |
| `tea-leaf` | `#2F6B45` | Primary, nút chính |
| `young-leaf` | `#8CCB7A` | Accent trẻ, chỉ dùng trên nền tối hoặc làm điểm nhấn nhỏ |
| `oolong-gold` | `#C89B45` | Premium accent, eyebrow, đường kẻ, số liệu |
| `shan-mist` | `#EEF3EA` | Nền section nhạt |
| `porcelain` | `#FAF8F2` | Nền trang mặc định |
| `rose-clay` | `#B96D5A` | Con người, câu chuyện, cộng đồng |
| `charcoal` | `#101513` | Hero tối, footer |

Quy tắc:

- Xanh lá không được chiếm quá nửa bảng màu của một màn hình. Luôn có một lớp ấm (gold hoặc clay) và một lớp trung tính (porcelain hoặc charcoal).
- Section xen kẽ sáng/tối để tạo nhịp: porcelain → charcoal → shan-mist, không ba section sáng liền nhau ở trang chủ.
- Text trên ảnh luôn có lớp phủ gradient từ `charcoal`; contrast body text ≥ 4.5:1.
- Chữ màu nhấn (eyebrow, số thứ tự, link nhấn) dùng `text-gold` và `text-clay`, không dùng `text-oolong-gold`/`text-rose-clay`. Hai utility này tự đổi sắc theo nền gần nhất (`bg-porcelain`, `bg-shan-mist`, `bg-card` là nền sáng; `bg-charcoal`, `bg-tea-ink` là nền tối) để luôn đạt 4.5:1. `oolong-gold` và `rose-clay` chỉ dùng cho nền, viền và icon tô đặc.
- `young-leaf` chỉ dùng trên nền tối.
- Chữ phụ trên nền sáng dùng tối thiểu `text-tea-ink/65` (`/70` cho chữ 13px); `/60` trở xuống không đạt 4.5:1 trên `porcelain`.
- Màu theo ngữ nghĩa: Atlas/vùng trà = leaf, cấp độ cao cấp = gold, Stories/thành viên = clay.

## Typography

- Display/heading: **Fraunces** (`font-display`), weight 400–600, có thể dùng italic cho một cụm từ nhấn trong heading.
- Body/UI: **Be Vietnam Pro** (`font-sans`), chỉ nạp weight 400 và 500. Không dùng `font-semibold`/`font-bold`: thêm weight làm chậm LCP trên mobile.
- Cả hai nạp bằng `next/font/google` với `subsets: ["latin", "vietnamese"]`. Mọi font thêm mới phải có subset `vietnamese`; kiểm tra bằng chuỗi "Ướp hương trà Shan Tuyết ở Suối Giàng".
- Thang chữ dùng `clamp()`: hero `clamp(2.75rem, 8vw, 7rem)`, h2 section `clamp(2rem, 4.5vw, 3.75rem)`, h3 `1.5rem`, body `1rem`–`1.125rem`, nhỏ nhất `0.8125rem` (không nhỏ hơn trên mobile).
- Heading: `line-height` 1.05–1.15, `text-wrap: balance`. Dấu tiếng Việt chồng (ế, ộ, ữ) cần line-height ≥ 1.1, không để dấu bị cắt bởi `overflow-hidden`.
- Eyebrow: chữ hoa, `tracking-[0.2em]`, cỡ 0.75rem, màu gold hoặc clay, đặt trên mỗi heading section.
- Không dùng chữ hoa toàn bộ cho heading tiếng Việt dài.

## Layout

- Khung nội dung `max-w-7xl`, gutter 20px mobile / 40px desktop. Hero và ảnh lớn được tràn viền.
- Khoảng cách dọc giữa section: `py-20` mobile, `py-32` desktop. Khoảng thở là một phần của cảm giác cao cấp, không nén lại.
- Ưu tiên bố cục bất đối xứng (lưới 12 cột, tỉ lệ 5/7 hoặc 4/8), ảnh lệch hàng, số thứ tự lớn. Tránh ba card đều nhau có icon ở trên.
- Bo góc: card `rounded-2xl`/`rounded-3xl`, nút dạng pill `rounded-full`. Bóng đổ rất nhẹ hoặc không; phân lớp bằng màu nền và đường kẻ 1px.
- Mobile là ưu tiên: thiết kế từ 360px lên, vùng bấm tối thiểu 44px.

## Card

- **TeaCard**: ảnh tỉ lệ 4:5, chấm màu nước trà, tên (display), vùng, `TeaLevelBadge`, 2–3 flavor notes dạng chip, độ khó pha. Hover hiện thêm flavor notes và nút lưu/hỏi AI.
- **TeaRegionCard**: ảnh 3:2 hoặc 16:10, tên vùng lớn đè lên ảnh, độ cao + khí hậu dạng số liệu, loại trà nổi bật.
- **StoryCard**: cover, avatar + tác giả, tiêu đề display, excerpt 2 dòng (`line-clamp-2`), số like/lưu/chia sẻ. Tông clay.
- Cấp độ trà luôn có cả nhãn chữ lẫn màu (không truyền tin chỉ bằng màu).

## Không làm

- Không gradient tím/xanh chung chung, không glassmorphism tràn lan, không emoji làm icon (dùng `lucide-react`).
- Không hero chỉ có gradient: màn đầu phải có ảnh trà thật.
- Không lặp một kiểu section quá hai lần liên tiếp.
- Không dùng họa tiết hoài cổ nặng (trống đồng, hoa văn giả cổ, font thư pháp).

## Ảnh

Ảnh đặt trong `public/images/`, nguồn và giấy phép ghi ở `public/images/CREDITS.md`. Luôn dùng `next/image` với `sizes` đúng, `alt` tiếng Việt mô tả nội dung ảnh, `preload` chỉ cho ảnh hero (Next 16 đã bỏ `priority`).

## Tệp tham chiếu

Khi dự án chưa có các tệp được nhắc ở trên, đọc `references/code.md` trong thư mục skill này: nó chứa nguyên văn mã đã hiện thực các quy tắc (token, font, primitive), dùng làm điểm xuất phát.
