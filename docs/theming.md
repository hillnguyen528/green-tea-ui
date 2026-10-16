# Đổi thương hiệu

Green Tea UI tách **quy tắc** (bố cục, chuyển động, accessibility, nghiệm thu) khỏi **thương hiệu** (màu, font, giọng). Đổi thương hiệu chỉ đụng vào phần sau.

## 1. Màu

Mở `theme.css` (hoặc `globals.css` sau khi đã chép) và đổi 8 giá trị trong `@theme inline`, giữ nguyên tên token:

| Token | Vai trò | Gợi ý khi chọn màu mới |
|---|---|---|
| `ink` | Chữ chính, nền tối thứ hai | Gần đen, hơi ngả màu chủ đạo |
| `leaf` | Primary | Đủ đậm để chữ trắng trên nó đạt 4.5:1 |
| `sprout` | Điểm nhấn tươi trên nền tối | Sáng, cùng họ với `leaf` |
| `gold` | Accent cao cấp | Ấm, tương phản với `leaf` |
| `mist` | Nền section nhạt | Gần trắng, ngả `leaf` |
| `paper` | Nền trang | Trắng ngà |
| `clay` | Accent con người, cộng đồng | Ấm, khác `gold` rõ rệt |
| `night` | Nền tối nhất | Gần đen |

Sau đó tính lại 4 giá trị chữ nhấn trong cùng tệp:

- `--highlight-text` và `--warm-text` trên nền sáng: bản sẫm của `gold` và `clay`, đạt ≥ 4.5:1 với cả `paper` và `mist`.
- Hai biến đó trên nền tối: bản sáng, đạt ≥ 4.5:1 với `night` và `ink`.

Nếu đổi tên lớp nền (ví dụ thêm `bg-cream`), thêm lớp đó vào bộ chọn nền sáng hoặc tối ngay trên `@utility text-highlight`.

Cuối cùng chạy `lighthouse.sh` của green-tea-ui-qa để xác nhận Accessibility vẫn 100.

## 2. Font

Trong `layout.tsx`, đổi hai font `next/font/google`, giữ tên biến `--font-be-vietnam` và `--font-fraunces` (hoặc đổi cả trong `theme.css`). Giao diện tiếng Việt: chỉ chọn font có subset `vietnamese`. Font sans nạp tối đa 2 weight.

## 3. Giọng viết

Điền mục "Hồ sơ giọng của dự án" trong skill green-tea-ux-writing (hoặc đặt trong `CLAUDE.md` của dự án). Đổi ẩn dụ cho trạng thái chờ: "Đang ủ…" hợp với trà; sản phẩm khác chọn ẩn dụ riêng.

## 4. Loader và ẩn dụ hình ảnh

`Steam` (hơi trà) là chữ ký của theme. Sản phẩm khác có thể giữ (hơi ấm, cà phê, bếp) hoặc thay bằng một SVG lặp nhẹ khác cùng quy tắc: nét mảnh, opacity ≤ 0.5, chu kỳ 4–6s, tắt khi giảm chuyển động.

## 5. Nhờ Claude làm

Khi đã cài skill vào dự án bằng `install.sh`:

```text
Đọc các skill green-tea-* trong .claude/skills. Đổi theme Green Tea sang thương hiệu [tên]: [cảm giác, màu chủ đạo, đối tượng, ngôn ngữ].
Chỉ đổi 8 màu (giữ tên token), 4 biến chữ nhấn (tính lại contrast), font, hồ sơ giọng và ẩn dụ chờ.
Giữ nguyên quy tắc bố cục, chuyển động, accessibility, hiệu năng và nghiệm thu.
Chạy green-tea-ui-qa sau khi đổi.
```
