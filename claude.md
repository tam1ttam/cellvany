# RULE
1. Các hình cần thiết để trong thư mục asset với tên tương ứng
2. Tên file ảnh phải đúng theo chuẩn SEO được quy định trong từng task (xem cột ⑥ Image File Name)
3. Alt text ảnh phải điền đúng theo cột ⑥ Alt Text trong SEO plan
4. Mọi nội dung text đều căn lề đều 2 bên (text-align: justify)


# DONE ✅
1. ~~Ghi sản phẩm vào data.json theo danh mục (Hair Care, Face Care, Body Care, mở rộng)~~
2. ~~Xóa block sản phẩm dư thừa ở cuối blog.html, contact.html, about.html~~
3. ~~Các thẻ sản phẩm ở trang chủ click dẫn đến trang chi tiết sản phẩm (dùng localStorage + data.json)~~
4. ~~Thêm logic giỏ hàng~~
5. ~~Thêm chức năng tìm kiếm~~
6. ~~Thêm icon trái tim (wishlist) ở card & trang chi tiết sản phẩm, lưu vào wishlist và hiển thị ở wishlist.html~~
7. ~~Trang shop.html: filter theo danh mục/loại, tìm kiếm text, phân trang động từ data.json~~
8. ~~Tất cả text căn lề đều 2 bên~~
9. ~~Blog.html: xem chi tiết bài viết, nội dung lấy từ assets/data/vlog.json~~
10. ~~Thêm đăng nhập Google/Facebook, hiển thị avatar + tên người dùng ở góc màn hình~~


# TODO

## Phase 4.1 — On-Page SEO Optimization

### 1. Homepage (`/index.html`)
- **URL:** `/`
- **Title Tag:** `Cellvany – Mỹ Phẩm Thuần Chay An Toàn Cho Mẹ & Bé` (49 ký tự)
- **Meta Description:** `Cellvany – mỹ phẩm thuần chay sinh học từ thảo mộc Việt, an toàn cho mẹ bầu, mẹ sau sinh và bé sơ sinh. Không paraben, không hóa chất. Khám phá ngay.` (149 ký tự)
- **H1:** `Cellvany – Mỹ Phẩm Thuần Chay Sinh Học Được Làm Ra Cho Mẹ Và Bé`
- **H2 #1:** `Tại Sao Mẹ Bầu & Mẹ Sau Sinh Cần Skincare Khác Biệt?`
- **H2 #2:** `Bộ Sưu Tập Chăm Sóc Theo Từng Giai Đoạn: Thai Kỳ · Sau Sinh · Bé Sơ Sinh`
- **H2 #3:** `Thành Phần Thảo Mộc Thuần Việt – Minh Bạch Từ Nguồn Gốc`
- **H3:** `Bưởi Năm Roi · Đương Quy · Rau Má Vùng Cao` / `Chứng Nhận Vegan & Không Thử Nghiệm Trên Động Vật`
- **Ảnh hero:** `cellvany-homepage-hero-me-bau-me-bim-san-pham-thuan-chay.webp`
- **Alt text:** `Bộ sản phẩm mỹ phẩm thuần chay Cellvany dành cho mẹ bầu, mẹ sau sinh và bé sơ sinh an toàn`
- **Internal links đi:**
  - Anchor `chăm sóc tóc sau sinh` → `/collections/cham-soc-toc-sau-sinh`
  - Anchor `bộ sản phẩm mẹ và bé` → `/collections/me-va-be`
  - Anchor `xem combo thai kỳ` → `/products/combo-pregnancy-care`
- **Content notes:** Đặt keyword "mỹ phẩm thuần chay" trong 100 từ đầu hero copy. Thêm founder story ngắn (~30 từ), badge chứng nhận thuần chay, số lượng mẹ đã dùng + testimonial có ảnh thật (tên + tháng sinh con).

---

### 2. Collection — Chăm Sóc Tóc Sau Sinh (`/collections/cham-soc-toc-sau-sinh`)
- **Title Tag:** `Dầu Gội Trị Rụng Tóc Sau Sinh – Thảo Mộc Thuần Chay` (51 ký tự)
- **Meta Description:** `Tóc rụng nhiều sau sinh? Cellvany tập hợp sản phẩm thảo mộc thuần chay phục hồi tóc từ gốc, kích thích mọc lại tự nhiên. An toàn khi cho con bú. Xem ngay.` (154 ký tự)
- **H1:** `Phục Hồi Tóc Rụng Sau Sinh Bằng Thảo Mộc Thuần Chay – Đúng Từ Gốc`
- **H2 #1:** `Rụng Tóc Sau Sinh: Khi Nào Bình Thường, Khi Nào Cần Can Thiệp?`
- **H2 #2:** `Sản Phẩm Chăm Sóc Tóc Sau Sinh Từ Thảo Mộc Thuần Chay Cellvany`
- **H2 #3:** `Cách Chọn Sản Phẩm Phù Hợp Theo Tình Trạng Tóc Của Mẹ`
- **H3:** `Tóc Gãy Rụng → Ưu Tiên Đương Quy + Bưởi Năm Roi` / `Da Đầu Bết Dầu → Cần Thêm Bước Tẩy Tế Bào Chết`
- **Ảnh banner:** `cellvany-collection-toc-rung-sau-sinh-dau-goi-thao-moc.webp`
- **Alt text:** `Bộ sưu tập dầu gội thảo mộc thuần chay Cellvany giúp phục hồi tóc rụng sau sinh hiệu quả`
- **Internal links đi:**
  - Anchor `dầu gội bưởi năm roi` → `/products/dau-goi-herbal-repair-shampoo`
  - Anchor `tẩy da đầu muối hồng` → `/products/scalp-detox-scrub`
  - Anchor `đọc hướng dẫn phục hồi tóc` → `/blog/cach-tri-rung-toc-sau-sinh-buoi-bo-ket`
- **Content notes:** Giải thích cơ chế khoa học rụng tóc sau sinh (estrogen giảm → telogen effluvium) trong 150 từ intro để tăng authority.

---

### 3. Product — Dầu Gội Herbal Repair Shampoo (`/products/dau-goi-herbal-repair-shampoo`)
- **Title Tag:** `Dầu Gội Bưởi Năm Roi & Bồ Kết Thuần Chay | Cellvany` (51 ký tự)
- **Meta Description:** `Herbal Repair Shampoo Cellvany: bưởi năm roi kháng khuẩn + đương quy kích thích mọc tóc. Không SLS, không paraben. An toàn khi cho con bú. Mua ngay.` (148 ký tự)
- **H1:** `Dầu Gội Phục Hồi Thảo Mộc Bưởi Năm Roi & Bồ Kết – Herbal Repair Shampoo Cellvany`
- **H2 #1:** `Tại Sao Bưởi Năm Roi & Đương Quy Giúp Tóc Mẹ Sau Sinh Phục Hồi Từ Gốc?`
- **H2 #2:** `Thành Phần Thuần Tự Nhiên & Cơ Chế Tác Động`
- **H2 #3:** `Mẹ Đã Dùng Nói Gì? Kết Quả Sau 4 Tuần Sử Dụng`
- **H3:** `Đương Quy – Kích Thích Tuần Hoàn Máu Dưới Da Đầu` / `Bồ Kết Tây – Tạo Bọt Tự Nhiên, Không Cần SLS`
- **Ảnh sản phẩm:** `cellvany-dau-goi-herbal-repair-shampoo-buoi-nam-roi-bo-ket-tay.webp`
- **Alt text:** `Dầu gội phục hồi tóc rụng sau sinh Cellvany chiết xuất bưởi năm roi, bồ kết tây và rễ đương quy thuần chay`
- **Internal links đi:**
  - Anchor `dùng cùng dầu xả không silicon` → `/products/dau-xa-nutrient-conditioner`
  - Anchor `mua bộ đôi tiết kiệm hơn` → `/products/combo-hair-repair-duo`
- **Content notes:** Nêu xuất xứ nguyên liệu (bưởi năm roi – Vĩnh Long/Hậu Giang). Thêm ít nhất 5 review thật với ảnh tóc trước/sau.

---

### 4. Product — Intensive Hydrating Serum (`/products/intensive-hydrating-serum`)
- **Title Tag:** `Serum Cám Gạo Mờ Thâm Nám Sau Sinh | Cellvany` (45 ký tự)
- **Meta Description:** `Intensive Hydrating Serum Cellvany: HA đa tầng + Vitamin B3 cám gạo mờ thâm, phục hồi da chỉ 30 giây. An toàn khi đang cho con bú. Xem đánh giá thật ngay.` (154 ký tự)
- **H1:** `Serum Cám Gạo Mờ Thâm Nám Sau Sinh – Phục Hồi Da Trong 30 Giây`
- **H2 #1:** `HA Đa Tầng + Vitamin B3 Cám Gạo: Bộ Đôi Xử Lý Thâm Nám Sau Sinh`
- **H2 #2:** `Hướng Dẫn Dùng Đúng Cách: Bôi Trước Hay Sau Kem Dưỡng?`
- **H2 #3:** `Mẹ Sau Sinh Nói Gì Sau 2 Tuần Dùng Serum?`
- **H3:** `Vitamin B3 Từ Cám Gạo – Ức Chế Melanin Không Cần Hóa Chất Mạnh` / `HA Đa Tầng – Cấp Ẩm Từ Bề Mặt Đến Lớp Hạ Bì`
- **Ảnh sản phẩm:** `cellvany-intensive-hydrating-serum-cam-gao-vitamin-b3-ha.webp`
- **Alt text:** `Serum cám gạo mờ thâm nám sau sinh Cellvany với Hyaluronic Acid đa tầng và Vitamin B3 tự nhiên`
- **Internal links đi:**
  - Anchor `dùng trước với toner mist` → `/products/calming-rose-mist-toner`
  - Anchor `khóa ẩm hiệu quả hơn với` → `/products/kem-duong-lock-in-cream`
- **Content notes:** Thêm Aggregate Rating Schema (≥5 reviews thật), ảnh before/after ghi rõ tuần sử dụng. Cite cơ chế niacinamide ức chế tyrosinase từ nguồn da liễu uy tín.

---

### 5. Blog — Cách Trị Rụng Tóc Sau Sinh (`/blog/cach-tri-rung-toc-sau-sinh-buoi-bo-ket`)
- **Title Tag:** `Cách Trị Rụng Tóc Sau Sinh Bằng Bưởi & Bồ Kết Hiệu Quả` (54 ký tự)
- **Meta Description:** `Tóc rụng nhiều sau sinh? Khám phá cách dùng bưởi năm roi và bồ kết để phục hồi tóc an toàn, hiệu quả. Mẹ nào cũng làm được. Đọc ngay để không bỏ lỡ.` (148 ký tự)
- **H1:** `Cách Trị Rụng Tóc Sau Sinh An Toàn Bằng Bưởi Năm Roi Và Bồ Kết – Có Khoa Học Chứng Minh`
- **H2 #1:** `Tại Sao Tóc Rụng Nhiều Sau Sinh? Nguyên Nhân Từ Khoa Học`
- **H2 #2:** `Bưởi Năm Roi Và Bồ Kết Có Thực Sự Giúp Tóc Mọc Lại Không?`
- **H2 #3:** `Cách Sử Dụng Đúng Để Đạt Hiệu Quả – Và Khi Nào Nên Gặp Bác Sĩ`
- **H3:** `Estrogen Giảm Sau Sinh – Kẻ Chủ Mưu Của Rụng Tóc` / `Tinh Chất Bưởi vs. Bưởi Tươi – Cái Nào Hiệu Quả Hơn?`
- **Ảnh:** `cellvany-blog-rung-toc-sau-sinh-buoi-nam-roi-bo-ket-phuc-hoi.webp`
- **Alt text:** `Mẹ sau sinh bị rụng tóc nhiều – hướng dẫn phục hồi bằng tinh chất bưởi năm roi và bồ kết tự nhiên`
- **Internal links đi:**
  - Anchor `dầu gội bưởi năm roi Cellvany` → `/products/dau-goi-herbal-repair-shampoo`
  - Anchor `xem bộ đôi gội xả phục hồi tóc` → `/products/combo-hair-repair-duo`
  - Anchor `đọc thêm về tác hại silicon` → `/blog/tac-hai-cua-silicon-trong-dau-xa`
- **Content notes:** Cite nghiên cứu về limonene/flavonoid trong vỏ bưởi (PubMed). Ghi tên tác giả + chuyên môn. Thêm disclaimer nếu rụng tóc kéo dài trên 6 tháng nên gặp bác sĩ.

---

### 6. Blog — Trẻ Sơ Sinh Bị Hăm Tã (`/blog/tre-so-sinh-bi-ham-ta-phai-lam-sao`)
- **Title Tag:** `Trẻ Sơ Sinh Bị Hăm Tã: Cẩm Nang Xử Lý Đúng Cách` (47 ký tự)
- **Meta Description:** `Bé hăm tã đỏ tấy, quấy khóc? Cẩm nang đầy đủ từ phòng ngừa đến điều trị tại nhà an toàn cho trẻ sơ sinh. Không corticoid. Xem ngay để xử lý đúng.` (145 ký tự)
- **H1:** `Trẻ Sơ Sinh Bị Hăm Tã Phải Làm Sao? Hướng Dẫn Toàn Diện Từ Phòng Ngừa Đến Điều Trị`
- **H2 #1:** `Nhận Biết 4 Mức Độ Hăm Tã – Từ Nhẹ Đến Nặng Cần Đến Bác Sĩ`
- **H2 #2:** `5 Bước Xử Lý Hăm Tã Tại Nhà An Toàn Cho Bé Sơ Sinh`
- **H2 #3:** `Phòng Ngừa Hăm Tái Phát: Sai Lầm Cha Mẹ Hay Gặp Nhất`
- **H3:** `Khi Nào Thì Không Nên Tự Xử Lý Tại Nhà?` / `Kem Chống Hăm Không Corticoid – Lựa Chọn Nào Phù Hợp?`
- **Ảnh:** `cellvany-blog-ham-ta-tre-so-sinh-xu-ly-phong-ngua-an-toan.webp`
- **Alt text:** `Trẻ sơ sinh bị hăm tã đỏ tấy – cách xử lý từng bước an toàn tại nhà và phòng ngừa tái phát`
- **Internal links đi:**
  - Anchor `kem chống hăm không corticoid Cellvany` → `/products/baby-soothing-balm`
  - Anchor `sữa tắm dịu nhẹ cho bé` → `/products/baby-gentle-wash-shampoo`
- **Content notes:** ⚠️ YMYL — ghi rõ bài được review bởi bác sĩ nhi khoa (tên + chứng chỉ). Thêm Medical Disclaimer ở đầu trang. Cite Hội Nhi khoa Việt Nam hoặc WHO guideline. Article Schema có `dateModified` cập nhật ≤6 tháng.
