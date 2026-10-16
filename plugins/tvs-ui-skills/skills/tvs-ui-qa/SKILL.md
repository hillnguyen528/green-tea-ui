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
