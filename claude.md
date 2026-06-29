### RULE
1. Mỗi file .html (mỗi trang) đều sẽ có 1 <meta description...>
2. Phần ảnh, nếu ko có thì để alt text là tên ảnh tương ứng, có dấu
3. Với nhiều route cùng ăn chung 1 file html (ví dụ như nhiều sản phẩm cùng ăn 1 file product.html chỉ khác nhau id để query xuống file json. Hãy dùng hàm để set các thuộc tính nêu ở dưới)
4. Nếu thiếu thông tin, tự suy luận theo context hiện có, không hỏi lại. Ghi chú assumption ở cuối file đã sửa.
5. Chỗ nào bịa meta description, theo format này: Meta description template: [Tên sản phẩm] Cellvany: [thành phần chính] + [công dụng]. 
Không SLS, không paraben. An toàn khi [dùng cho ai]. [CTA].
Tối đa 155 ký tự.
6. Sửa trực tiếp vào file gốc. Không tạo file mới trừ khi file chưa tồn tại.
### FILE STRUCTURE
- Sản phẩm: asset/data/data.json (field: id, name, slug, metaDescription, h1, h2...)
- Blog: asset/data/vlog.json
- Product pages: /products/{slug}.html
- Blog pages: /blog/{slug}.html
- Shared JS: asset/js/shared.js

### TODO
1. Với 2 product có tên như thế này Product – Dầu Gội Herbal Repair Shampoo và Product – Intensive Hydrating Serum (nếu ko có thì thêm product vào). Hãy làm như sau:
  *  Dầu Gội Herbal Repair Shampoo:
    - title: Dầu Gội Bưởi Năm Roi & Bồ Kết Thuần Chay | Cellvany
    - meta description: Herbal Repair Shampoo Cellvany: bưởi năm roi kháng khuẩn + đương quy kích thích mọc tóc. Không SLS, không paraben. An toàn khi cho con bú. Mua ngay.
    - H1: Dầu Gội Phục Hồi Thảo Mộc Bưởi Năm Roi & Bồ Kết – Herbal Repair Shampoo Cellvany
    - H2: Tại Sao Bưởi Năm Roi & Đương Quy Giúp Tóc Mẹ Sau Sinh Phục Hồi Từ Gốc?
  *  Product – Intensive Hydrating Serum:
    - title: Serum Cám Gạo Mờ Thâm Nám Sau Sinh | Cellvany
    - meta description: Intensive Hydrating Serum Cellvany: HA đa tầng + Vitamin B3 cám gạo mờ thâm, phục hồi da chỉ 30 giây. An toàn khi đang cho con bú. Xem đánh giá thật ngay.
    - H1: Serum Cám Gạo Mờ Thâm Nám Sau Sinh – Phục Hồi Da Trong 30 Giây
    - H2: HA Đa Tầng + Vitamin B3 Cám Gạo: Bộ Đôi Xử Lý Thâm Nám Sau Sinh?
  * Các product khác thì bịa những gì còn thiếu (nhất là bịa meta description)

2. Phần blog, hiện đang có 13 blog, lấy 2 cái đầu tiên. Sửa như sau nếu sai:
  * Blog hiện đầu tiên (id=1):
    - title: Cách Trị Rụng Tóc Sau Sinh Bằng Bưởi & Bồ Kết Hiệu Quả
    - meta description: Tóc rụng nhiều sau sinh? Khám phá cách dùng bưởi năm roi và bồ kết để phục hồi tóc an toàn, hiệu quả. Mẹ nào cũng làm được. Đọc ngay để không bỏ lỡ.
    - H1: Cách Trị Rụng Tóc Sau Sinh An Toàn Bằng Bưởi Năm Roi Và Bồ Kết – Có Khoa Học Chứng Minh
    - H2.1: Tại Sao Tóc Rụng Nhiều Sau Sinh? Nguyên Nhân Từ Khoa Học
    - H2.2: Bưởi Năm Roi Và Bồ Kết Có Thực Sự Giúp Tóc Mọc Lại Không?
    - H2.3: Cách Sử Dụng Đúng Để Đạt Hiệu Quả – Và Khi Nào Nên Gặp Bác Sĩ
    - Phần nội dung nhỏ đi tìm trên mạng rồi trích dẫn ở trên mạng. 
      có thể áp dụng EEAT: Cite ít nhất 1 nghiên cứu về limonene/flavonoid trong vỏ bưởi và kích thích mọc tóc (PubMed hoặc Journal of Dermatology). Ghi rõ tên tác giả bài + chuyên môn. Thêm disclaimer: "Tham khảo bác sĩ nếu rụng tóc kéo dài trên 6 tháng."
  * Blog hiện tiếp theo (id=2):
    - title: Trẻ Sơ Sinh Bị Hăm Tã: Cẩm Nang Xử Lý Đúng Cách
    - meta description: Bé hăm tã đỏ tấy, quấy khóc? Cẩm nang đầy đủ từ phòng ngừa đến điều trị tại nhà an toàn cho trẻ sơ sinh. Không corticoid. Xem ngay để xử lý đúng.
    - H1: Trẻ Sơ Sinh Bị Hăm Tã Phải Làm Sao? Hướng Dẫn Toàn Diện Từ Phòng Ngừa Đến Điều Trị
    - H2.1: Nhận Biết 4 Mức Độ Hăm Tã – Từ Nhẹ Đến Nặng Cần Đến Bác Sĩ
    - H2.2: 5 Bước Xử Lý Hăm Tã Tại Nhà An Toàn Cho Bé Sơ Sinh
    - H2.3: Phòng Ngừa Hăm Tái Phát: Sai Lầm Cha Mẹ Hay Gặp Nhất
    - Phần nội dung nhỏ đi tìm trên mạng rồi trích dẫn ở trên mạng. 
        có thể áp dụng EEAT: YMYL bắt buộc — ghi rõ bài được review bởi bác sĩ nhi khoa (tên + chứng chỉ), thêm Medical Disclaimer ở đầu trang, cite Hội Nhi khoa Việt Nam hoặc WHO guideline về diaper rash. Article Schema có dateModified cập nhật ≤6 tháng.
###