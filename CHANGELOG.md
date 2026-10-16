# Changelog

Mọi thay đổi đáng chú ý được ghi ở đây. Định dạng theo [Keep a Changelog](https://keepachangelog.com/vi/1.1.0/), phiên bản theo [Semantic Versioning](https://semver.org/lang/vi/).

## [1.0.0] - 2026-10-16

Bản phát hành đầu tiên của **Green Tea UI**: bộ skill dùng chung cho mọi dự án, viết lại từ bộ skill nội bộ của Trà Việt Số.

### Thêm

- `green-tea-design-system`: 8 token màu theo vai trò (`ink`, `leaf`, `sprout`, `gold`, `mist`, `paper`, `clay`, `night`), utility chữ nhấn tự đổi sắc theo nền (`text-highlight`, `text-warm`), quy tắc font có subset tiếng Việt, thang chữ, layout, card, form. Kèm `theme.css` và 7 primitive React.
- `green-tea-motion`: hằng số easing/duration, mẫu chuyển động, reduced motion, ngân sách hiệu năng. Kèm `Reveal`, `Parallax`, `Steam`, `MotionProvider`.
- `green-tea-page-patterns`: khung trang chủ 8 nhịp, công thức section, trang con, trạng thái chờ/trống/lỗi/chặn quyền, kèm ví dụ mã.
- `green-tea-ux-writing`: quy tắc chữ giao diện tiếng Việt, dữ liệu mẫu trung thực, giới hạn nội dung nhạy cảm, mẫu hồ sơ giọng.
- `green-tea-ui-qa`: quy trình và checklist nghiệm thu, bảng 13 lỗi đã gặp thật, 4 script (`shots`, `smoke`, `contact-sheet`, `lighthouse`).
- `green-tea-vietnam-map`: component `VietnamMap`, đường bờ biển Natural Earth đã chiếu sẵn, phép chiếu dùng chung, quần đảo Hoàng Sa và Trường Sa.
- Phân phối dạng marketplace Claude Code, script `install.sh`, tài liệu cài đặt (`docs/install.md`) và đổi thương hiệu (`docs/theming.md`).

### Đổi so với bộ tiền thân

- Tên repo `tra-viet-so-ui-skills` → `green-tea-ui` (địa chỉ cũ tự chuyển hướng), plugin `tvs-ui-skills` → `green-tea-ui`, skill `tvs-*` → `green-tea-*`.
- `tvs-content-voice` → `green-tea-ux-writing`; `tvs-atlas-map` → `green-tea-vietnam-map`.

## [0.1.0] - 2026-10-14

Bộ tiền thân, không phát hành chính thức: 5 skill `tvs-*` xuất từ dự án Trà Việt Số.

[1.0.0]: https://github.com/hillnguyen528/green-tea-ui/releases/tag/v1.0.0
[0.1.0]: https://github.com/hillnguyen528/green-tea-ui/tree/ca79b8d
