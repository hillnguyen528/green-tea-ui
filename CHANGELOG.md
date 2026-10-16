# Changelog

## 2.0.0

Viết lại toàn bộ thành bộ dùng chung, đổi tên thành **Green Tea UI**.

- Đổi tên repo `tra-viet-so-ui-skills` → `green-tea-ui`, plugin `tvs-ui-skills` → `green-tea-ui`, skill `tvs-*` → `green-tea-*`. Cài lại theo README; GitHub tự chuyển hướng địa chỉ repo cũ.
- Token màu trung tính theo vai trò: `ink`, `leaf`, `sprout`, `gold`, `mist`, `paper`, `clay`, `night`. Utility chữ nhấn đổi thành `text-highlight` và `text-warm` (tránh trùng token `accent` của shadcn/ui).
- Mã tham chiếu tách thành tệp dùng được ngay (`theme.css`, `.tsx`, `.ts`), đã typecheck và lint trong một dự án Next.js 16.
- Skill mới `green-tea-page-patterns`: khung trang chủ 8 nhịp, công thức section, trang con, trạng thái, kèm ví dụ mã.
- `tvs-content-voice` thành `green-tea-ux-writing`: quy tắc chung cho chữ giao diện tiếng Việt, mẫu hồ sơ giọng, giới hạn nội dung nhạy cảm.
- `tvs-ui-qa` thành `green-tea-ui-qa`: thêm 4 script (`shots`, `smoke`, `contact-sheet`, `lighthouse`) và bảng lỗi đã gặp thật.
- `tvs-atlas-map` thành `green-tea-vietnam-map`: component `VietnamMap` dùng chung, kèm đường bờ biển và phép chiếu; marker luôn đúng toạ độ.
- Thêm `docs/theming.md`, bỏ `docs/adapting.md`.

## 1.0.0

Bản đầu: 5 skill `tvs-*` xuất từ dự án Trà Việt Số.
