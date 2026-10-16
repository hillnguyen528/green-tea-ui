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
