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
