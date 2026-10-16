---
name: green-tea-motion
description: Bộ quy tắc chuyển động Green Tea — easing, duration, scroll reveal, parallax, hover card, loader "hơi trà", chuyển cảnh trong luồng nhiều bước, reduced motion và ngân sách hiệu năng mobile. Dùng khi thêm hoặc sửa bất kỳ animation, transition hay micro-interaction nào.
---

# Green Tea — Motion

Chuyển động là điểm tạo cảm giác cao cấp, nhưng phải chậm rãi như nhịp pha trà: mềm, có chủ đích, không nhấp nháy.

Mã hiện thực trong `references/`: `motion.ts` (hằng số), `motion-provider.tsx`, `reveal.tsx`, `parallax.tsx`, `steam.tsx`. Keyframes (`rise`, `fade`, `steam`, `pulse-ring`, `scroll-cue`) nằm trong `theme.css` của skill green-tea-design-system.

## Thư viện

Gói `motion` (import từ `motion/react`). Component có animation là client component nhỏ; phần còn lại của trang giữ là server component. Dùng lại primitive thay vì viết variants mới ở từng nơi.

## Hằng số

| Tên | Giá trị | Dùng cho |
|---|---|---|
| `ease.out` | `[0.22, 1, 0.36, 1]` | Mọi chuyển động xuất hiện |
| `ease.inOut` | `[0.65, 0, 0.35, 1]` | Panel trượt, menu, chuyển cảnh |
| `duration.fast` | 0.2s | Hover, nhấn nút, đổi màu |
| `duration.base` | 0.5s | Card, panel, tooltip, đổi bước |
| `duration.slow` | 0.9s | Reveal tiêu đề, ảnh lớn |
| `stagger` | 0.08s | Danh sách, từng dòng chữ |

CSS dùng `--ease-calm` (cùng đường cong `ease.out`). Không dùng duration dưới 0.15s cho thứ nhìn thấy được; không dùng spring nảy (bounce > 0.2), trừ nhịp "bật" nhỏ của icon thích/lưu.

## Mẫu chuyển động

- **Reveal khi cuộn** (`Reveal`): opacity 0 → 1, y 24px → 0, `duration.slow`, `viewport={{ once: true, margin: "-10%" }}`. Chạy một lần.
- **Chữ trên màn đầu**: dùng keyframe CSS `animate-rise` với `animation-delay` tăng dần (0, 120, 240, 360ms), để chạy được cả khi JS chưa tải.
- **Parallax** (`Parallax`): ảnh dịch tối đa 10–12% chiều cao qua `useScroll` + `useTransform`, chỉ animate `transform`, tắt dưới 768px. Phần tử con của khối parallax chứa `next/image fill` phải có `position: relative`.
- **Hover card**: ảnh phóng 1 → 1.05 trong 0.7s; gạch chân tiêu đề chạy từ trái sang (`background-size` 0% → 100%).
- **Panel mở rộng** (accordion ngang): `flex-grow` chuyển trong 0.7s; nội dung hiện bằng `grid-template-rows: 0fr → 1fr` cùng opacity.
- **Luồng nhiều bước** (quiz, form từng bước): `AnimatePresence mode="wait"`, bước cũ đi lên và mờ, bước mới đi lên từ dưới; các lựa chọn vào lần lượt với stagger nhỏ. Trong test tự động, chờ phần tử xuất hiện thay vì chờ cố định, vì bước cũ cần khoảng 0.5s để rời đi.
- **Danh sách bị lọc**: `motion.li` với `layout`, `AnimatePresence mode="popLayout"`, scale 0.96 ↔ 1.
- **Marker bản đồ**: vòng pulse 2.4s; marker đang chọn đổi màu, phóng to và hiện nhãn.
- **Loader "hơi trà"** (`Steam`): 2–3 đường SVG mảnh trôi lên rồi tan trong 4–6s, kèm câu chữ ("Đang ủ gợi ý…"). Không dùng spinner trơn. Chờ có chủ đích khoảng 1–1.5s trước khi hiện kết quả quan trọng để người dùng cảm nhận được bước "ủ".
- **Nút và chip**: `active:scale-[0.97]` (CSS) hoặc `whileTap={{ scale: 0.97 }}`.
- **Thích / lưu**: icon bật nhẹ một lần (spring stiffness ~420, damping ~14–16) và đổi sang icon tô đặc.
- **Menu mobile**: lớp phủ toàn màn hình mờ dần trong 0.35s, các mục vào lần lượt; khóa cuộn nền, đóng bằng Escape.

## Reduced motion

Bắt buộc. Bọc app bằng `MotionProvider` (`<MotionConfig reducedMotion="user">`) và giữ khối `@media (prefers-reduced-motion: reduce)` trong `theme.css` để tắt keyframe. Khi giảm chuyển động: bỏ parallax và dịch chuyển, chỉ giữ fade ngắn. Nội dung không bao giờ bị ẩn vĩnh viễn nếu animation không chạy.

## Hiệu năng

- Chỉ animate `transform` và `opacity`. Ngoại lệ có kiểm soát: `flex-grow` và `grid-template-rows` cho panel nhỏ.
- Tối đa một hiệu ứng lặp vô hạn trong viewport tại một thời điểm.
- Không gắn listener scroll thủ công; dùng `useScroll`, `useInView` hoặc `whileInView`.
- Không gây layout shift: phần tử reveal giữ nguyên kích thước ngay từ đầu.
- **Không gắn animation bắt đầu từ `opacity: 0` lên ảnh LCP hoặc khối bọc nó.** Trình duyệt chỉ tính LCP khi ảnh hiện rõ; đã đo được mức tụt 2–4 điểm Lighthouse Performance. Chỉ chữ được animate trên màn đầu.
- Ảnh phủ toàn khung nhìn bị Chrome coi là nền và không tính là LCP; khi đó LCP rơi vào chữ, nên chữ màn đầu phải hiện sớm.
