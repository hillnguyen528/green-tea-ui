# Green Tea UI: cả 6 skill

Gộp nguyên văn các `SKILL.md` để đọc nhanh. Bản cài vào Claude Code (kèm mã tham chiếu và script) nằm ở `plugins/green-tea-ui/skills/`.

---

<!-- plugins/green-tea-ui/skills/green-tea-design-system/SKILL.md -->

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

---

<!-- plugins/green-tea-ui/skills/green-tea-motion/SKILL.md -->

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

---

<!-- plugins/green-tea-ui/skills/green-tea-page-patterns/SKILL.md -->

---
name: green-tea-page-patterns
description: Công thức section và trang theo phong cách Green Tea — hero tràn viền, nhịp sáng/tối, trắc nghiệm nhiều bước, bản đồ hoặc danh sách tương tác, quy trình đánh số, panel mở rộng, lưới câu chuyện bất đối xứng, trang bài viết kiểu tạp chí, dashboard, trạng thái trống/chờ/lỗi. Dùng khi dựng một trang mới, sắp xếp các section của trang, hoặc khi trang trông giống template landing page.
---

# Green Tea — Mẫu trang và section

Một trang đẹp theo Green Tea là một chuỗi section có **nhịp**: sáng, tối, nhạt, tối…, mỗi section một bố cục khác nhau và đều có ít nhất một thứ để chạm vào. Mã ví dụ đầy đủ trong `references/examples.md`.

## Trang chủ: khung 8 nhịp

| # | Section | Nền | Tương tác chính |
|---|---|---|---|
| 1 | Hero | `night` + ảnh | 3 CTA, gợi ý cuộn |
| 2 | Trải nghiệm nhanh (trắc nghiệm 3 câu, công cụ mini) | `paper` | Chọn đáp án, nhận kết quả |
| 3 | Khám phá (bản đồ, danh mục) | `night` | Hover/chọn điểm, panel chi tiết |
| 4 | Quy trình / cách hoạt động | `mist` | Hover từng bước |
| 5 | Tính năng nổi bật (AI, công cụ) | `ink` | Lối vào có sẵn câu hỏi |
| 6 | Nội dung cộng đồng | `paper` | Card bấm được |
| 7 | Phân cấp / gói / bộ sưu tập | `mist` | Panel mở rộng |
| 8 | Kêu gọi tham gia | `night` + ảnh | 2 CTA |

Yêu cầu chung: người xem hiểu sản phẩm trong 10 giây đầu, và có một tương tác dùng được trong 5 giây đầu (ngay section 2 hoặc ngay trên hero).

## Công thức section

**Hero tràn viền** (`min-h-svh`, nền `night`)
- Ảnh `fill` + `preload` + `quality={60}` trong `Parallax`; lớp phủ gradient từ dưới lên.
- Nội dung neo đáy: eyebrow → tiêu đề `display-hero` có một chữ nghiêng màu `gold` → câu dẫn → 3 CTA (chính `gold`, phụ `outlineLight`, link gạch chân).
- Cột phải desktop: một ảnh dọc xoay 2° có chú thích ngắn, tạo chiều sâu.
- Dải đáy: số liệu (`05 · 12 · 04`, số có số 0 đứng trước) và gợi ý cuộn có vạch chạy.
- Chữ animate bằng `animate-rise` với delay tăng dần; ảnh không animate.

**Trắc nghiệm nhiều bước** (thẻ tối đặt trên nền sáng)
- Cột trái: tiêu đề + câu dẫn + một ghi chú viền trái màu `gold`. Cột phải: thẻ `bg-ink rounded-3xl`.
- Đầu thẻ: "Câu 1 trên 3" và thanh tiến độ gạch. Lựa chọn là nút cao ≥ 56px, mũi tên hiện khi hover.
- Sau câu cuối: bước chờ với hơi trà 1–1.5s, rồi kết quả gồm danh xưng ("Người săn hương"), mô tả, một gợi ý có ảnh, thông số dùng ngay, CTA đi sâu hơn và nút làm lại.
- Kết quả nên tái tạo được từ URL (ghi câu trả lời vào search params) để chia sẻ.

**Khám phá: bản đồ hoặc danh mục + panel chi tiết** (nền tối, lưới 4/4/4)
- Trái: tiêu đề + danh sách đánh số (trên mobile thành hàng chip cuộn ngang). Giữa: bản đồ hoặc hình minh họa. Phải: card chi tiết đổi theo mục đang chọn bằng `AnimatePresence`.
- Rê chuột, focus và bấm vào mục hay điểm đều đổi mục đang chọn. Xem skill green-tea-vietnam-map nếu là bản đồ Việt Nam.

**Quy trình đánh số** (nền `mist`, lưới 5/7)
- Trái `sticky top-28`: tiêu đề + ảnh dọc 4:5 + chú thích. Phải: danh sách `ol`, mỗi bước có số lớn `font-display text-7xl text-highlight opacity-70` (rõ dần khi hover), tên bước, một dòng mô tả, một "fact" nhỏ căn phải. Cột số có độ rộng cố định để tên bước thẳng hàng.

**Tính năng nổi bật** (nền `ink`)
- Trái: tiêu đề + lưới 2×2 lối vào có sẵn câu hỏi, mỗi lối vào là một link sâu (`?goal=...`). Phải: ảnh vuông bo lớn, trên đó chồng đoạn hội thoại mẫu (bong bóng người dùng sáng, bong bóng trả lời tối) và ghi "minh họa". Nói rõ giới hạn của tính năng ngay dưới các lối vào.

**Lưới nội dung bất đối xứng** (nền `paper`, lưới 6/6)
- Trái: một card lớn (ảnh 16:11). Phải: 3 card ngang (ảnh 2/5 bề rộng). Tiêu đề section và nút "xem tất cả" cùng hàng trên desktop.

**Panel mở rộng ngang** (nền `mist`)
- 4 tấm ảnh nền tối cao ~34rem trên desktop; tấm đang chọn `grow-[3.2]`, các tấm khác `grow`. Nội dung tấm đang chọn hiện bằng `grid-rows-[0fr→1fr]`. Trên mobile mọi tấm xếp dọc và hiện đầy đủ nội dung.
- Ẩn nhãn phụ ở tấm thu gọn để không bị cắt.

**Dải kêu gọi cuối trang** (nền `night` + ảnh, căn giữa)
- Eyebrow tên cộng đồng → tiêu đề rất lớn có chữ nghiêng màu `gold` → một câu dẫn → hai CTA.

**Footer** (nền `night`)
- Câu tuyên ngôn lớn bằng font display, hai cột link, wordmark khổng lồ mờ (dùng SVG `textLength` để luôn vừa bề ngang và không bị công cụ đo contrast bắt lỗi), dòng ghi chú pháp lý và nguồn ảnh.

## Trang con

- **Trang danh mục**: header sáng (eyebrow, `h1` cỡ `display-section` lớn, câu dẫn, dải số liệu, ảnh xoay nhẹ bên phải) → bộ lọc chip nhiều nhóm lưu trên URL → đếm kết quả "12 loại trà để khám phá" + nút xóa lọc → lưới card có animation `layout` → trạng thái rỗng có lối thoát.
- **Trang chi tiết có bản đồ hoặc hồ sơ**: hero ảnh tối 88svh với đường dẫn quay lại, nhãn cấp độ và 3 CTA (hành động chính, lưu, chia sẻ) → bảng hồ sơ dạng `dl` hai cột → biểu đồ (radar + bảng số cho người đọc màn hình) → câu chuyện con người (nền `ink`, tiêu đề trong ngoặc kép màu `clay`) → mục liên quan → dải "mục tiếp theo" tràn viền bấm được.
- **Trang bài viết kiểu tạp chí**: tiêu đề căn giữa, câu dẫn, dòng meta; ảnh 21:9 bo lớn; thân bài 7 cột với tiêu đề mục đánh số `01`; cột phải `sticky` "Ghi nhớ nhanh" + liên kết + nút chia sẻ; cuối bài là "Đọc tiếp" tràn viền; có JSON-LD Article.
- **Trình soạn thảo**: tab Viết/Xem trước, ô tiêu đề dùng font display, chọn ảnh bìa dạng lưới ô vuông kèm nút tải ảnh, cột phải chứa thuộc tính và thẻ trợ lý tối, thanh hành động `sticky bottom-0` (lưu nháp, đăng).
- **Dashboard**: cột trái avatar + điều hướng dạng viên thuốc (thành hàng cuộn ngang trên mobile, nhớ `min-w-0`), cột phải: lời chào kèm câu hỏi, 3 ô số liệu bấm được, 2 lối tắt lớn, thẻ tổng kết cá nhân.
- **Trang đăng nhập**: chia đôi, trái là ảnh tối có câu trích, phải là form hẹp (max 28rem).

## Trạng thái

- **Chờ**: hơi trà + câu chữ theo ngữ cảnh ("Đang ủ trà…", "Đang tráng ấm…"), không spinner trơn.
- **Trống**: khối `mist` bo lớn, tiêu đề display nói điều chưa có, một câu mời, một nút hành động.
- **Lỗi / 404**: hơi trà + eyebrow vui ("Chưa tới nước") + tiêu đề "Trang này vẫn đang được ủ" + nút về trang chủ.
- **Chặn quyền**: icon khóa trong vòng tròn, lý do cụ thể, hai nút đăng ký / đăng nhập. Khung chờ hiện trong lúc chưa đọc xong phiên đăng nhập để tránh nháy nội dung.

---

<!-- plugins/green-tea-ui/skills/green-tea-ux-writing/SKILL.md -->

---
name: green-tea-ux-writing
description: Quy tắc viết chữ giao diện tiếng Việt theo phong cách Green Tea — giọng thân thiện không lên lớp, tiêu đề kể chuyện, eyebrow, CTA, câu chữ cho trạng thái chờ/trống/lỗi, dữ liệu mẫu trung thực, giới hạn nội dung nhạy cảm (sức khỏe, tài chính). Dùng khi viết bất kỳ chữ nào người dùng nhìn thấy, soạn dữ liệu mẫu, hoặc viết prompt cho tính năng AI.
---

# Green Tea — Viết chữ giao diện

Trước khi viết, điền **hồ sơ giọng** của dự án (mục cuối). Các quy tắc dưới đây áp dụng cho mọi dự án dùng Green Tea.

## Giọng

- Người viết là một người bạn am hiểu, cùng lứa với người dùng: ấm, rõ, tò mò, không lên lớp.
- Xưng "bạn". Không dùng "quý khách", "chúng tôi xin trân trọng", "vui lòng" lặp lại.
- Câu ngắn. Cụ thể bằng giác quan và con số thật, thay vì tính từ chung chung ("tuyệt vời", "đẳng cấp", "tinh hoa", "hàng đầu").
- Không sến, không giọng quảng cáo, không tiếng lóng gượng ép.
- Thuật ngữ chuyên ngành dùng nhất quán, giải thích ngay lần đầu xuất hiện.
- Tên riêng tiếng Việt viết đúng dấu. Tên tính năng có thể giữ tiếng Anh (Journal, Atlas), phần giải thích bằng tiếng Việt.

## Tiêu đề

Tiêu đề kể chuyện, không phải nhãn kỹ thuật.

| Đừng viết | Hãy viết |
|---|---|
| Danh sách vùng trà | Bản đồ những vùng trà đáng thử |
| Quy trình sản xuất | Từ đồi chè đến chén trà |
| Trắc nghiệm | Gu trà của bạn là gì? |
| Bài viết cộng đồng | Những câu chuyện được ủ cùng trà |

- Mỗi section có eyebrow 2–4 chữ (bối cảnh), tiêu đề (lời hứa), một câu dẫn ≤ 30 chữ (lý do đọc tiếp).
- Một cụm từ trong tiêu đề được nhấn bằng chữ nghiêng; chọn cụm mang cảm xúc ("đáng thử", "của bạn").

## Câu chữ nhỏ

- **CTA** là động từ cụ thể nói điều sẽ xảy ra: "Khám phá bản đồ trà", "Lưu vào Tea Journal". Không "Xem thêm", "Bấm vào đây".
- **Chờ**: nói điều đang diễn ra bằng ẩn dụ của sản phẩm: "Đang ủ gợi ý…", "Đang tráng ấm…". Thêm một câu phụ dịu nếu chờ > 1 giây.
- **Trống**: nói điều chưa có và mời hành động: "Sổ trà của bạn còn trống. Ghi lại chén trà đầu tiên nhé."
- **Lỗi**: nói chuyện gì xảy ra và cách sửa, không đổ lỗi, không mã lỗi trơ trọi: "Email chưa đúng định dạng." "Trình duyệt đang chặn lưu dữ liệu. Bạn thử tắt chế độ riêng tư rồi làm lại nhé."
- **Xác nhận**: ngắn, ở thì hoàn thành: "Đã lưu bản nháp." "Đã sao chép liên kết."
- **Hành động phá hủy**: hỏi lại bằng chính hành động: "Xóa hẳn?"
- **Chế độ demo / giới hạn**: nói thẳng điều tính năng chưa làm được, đặt ngay cạnh tính năng, không giấu ở trang khác.

## Dữ liệu mẫu

- Thông tin thực tế phải đúng ở mức phổ thông. Không chắc thì viết khái quát ("vùng núi cao trên 1.000 m") thay vì bịa số chính xác.
- Toạ độ, số liệu, ngày tháng lấy từ nguồn ghi rõ và ghi chú nguồn ngay trong tệp dữ liệu.
- Không bịa tên người thật, tổ chức, giải thưởng hay trích dẫn. Nhân vật mẫu là hư cấu, mang tên thường gặp, và có ghi chú là hư cấu.
- Số liệu tương tác mẫu (lượt thích, bình luận) được đánh dấu là minh họa trong mã.
- Giá chỉ ghi phân khúc hoặc khoảng, kèm chữ "tham khảo".
- Một thông số xuất hiện ở nhiều nơi (trang chi tiết, máy tính, câu trả lời AI) phải lấy từ cùng một nguồn dữ liệu.

## Nội dung nhạy cảm

Áp dụng cho nội dung tĩnh và cho prompt của tính năng AI:

- **Sức khỏe**: không nói sản phẩm chữa bệnh, giảm cân, giải độc, phòng bệnh. Được nói về trải nghiệm, cảm nhận, thời điểm dùng. Khi người dùng hỏi về sức khỏe, thai kỳ, thuốc: trả lời thận trọng, nói rõ không phải lời khuyên y tế, gợi ý hỏi bác sĩ.
- **Tài chính, pháp lý**: không hứa lợi nhuận, không tư vấn cá nhân; gợi ý hỏi chuyên gia.
- **Bản đồ Việt Nam**: luôn thể hiện quần đảo Hoàng Sa và Trường Sa.

## Hồ sơ giọng của dự án

Điền phần này khi bắt đầu dự án mới, đặt ngay dưới mục này hoặc trong `CLAUDE.md`:

```markdown
- Thông điệp một câu:
- Người dùng chính (tuổi, bối cảnh):
- Người viết là ai với người dùng:
- 3 từ mô tả giọng / 3 từ không phải giọng:
- Thuật ngữ cố định và cách viết:
- Ẩn dụ cho trạng thái chờ:
- Giới hạn nội dung riêng của lĩnh vực:
```

Ví dụ đã điền (Trà Việt Số): "Trà Việt không cũ"; người trẻ 18–25 biết matcha, cà phê specialty nhưng chưa hiểu trà Việt; người bạn sành trà cùng lứa; ấm, rõ, tò mò / sến, hoài cổ, quảng cáo; "hãm" (không "ngâm"), "nước" (lần hãm), "hậu ngọt", "một tôm hai lá"; "Đang ủ trà…"; không claim y tế.

---

<!-- plugins/green-tea-ui/skills/green-tea-ui-qa/SKILL.md -->

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

---

<!-- plugins/green-tea-ui/skills/green-tea-vietnam-map/SKILL.md -->

---
name: green-tea-vietnam-map
description: Dựng bản đồ Việt Nam tương tác bằng SVG — đường bờ biển từ Natural Earth, phép chiếu dùng chung, quần đảo Hoàng Sa và Trường Sa bắt buộc, marker đúng toạ độ có nguồn, tooltip, đồng bộ với danh sách, sticky khi cuộn, phương án mobile và accessibility. Có sẵn component, phép chiếu và dữ liệu đường bờ biển trong references/. Dùng khi cần bản đồ Việt Nam, marker theo tỉnh/vùng/địa điểm, hoặc sửa vị trí điểm trên bản đồ.
---

# Green Tea — Bản đồ Việt Nam

## Tệp có sẵn

| Tệp | Nội dung |
|---|---|
| `references/vietnam-outline.ts` | Đường bờ biển Việt Nam (Natural Earth 1:50m, public domain) đã chiếu sẵn thành path SVG, gồm Phú Quốc, Côn Đảo và các đảo ven bờ |
| `references/geo.ts` | Phép chiếu equirectangular `projectToMap({lat, lng})`, khung 101.5–117.5°E, 7.5–23.9°N, kích thước `MAP_WIDTH × MAP_HEIGHT` |
| `references/vietnam-map.tsx` | Component `VietnamMap` (client): SVG + marker là `<button>` + nhãn + cụm Hoàng Sa, Trường Sa + nhãn Biển Đông |

Chép ba tệp vào dự án (ví dụ `src/data/`, `src/lib/`, `src/components/map/`) và sửa đường import. Component dùng token màu của green-tea-design-system.

```tsx
<VietnamMap
  points={[{ id: "bao-loc", name: "Bảo Lộc", coordinates: { lat: 11.5481, lng: 107.8075 } }]}
  activeId={activeId}
  onSelect={setActiveId}
  onActivate={(id) => scrollToCard(id)}
  maxHeight="min(58svh, calc(100svh - 13rem))"
/>
```

## Bắt buộc

- **Thể hiện quần đảo Hoàng Sa và Trường Sa**, có nhãn tên, nằm trong khung hình. Không cắt khung làm mất chúng. Thiếu là lỗi nghiêm trọng với sản phẩm Việt Nam.
- Đường bờ biển lấy từ dữ liệu địa lý có nguồn (Natural Earth, GADM), không vẽ tay.
- Đường bờ biển và marker dùng **cùng một hàm chiếu**. Không gõ tay x/y.
- **Marker đặt đúng toạ độ thật.** Không dịch marker để tránh chồng nhau (đã từng làm vậy và kéo điểm lệch 17–51 km).
- Toạ độ lấy từ nguồn ghi rõ (ví dụ Wikipedia tiếng Việt) và ghi chú nguồn trong tệp dữ liệu. Sau sáp nhập tỉnh năm 2025, nhiều trang địa danh cũ chuyển hướng sang đơn vị mới; ghi rõ toạ độ thuộc đơn vị nào.

## Hiển thị

- Nét mảnh, đất liền `leaf` mờ trên nền `night` (hoặc `mist` trên `paper`), không vẽ ranh giới tỉnh. Biển là lưới chấm mờ.
- Marker đang chọn: màu `gold`, viền sáng, vòng pulse, nhãn tên hiện sẵn. Marker khác: chấm `sprout`, nhãn hiện khi hover/focus. Trạng thái chọn thể hiện bằng cả màu, kích thước và nhãn.
- Hai quần đảo vẽ tượng trưng bằng cụm chấm tại vị trí trung tâm: Hoàng Sa ~16.5°N 111.9°E, Trường Sa ~9.6°N 114.2°E.
- Giới hạn chiều cao bằng prop `maxHeight`, **không dùng class `max-h-*`**: `max-h` làm khung lệch tỉ lệ với SVG và marker trôi khỏi bản đồ.

## Tương tác

- Hover hoặc focus marker: chọn điểm (đổi panel chi tiết). Bấm hoặc Enter: hành động chính (cuộn tới card, mở trang chi tiết).
- Trang danh sách: bản đồ `sticky` một bên, danh sách cuộn bên kia. Card nào vào dải giữa màn hình (`useInView` với `margin: "-45% 0px -45% 0px"`) thì marker tương ứng sáng lên; bấm marker thì cuộn tới card (`scrollIntoView` smooth, trừ khi giảm chuyển động).
- Bộ lọc lọc đồng thời marker và danh sách; trạng thái lọc nằm trên URL.

## Mobile và accessibility

- Dưới 768px: bản đồ thu gọn ở trên, danh sách điểm (chip cuộn ngang hoặc card) bên dưới là cách chọn chính, vùng chạm ≥ 44px.
- Các điểm gần nhau (ví dụ Mộc Châu và Suối Giàng cách ~85 km) có vùng chạm 24px chồng nhau trên màn nhỏ. Chấp nhận nhờ danh sách thay thế (WCAG 2.5.8 cho phép khi có control tương đương); Lighthouse vẫn có thể báo `target-size`. Muốn hết hẳn, thêm ô phóng to khu vực dày điểm.
- Mỗi marker là `<button>` có `aria-label` tên điểm và `aria-pressed`. SVG có `<title>`; phần trang trí `aria-hidden`.
- Pulse tắt khi `prefers-reduced-motion`.

## Sinh lại đường bờ biển

Khi cần khung khác (chỉ miền Bắc, độ chi tiết 1:10m): tải `ne_50m_admin_0_countries.geojson` từ repo `nvkelso/natural-earth-vector`, lấy feature `ADMIN == "Vietnam"`, chiếu mọi điểm bằng đúng hàm trong `geo.ts`, nối thành path `M…L…Z` cho từng polygon. Đổi khung trong `geo.ts` thì phải sinh lại path.
