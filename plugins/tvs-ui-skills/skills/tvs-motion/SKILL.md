---
name: tvs-motion
description: Bộ quy tắc chuyển động của Trà Việt Số — duration, easing, scroll reveal, parallax, hover card, hơi trà, page transition, reduced motion và ngân sách hiệu năng mobile. Dùng khi thêm hoặc sửa bất kỳ animation, transition hay micro-interaction nào.
---

# Trà Việt Số — Motion

Motion là điểm ăn tiền của sản phẩm, nhưng phải chậm rãi như nhịp pha trà: mềm, có chủ đích, không nhấp nháy.

## Thư viện

Dùng gói `motion` (import từ `motion/react`). Component có animation là client component (`"use client"`), giữ càng nhỏ càng tốt để phần còn lại của trang vẫn là server component. Các primitive dùng chung nằm ở `src/components/motion/`; dùng lại thay vì viết variants mới ở từng nơi.

## Hằng số

Khai báo một lần ở `src/lib/motion.ts`:

| Tên | Giá trị | Dùng cho |
|---|---|---|
| `ease.out` | `[0.22, 1, 0.36, 1]` | Mọi chuyển động xuất hiện |
| `ease.inOut` | `[0.65, 0, 0.35, 1]` | Page transition, panel trượt |
| `duration.fast` | 0.2s | Hover, nhấn nút, đổi màu |
| `duration.base` | 0.5s | Card, panel, tooltip |
| `duration.slow` | 0.9s | Reveal heading, ảnh hero |
| `stagger` | 0.08s | Danh sách card, từng dòng chữ |

Không dùng duration dưới 0.15s cho thứ gì nhìn thấy được, không dùng spring nảy (bounce > 0.2).

## Mẫu chuyển động

- **Scroll reveal**: opacity 0 → 1, y 24px → 0, `duration.slow`, `viewport={{ once: true, margin: "-10%" }}`. Chỉ chạy một lần, không lặp khi cuộn ngược.
- **Heading hero**: từng dòng trượt lên từ sau mặt nạ `overflow-hidden`, stagger. Chừa `padding-top` cho dấu tiếng Việt khỏi bị cắt.
- **Parallax hero**: ảnh dịch chuyển tối đa 12% chiều cao qua `useScroll` + `useTransform`, chỉ animate `transform`. Tắt trên màn hình < 768px.
- **Hover card**: ảnh scale 1 → 1.05 trong 0.7s, lớp phủ đậm dần, flavor notes trượt lên. Trên thiết bị cảm ứng thông tin đó hiện sẵn, không phụ thuộc hover.
- **Marker bản đồ**: vòng pulse chậm 2.4s; hover/focus marker thì phóng 1.2 và hiện tooltip; chọn vùng thì side panel trượt vào bằng `ease.inOut`.
- **Hơi trà**: 2–3 đường SVG mảnh, opacity ≤ 0.5, trôi lên và tan trong 4–6s, lặp vô hạn. Chỉ dùng ở AI Trà Sư, Tea Journal và trạng thái loading.
- **Loading**: không dùng spinner trơn. Dùng hơi trà hoặc lá trà kèm microcopy ("Đang ủ trà…", "Đang tìm gu trà của bạn…").
- **Nút và chip**: `whileTap={{ scale: 0.97 }}`, đổi màu `duration.fast`.
- **Lưu / thích**: icon scale 1 → 1.25 → 1 một lần, đổi fill.
- **Page transition**: fade + y 8px, 0.35s. Không che nội dung quá 400ms.

## Reduced motion

Bắt buộc. Bọc app bằng `<MotionConfig reducedMotion="user">` và trong CSS có `@media (prefers-reduced-motion: reduce)` để tắt animation keyframe (hơi trà, pulse, marquee). Khi giảm chuyển động: bỏ parallax, bỏ dịch chuyển, chỉ giữ fade ngắn. Nội dung không bao giờ bị ẩn vĩnh viễn nếu animation không chạy.

## Hiệu năng

- Chỉ animate `transform` và `opacity`. Không animate `width`, `height`, `top`, `filter: blur` trên vùng lớn.
- Tối đa một hiệu ứng lặp vô hạn trong viewport tại một thời điểm.
- Không gắn listener scroll thủ công; dùng `useScroll` hoặc `whileInView`.
- Animation không được gây layout shift (CLS): phần tử reveal giữ nguyên kích thước ngay từ đầu.
- Nội dung trên màn đầu (LCP) không chờ JS mới hiện: ảnh hero render sẵn từ server, chỉ chữ mới animate. Không gắn `animate-rise`/`animate-fade` hay bất kỳ animation bắt đầu từ `opacity: 0` lên ảnh hero hoặc khối bọc nó: trình duyệt chỉ tính LCP khi ảnh hiện rõ, nên LCP bị chậm lại (đã đo: mất 2–4 điểm Lighthouse Performance).

## Tệp tham chiếu

Khi dự án chưa có các tệp được nhắc ở trên, đọc `references/code.md` trong thư mục skill này: nó chứa nguyên văn mã đã hiện thực các quy tắc (token, font, primitive), dùng làm điểm xuất phát.
