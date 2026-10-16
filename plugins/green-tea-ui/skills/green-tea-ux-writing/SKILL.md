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
