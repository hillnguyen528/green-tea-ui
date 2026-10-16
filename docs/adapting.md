# Chuyển bộ skill sang dự án khác

Bộ skill viết riêng cho Trà Việt Số. Phần quy tắc (layout, motion, accessibility, nghiệm thu) dùng được cho hầu hết sản phẩm; phần thương hiệu (màu, font, giọng viết, ví dụ về trà) cần đổi.

## Cách nhanh nhất

1. Cài skill vào dự án mới bằng cách chép thủ công (`./install.sh <dự-án>`), để có thể sửa.
2. Mở Claude Code trong dự án đó và yêu cầu:

```text
Đọc các skill trong .claude/skills. Chuyển chúng cho dự án [tên dự án]: [mô tả ngắn, đối tượng người dùng, cảm giác thương hiệu, ngôn ngữ giao diện].
Giữ nguyên các quy tắc về layout, motion, accessibility, hiệu năng và nghiệm thu.
Thay bảng màu, font, giọng viết và mọi ví dụ về trà cho hợp với dự án mới.
Đổi tên skill từ tvs-* sang [tiền tố mới] (tên thư mục và trường name), viết lại description cho đúng lúc cần gọi.
Xóa tvs-atlas-map nếu dự án không cần bản đồ Việt Nam.
```

3. Đọc lại từng `SKILL.md`, nhất là bảng màu và giọng viết, trước khi commit.

## Những chỗ cần đổi

| Skill | Cần đổi |
|---|---|
| Tất cả | `name:` và `description:` trong frontmatter, tên thư mục. `description` quyết định khi nào Claude gọi skill. |
| `tvs-design-system` | Bảng 8 token màu, quy tắc phối màu theo ngữ nghĩa, font (Fraunces, Be Vietnam Pro), mô tả card (TeaCard, StoryCard), quy tắc ảnh. Đổi cả `references/code.md`. |
| `tvs-motion` | Các ví dụ "hơi trà", "đang ủ trà". Hằng số easing và duration giữ nguyên được. |
| `tvs-ui-qa` | Mục "Sản phẩm" (10 giây, 3 click, AI Trà Sư), tên trang dành cho thành viên. |
| `tvs-content-voice` | Thông điệp, đối tượng, thuật ngữ, bảng heading mẫu, giới hạn nội dung. |
| `tvs-atlas-map` | Chỉ giữ nếu cần bản đồ Việt Nam; khi giữ, không bỏ quy tắc về Hoàng Sa, Trường Sa. |

## Giữ nguyên

- Quy tắc contrast: chữ nhấn dùng utility tự đổi sắc theo nền (`text-gold`, `text-clay`), chữ phụ không nhạt hơn 65% trên nền sáng.
- Font tiếng Việt phải có subset `vietnamese`; line-height heading ≥ 1.1 để dấu chồng không bị cắt.
- Không gắn animation bắt đầu từ `opacity: 0` lên ảnh hero (làm chậm LCP).
- Mọi phần tử con của grid chứa danh sách cuộn ngang cần `min-w-0`.
- Kiểm tra trang dành cho thành viên ở trạng thái đã đăng nhập.
