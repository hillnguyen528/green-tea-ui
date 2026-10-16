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
