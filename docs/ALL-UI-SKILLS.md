# Bộ skill UI của Trà Việt Số (bản gộp)

Gộp nguyên văn năm skill để đọc hoặc dán nhanh. Bản dùng để cài vào Claude Code là các thư mục trong `plugins/tvs-ui-skills/skills/`.


---

<!-- plugins/tvs-ui-skills/skills/tvs-design-system/SKILL.md -->

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

---

<!-- plugins/tvs-ui-skills/skills/tvs-motion/SKILL.md -->

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

---

<!-- plugins/tvs-ui-skills/skills/tvs-ui-qa/SKILL.md -->

---
name: tvs-ui-qa
description: Checklist nghiệm thu UI/UX của Trà Việt Số — responsive 360px, tiêu chí sản phẩm (10 giây, 3 click, AI dưới 1 phút), accessibility, hiệu năng Lighthouse và SEO/Open Graph. Dùng sau khi hoàn thành một trang hoặc một section, và trước khi báo một phần việc UI là xong.
---

# Trà Việt Số — Nghiệm thu UI

Chạy app thật và nhìn bằng trình duyệt. Build qua và lint sạch chưa phải là xong.

## Cách kiểm tra

1. `pnpm lint` và `pnpm build` không lỗi, không cảnh báo mới.
2. Chạy `pnpm dev`, mở trang trong trình duyệt, chụp màn hình ở ba bề rộng: **360**, **768**, **1440**.
3. Cuộn hết trang ở từng bề rộng; thử hover, focus bằng phím Tab, click các CTA.
4. Đọc console: không có lỗi, không có cảnh báo hydration. Nếu vừa sửa tệp bằng script mà dev báo lỗi lạ (hàm không tồn tại, lệch hydration), khởi động lại `pnpm dev` rồi kiểm tra lại trước khi kết luận. Nếu sửa `globals.css` mà giao diện dev không đổi (đã gặp: utility mới không có trong CSS dù khởi động lại), tắt dev, xóa thư mục cache `.next/dev` rồi chạy lại; bản `pnpm build` không bị ảnh hưởng.
5. Báo cáo đúng những gì đã kiểm tra; mục nào chưa kiểm tra thì nói là chưa.

## Responsive

- [ ] Không cuộn ngang ở 360px. Lỗi hay gặp nhất: một phần tử con của grid chứa danh sách cuộn ngang (`overflow-x-auto`) mà thiếu `min-w-0`, khiến cả cột phình ra. `scrollWidth` của trang có thể vẫn bằng 360 nếu section có `overflow-hidden`, nên phải nhìn ảnh chụp.
- [ ] Trang dành cho thành viên (write, journal, dashboard, profile) được kiểm tra ở trạng thái đã đăng nhập, không chỉ màn chặn.
- [ ] Text không bị cắt, không tràn khỏi card; dấu tiếng Việt không bị xén.
- [ ] Cỡ chữ nhỏ nhất ≥ 13px; vùng bấm ≥ 44px.
- [ ] Bản đồ có danh sách vùng trà thay thế trên mobile.
- [ ] Điều gì hiện khi hover trên desktop thì trên cảm ứng phải hiện sẵn hoặc bấm được.
- [ ] Menu mobile mở/đóng được, khóa cuộn nền khi mở.

## Sản phẩm

- [ ] Màn đầu có ảnh trà thật, hiểu được dự án trong 10 giây (tên, tagline, ba CTA).
- [ ] Có một tương tác dùng được trong 5 giây đầu (quiz mini, marker bản đồ hoặc scroll cue).
- [ ] Từ trang chủ tới một trang vùng trà trong ≤ 3 click.
- [ ] Nhận gợi ý từ AI Trà Sư trong dưới 1 phút.
- [ ] Trang không giống template landing page: bố cục có nhịp, không lặp ba card đều nhau.
- [ ] Ba tương tác chủ lực hoạt động: bản đồ trà, AI Trà Sư, Tea Journal/Tea Profile.

## Accessibility (mục tiêu Lighthouse ≥ 90)

- [ ] Contrast text ≥ 4.5:1, kể cả chữ đè lên ảnh.
- [ ] Mọi ảnh nội dung có `alt` tiếng Việt; ảnh trang trí `alt=""`.
- [ ] Nút chỉ có icon có `aria-label`.
- [ ] Thứ tự heading hợp lý, mỗi trang một `h1`.
- [ ] Dùng được toàn bộ bằng bàn phím, có focus ring nhìn thấy.
- [ ] Form báo lỗi bằng chữ dễ hiểu, gắn với trường tương ứng.
- [ ] Không truyền tin chỉ bằng màu (cấp độ trà, trạng thái chọn).
- [ ] Bật `prefers-reduced-motion`: không còn parallax và hiệu ứng lặp, nội dung vẫn hiện đủ.

## Hiệu năng (mục tiêu Lighthouse mobile ≥ 85)

- [ ] Ảnh qua `next/image` với `sizes` đúng; chỉ ảnh hero có `preload`.
- [ ] Font nạp bằng `next/font`, không FOUT gây nhảy layout.
- [ ] Không có layout shift khi animation chạy.
- [ ] Client component chỉ ở những chỗ cần tương tác.
- [ ] Trang nội dung (atlas, teas, handbook, stories) được static generation.
- [ ] Route động (`[slug]`) có `generateStaticParams` và đọc `params` bên trong `<Suspense>` (xem `src/app/atlas/[regionSlug]/page.tsx`); dev không báo lỗi "encountered URL data".

## SEO và chia sẻ (mục tiêu Lighthouse ≥ 90)

- [ ] Mỗi trang public có `title`, `description`, `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`.
- [ ] Title theo mẫu `Nội dung | Trà Việt Số`.
- [ ] `lang="vi"` trên `<html>`.
- [ ] Bài viết có schema Article.
- [ ] Nút chia sẻ dùng Web Share API khi có, còn lại có copy link.

---

<!-- plugins/tvs-ui-skills/skills/tvs-content-voice/SKILL.md -->

---
name: tvs-content-voice
description: Giọng viết và quy tắc nội dung tiếng Việt của Trà Việt Số — heading, microcopy, CTA, trạng thái loading/lỗi, dữ liệu mẫu về vùng trà và loại trà, và giới hạn không claim y tế. Dùng khi viết bất kỳ chữ nào người dùng nhìn thấy, khi soạn dữ liệu mẫu, hoặc khi viết prompt cho AI Trà Sư.
---

# Trà Việt Số — Giọng viết và nội dung

## Thông điệp

> Trà Việt không cũ. Trà Việt có chiều sâu, có thẩm mỹ, có công nghệ, có cộng đồng và có một cách kể chuyện mới dành cho thế hệ trẻ.

Đây là không gian số để người trẻ **khám phá, hiểu, ghi lại và chia sẻ** hành trình với trà Việt, không phải trang bán trà. Trang chủ phải nói được điều đó trong 10 giây đầu.

## Giọng

- Người viết là một người bạn sành trà, cùng lứa 18–25: ấm, rõ, tò mò, không lên lớp.
- Xưng hô: "bạn". Không dùng "quý khách", "chúng tôi xin trân trọng".
- Câu ngắn. Cụ thể bằng giác quan (hương cốm, hậu ngọt, nước vàng mật ong) thay vì tính từ chung chung ("tuyệt vời", "đẳng cấp", "tinh hoa").
- Không sến, không hoài cổ, không giọng quảng cáo. Không tiếng lóng Gen Z gượng ép.
- Thuật ngữ trà dùng nhất quán: "hãm" (không lẫn "ngâm"), "nước" (lần hãm), "hậu ngọt", "chát", "một tôm hai lá". Giải thích thuật ngữ ngay lần đầu xuất hiện.
- Tên riêng viết đúng dấu: Thái Nguyên, Hà Giang, Suối Giàng, Mộc Châu, Bảo Lộc, Shan Tuyết, Ô long.

## Heading

Heading kể chuyện, không phải nhãn kỹ thuật.

| Đừng viết | Hãy viết |
|---|---|
| Danh sách vùng trà | Bản đồ những vùng trà đáng thử |
| Quy trình sản xuất | Từ đồi chè đến chén trà |
| Trắc nghiệm | Gu trà của bạn là gì? |
| Bài viết cộng đồng | Những câu chuyện được ủ cùng trà |

Mỗi section có eyebrow ngắn (2–4 chữ) + heading + một câu dẫn không quá 30 chữ.

## Microcopy

- CTA là động từ cụ thể: "Khám phá bản đồ trà", "Tìm gu trà của bạn", "Viết câu chuyện trà", "Lưu vào Tea Journal", "Hỏi AI Trà Sư".
- Loading: "Đang ủ trà…", "Đang tìm gu trà của bạn…", "Đang tráng ấm…".
- Trống: nói điều sắp có và mời hành động ("Sổ trà của bạn còn trống. Ghi lại chén trà đầu tiên nhé.").
- Lỗi: nói chuyện gì xảy ra và làm gì tiếp, không đổ lỗi, không mã lỗi trơ trọi.
- Tên tính năng giữ nguyên: Tea Atlas, Tea Journal, AI Trà Sư. Phần giải thích đi kèm bằng tiếng Việt.

## Dữ liệu mẫu

- Thông tin về vùng trà, độ cao, khí hậu, giống trà, cách pha phải đúng thực tế ở mức hiểu biết phổ thông. Điều gì không chắc thì viết ở mức khái quát ("vùng núi cao trên 1.000 m") thay vì bịa con số chính xác.
- Không bịa tên hợp tác xã, nghệ nhân, giải thưởng hay trích dẫn của người thật. Nhân vật trong story mẫu là hư cấu và mang tên thường gặp, không gắn với người thật.
- Giá chỉ ghi phân khúc hoặc khoảng tham khảo, luôn kèm chữ "tham khảo".
- Thông số pha (nhiệt độ, gram, thời gian) nhất quán giữa trang trà, Brew calculator và câu trả lời của AI vì cùng lấy từ `src/data/teas.ts`.

## Giới hạn sức khỏe

Áp dụng cho mọi nội dung và cho prompt của AI Trà Sư:

- Không nói trà chữa bệnh, giảm cân, giải độc, điều trị hay phòng bất kỳ bệnh gì.
- Chỉ nói về hương vị, cách pha, tâm trạng, dịp uống, trải nghiệm.
- Caffeine: được nói mức cao/thấp và gợi ý thời điểm uống; không tư vấn cho bệnh lý, thai kỳ, thuốc.
- Khi người dùng hỏi về sức khỏe: trả lời thận trọng, nói rõ đây không phải lời khuyên y tế và gợi ý hỏi bác sĩ hoặc chuyên gia.

---

<!-- plugins/tvs-ui-skills/skills/tvs-atlas-map/SKILL.md -->

---
name: tvs-atlas-map
description: Cách dựng bản đồ trà Việt tương tác (TeaRegionMap) — SVG Việt Nam, marker, tooltip, side panel, sticky khi cuộn, fallback danh sách trên mobile và yêu cầu chủ quyền lãnh thổ. Dùng khi làm việc với Tea Atlas, bản đồ, marker vùng trà hoặc bản xem trước bản đồ ở trang chủ.
---

# Trà Việt Số — Bản đồ trà

Bản đồ là một trong ba tương tác chủ lực. Mục tiêu: người dùng tới được một vùng trà trong tối đa 3 click.

## Hình bản đồ

- MVP dùng SVG tự dựng, không dùng Mapbox/Leaflet.
- **Bắt buộc thể hiện quần đảo Hoàng Sa và Trường Sa**, có nhãn tên, cùng các đảo lớn (Phú Quốc, Côn Đảo). Thiếu hai quần đảo này là lỗi nghiêm trọng với một sản phẩm Việt Nam dự thi; không được cắt khung hình làm mất chúng.
- Đường bờ biển lấy từ dữ liệu địa lý có nguồn rõ ràng (ví dụ Natural Earth, GADM), đơn giản hóa rồi chiếu sang toạ độ SVG. Không vẽ tay ước lượng hình chữ S.
- Vị trí marker tính từ `coordinates` (lat/lng) của `TeaRegion` bằng một hàm chiếu duy nhất trong `src/lib/geo.ts`, không gõ tay x/y.
- Phong cách: nét mảnh, nền đất `shan-mist` trên nền `porcelain` (hoặc nét sáng trên `charcoal`), không viền tỉnh rối mắt. Có thể thêm đường đồng mức hoặc chấm bi để gợi địa hình.

## Tương tác

- Hover hoặc focus marker: tooltip gồm tên vùng, loại trà nổi bật, độ cao.
- Click hoặc Enter: mở side panel (desktop) hoặc bottom sheet (mobile) với `TeaRegionCard` và CTA "Khám phá vùng trà" dẫn tới `/atlas/[regionSlug]`.
- Vùng đang chọn: marker đổi sang `oolong-gold`, các marker khác mờ đi.
- Trang Atlas: bản đồ `sticky` bên trái, danh sách vùng cuộn bên phải; vùng nào vào giữa viewport thì marker tương ứng sáng lên, và ngược lại click marker thì cuộn tới card.
- Bộ lọc (miền, loại trà, cấp độ, gu vị) lọc đồng thời marker và danh sách; trạng thái lọc lưu trên URL search params để chia sẻ được.

## Mobile

- Dưới 768px: bản đồ thu gọn ở trên (cao tối đa ~55vh), bên dưới là danh sách vùng dạng card cuộn ngang hoặc dọc. Danh sách luôn dùng được mà không cần chạm vào bản đồ.
- Marker luôn nằm đúng toạ độ thật. Không dịch marker để tránh chồng nhau: bản trước từng làm vậy và kéo các vùng miền Bắc lệch 17–51 km. Bốn vùng miền Bắc nằm sát nhau nên vùng chạm 24px của marker có thể chồng nhau trên màn hình nhỏ; thao tác chính trên mobile là danh sách vùng (vùng chạm ≥ 44px).
- Muốn giới hạn chiều cao bản đồ, dùng prop `maxHeight` của `TeaRegionMap`, không dùng class `max-h-*`: `max-h` làm khung lệch tỉ lệ với SVG và marker trôi khỏi bản đồ.
- Toạ độ trong dữ liệu phải lấy từ nguồn ghi rõ (ví dụ Wikipedia), ghi chú nguồn ngay trong tệp dữ liệu.

## Accessibility

- Mỗi marker là `<button>` thật (hoặc phần tử có `role="button"`, `tabIndex`, xử lý Enter/Space) với `aria-label` "Vùng trà Thái Nguyên".
- SVG có `<title>` "Bản đồ các vùng trà Việt Nam"; phần trang trí đặt `aria-hidden`.
- Vùng đang chọn thể hiện bằng cả màu lẫn hình dạng (vòng ngoài, nhãn), không chỉ màu.
- Pulse của marker tắt khi `prefers-reduced-motion`.

## Dữ liệu

Năm vùng tối thiểu của MVP: Thái Nguyên, Hà Giang, Mộc Châu (Sơn La), Bảo Lộc (Lâm Đồng), Suối Giàng (Yên Bái). Dữ liệu ở `src/data/regions.ts` theo type `TeaRegion`.
