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
