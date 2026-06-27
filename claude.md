# RULE

1. Site là **HTML tĩnh + JSON**, không có backend. Mọi dữ liệu hiển thị (sản phẩm, blog) chỉ **đọc** từ file `.json` tĩnh trong `assets/data/`, JS không ghi đè được các file này.
2. Mọi dữ liệu cần lưu theo người dùng/phiên làm việc (giỏ hàng, wishlist, thông tin đăng nhập) đều lưu trong **localStorage**, không lưu vào file `.json`.
3. Hình ảnh đặt trong thư mục `assets/images/` với tên file tương ứng theo slug sản phẩm (ví dụ: `dau-goi-phuc-hoi-thao-moc.jpg`).
4. Việc "đăng nhập Google/Facebook" trong site này **chỉ phục vụ mục đích hiển thị thông tin người dùng** (avatar + tên ở header), không cần xác thực bảo mật thật, không cần backend lưu session.

---

# TODO

## 1. Dữ liệu sản phẩm → `assets/data/data.json`

Dựa vào danh sách sản phẩm dưới đây, tạo cấu trúc trong `data.json` theo danh mục. Mỗi sản phẩm cần có tối thiểu các field: `id`, `slug`, `name`, `category`, `ingredients`, `description`, `price`, `image`.

### DANH MỤC CHĂM SÓC TÓC (HAIR CARE)

**Dầu gội phục hồi thảo mộc thuần chay (Herbal Repair Shampoo)**
- Thành phần tự nhiên: Tinh chất bưởi năm roi kết hợp cùng bồ kết tây và rễ đương quy cô đặc.
- Mô tả: Khởi đầu ngày mới với liệu pháp làm sạch da đầu dịu nhẹ từ cung đình. Sản phẩm giải quyết tận gốc nỗi lo rụng tóc sau sinh nhờ cơ chế kích thích tuần hoàn máu dưới da đầu của rễ đương quy, kết hợp vỏ bưởi kháng khuẩn. Công thức tạo bọt tự nhiên từ quả bồ kết giúp làm sạch mà không làm mất đi lớp dầu tự nhiên, để lại hương thơm thảo mộc mộc mạc, thư giãn, giúp mẹ giải tỏa áp lực chăm con.

**Dầu xả suôn mượt sinh học (Nutrient Conditioner)**
- Thành phần tự nhiên: Dầu dừa phân đoạn và bơ hạt mỡ (Shea Butter) hữu cơ ép lạnh.
- Mô tả: Giải pháp thay thế hoàn toàn cho Silicon công nghiệp gây bít tắc da đầu. Ứng dụng các acid béo mạch ngắn từ dầu dừa hữu cơ thấm sâu và bao bọc từng sợi tóc khô xơ, gãy rụng do thay đổi nội tiết tố. Tóc trở nên suôn mượt, bồng bềnh tự nhiên và dễ chải ngay cả khi bận rộn không kịp sấy tóc.

**Tinh chất tẩy tế bào chết da đầu từ Muối biển & Bạc hà (Scalp Detox Scrub)**
- Thành phần tự nhiên: Muối hồng Himalaya hạt mịn, tinh dầu bạc hà (Peppermint) và chiết xuất cây phỉ.
- Mô tả: Giải pháp "cứu cánh" cho tình trạng da đầu bết dầu, nhanh ngứa và có mùi do thay đổi nội tiết tố sau sinh. Các hạt muối khoáng tự nhiên nhẹ nhàng lấy đi tế bào chết, thông thoáng nang tóc, kết hợp tinh dầu bạc hà mang lại cảm giác mát lạnh tức thì, giảm stress và giúp chân tóc bồng bềnh, lâu bết hơn rõ rệt.

### DANH MỤC CHĂM SÓC DA MẶT (FACE CARE)

**Sữa rửa mặt tạo bọt dịu nhẹ (Gentle Cleansing Foam)**
- Thành phần tự nhiên: Chiết xuất hoa cúc xu (Chamomile) và rau má vùng cao.
- Mô tả: Dành riêng cho làn da nhạy cảm, dễ kích ứng của mẹ bầu và mẹ sau sinh. Với độ pH 5.5 hoàn hảo, lớp bọt bông mịn như mây từ rau má giúp lấy đi bụi mịn mà không gây khô căng. Chiết xuất hoa cúc xu đóng vai trò như một "liều thuốc làm dịu", giảm ngay các vết mẩn đỏ và củng cố độ đàn hồi tự nhiên cho da ngay từ bước làm sạch.

**Serum cấp ẩm & dưỡng sáng mờ thâm (Intensive Hydrating Serum)**
- Thành phần tự nhiên: Vitamin B3 tinh khiết chiết xuất từ cám gạo và nấm men thực vật, kết hợp Hyaluronic Acid (HA) đa tầng tự nhiên.
- Mô tả: Khôi phục làn da rạng rỡ sau những đêm dài thức muộn cùng bé. Sự kết hợp giữa HA đa tầng và Vitamin B3 nguồn gốc từ cám gạo tự nhiên tạo nên một màng nước mỏng nhẹ nuôi dưỡng da. Serum thẩm thấu chỉ sau 30 giây, giúp ức chế hắc tố melanin gây sạm nám sau sinh, làm đều màu da và se khít lỗ chân lông một cách an toàn nhất cho cả dòng sữa mẹ.

**Kem dưỡng khóa ẩm dịu da (Lock-in Cream)**
- Thành phần tự nhiên: Ceramide chiết xuất từ mầm yến mạch hữu cơ.
- Mô tả: Bước khóa ẩm hoàn hảo cho quy trình skincare tối giản. Sử dụng lớp màng lipid thông minh được phân tách từ yến mạch, kem dưỡng giúp "khóa chặt" các dưỡng chất bên dưới da, bảo vệ da khỏi máy lạnh suốt đêm. Làn da mẹ sẽ được phục hồi, căng mọng và tràn đầy sức sống vào sáng hôm sau chỉ với một bước thoa nhanh.

**Dầu tẩy trang hoa trà & Squalane thực vật (Pure Transforming Cleansing Oil)**
- Thành phần tự nhiên: Dầu hoa trà hữu cơ (Camellia Nhật Bản), Squalane chiết xuất từ quả ô-liu.
- Mô tả: Làm sạch sâu kem chống nắng và bụi mịn mà không cần bông tẩy trang chà xát làm tổn thương da. Khi tiếp xúc với nước, dầu sẽ tự nhũ hóa thành dạng sữa mịn, cuốn trôi mọi tạp chất một cách nhẹ nhàng. Squalane thực vật giúp giữ lại độ ẩm tự nhiên, nuôi dưỡng làn da mềm mại ngay cả khi vừa tẩy trang xong.

**Xịt dưỡng chất (Toner Mist) khóa ẩm tinh chất hoa hồng & Lô hội (Calming Rose Mist)**
- Thành phần tự nhiên: Nước cất hoa hồng hữu cơ nguyên chất, nước ép lô hội (Nha đam).
- Mô tả: Thiết kế dạng xịt phun sương siêu tiện lợi cho các mẹ bỉm bận rộn. Chỉ cần 3 giây xịt nhẹ, làn da mệt mỏi sẽ ngay lập tức được làm dịu, cấp ẩm và cân bằng lại độ pH. Hương hoa hồng tự nhiên thoang thoảng giúp mẹ tỉnh táo tinh thần trong những ca thức đêm chăm con.

**Kem chống nắng vật lý lành tính SPF 50+ / PA++++ (Safe Sunscreen Broad Spectrum)**
- Thành phần tự nhiên: Kẽm oxit tự nhiên (Zinc Oxide), chiết xuất trà xanh và dầu hạt mâm xôi.
- Mô tả: Lớp khiên bảo vệ da hoàn hảo khỏi tia UV và ánh sáng xanh từ điện thoại. Công thức vật lý 100% không chứa màng lọc hóa học, nâng tone nhẹ nhàng tự nhiên thay thế lớp makeup, hoàn toàn không gây cay mắt và an toàn tuyệt đối cho em bé khi áp má vào mẹ.

### DANH MỤC CHĂM SÓC CƠ THỂ & ĐẶC TRỊ (BODY & SPECIAL CARE)

**Sữa tắm dịu nhẹ cấp ẩm (Gentle Body Wash)**
- Thành phần tự nhiên: Tinh dầu oải hương (Lavender) Pháp và gel nha đam hữu cơ.
- Mô tả: Biến phòng tắm thành không gian Spa "healing" riêng biệt của mẹ. Sữa tắm không chứa xà phòng công nghiệp, nhẹ nhàng nuôi dưỡng làn da cơ thể mịn màng nhờ gel nha đam cấp nước. Hương thơm tự nhiên nguyên bản từ tinh dầu oải hương giúp xoa dịu hệ thần kinh, giảm stress và mang lại giấc ngủ sâu hơn cho mẹ sau một ngày dài.

**Kem dưỡng thể lành tính cho Mẹ & Bé (Nurturing Body Lotion)**
- Thành phần tự nhiên: Dầu hạnh nhân ngọt và Vitamin E chiết xuất từ hướng dương.
- Mô tả: Công thức 100% không hương liệu nhân tạo, kết hợp dầu hạnh nhân siêu lành tính giúp mẹ xóa mờ các vết rạn da, sần sùi ở vùng bụng, đùi. Đồng thời, chất kem dịu nhẹ này hoàn toàn an toàn để mẹ dùng massage, dưỡng ẩm toàn thân cho bé yêu, giúp gắn kết tình mẫu tử thiêng liêng.

**Dầu thoa ngăn ngừa và làm mờ vết rạn hữu cơ (Anti-Stretch Mark Treatment Oil)**
- Thành phần tự nhiên: Dầu Argan ép lạnh, dầu tầm xuân (Rosehip Oil) và tinh dầu quả bơ giàu Omega 3-6-9.
- Mô tả: Người bạn đồng hành không thể thiếu từ tháng thứ 3 của thai kỳ. Các loại dầu hạt cao cấp giàu Vitamin A và E tự nhiên giúp tăng cường độ đàn hồi tối đa cho da vùng bụng, đùi và ngực, ngăn chặn sự đứt gãy sợi collagen gây rạn. Chất dầu lỏng, thấm thấu tốt, không gây dính vào quần áo của mẹ.

**Kem dưỡng làm dịu và bảo vệ đầu ti (Organic Nipple Balm)**
- Thành phần tự nhiên: Bơ cacao hữu cơ, sáp candelilla thực vật và chiết xuất hoa cúc xu.
- Mô tả: Giải pháp làm dịu nhanh chóng tình trạng nứt cổ gà, khô rát đầu ti khi mẹ cho con bú hoặc hút sữa. Công thức đạt chuẩn thực phẩm (Food-grade) 100% thuần chay từ thực vật, không mùi, không vị. Mẹ hoàn toàn không cần lau hay rửa lại trước khi cho bé bú, cực kỳ an toàn cho hệ tiêu hóa non nớt của trẻ sơ sinh.

---

## 2. Dọn dẹp các trang tĩnh

Xóa phần nội dung dư thừa đang lặp lại ở cuối các trang `blog.html`, `contact.html`, `about.html` (đoạn liệt kê toàn bộ danh sách sản phẩm "🍼 CHĂM SÓC MẸ BỈM SỮA... 👶 CHĂM SÓC EM BÉ..." không liên quan tới nội dung chính của các trang này).

## 3. Liên kết sản phẩm → trang chi tiết (qua URL, không dùng localStorage)

- Card sản phẩm trỏ tới `product-detail.html?id=<id>`.
- Trang chi tiết đọc `id` từ URL bằng `URLSearchParams`, fetch `data.json`, tìm và render thông tin sản phẩm tương ứng.

## 4. Giỏ hàng (localStorage)

- Lưu giỏ hàng trong `localStorage` (key `cart`), dạng mảng object `{id, qty}`.
- Logic: thêm sản phẩm, tăng/giảm số lượng, xóa sản phẩm, tự tính tổng tiền.
- Icon giỏ hàng ở header hiển thị số lượng sản phẩm (đếm từ localStorage, cập nhật realtime).
- `cart.html`: hiển thị danh sách sản phẩm trong giỏ, tổng tiền, nút thanh toán (chỉ cần UI, không cần xử lý thanh toán thật vì không có backend).

## 5. Tìm kiếm sản phẩm

- Thanh tìm kiếm ở header, tìm theo tên sản phẩm/danh mục dựa trên `data.json`.
- Có thể hiển thị gợi ý realtime (dropdown) hoặc chuyển hướng sang `shop.html?search=<keyword>` để hiển thị kết quả lọc.

## 6. Wishlist (localStorage, không dùng file .json)

- Icon trái tim trên card sản phẩm và trang chi tiết sản phẩm.
- Click để thêm/xóa `id` sản phẩm vào `localStorage` (key `wishlist`).
- `wishlist.html` đọc danh sách id từ localStorage, tra cứu chi tiết tương ứng trong `data.json` để hiển thị.

## 7. Trang `shop.html`: filter, search, phân trang

- Lọc theo danh mục/loại sản phẩm.
- Tìm kiếm theo từ khóa (tên sản phẩm, mô tả).
- Phân trang động (ví dụ 9–12 sản phẩm/trang), toàn bộ xử lý bằng JS dựa trên `data.json`.

## 8. Canh lề văn bản

- Áp `text-align: justify` cho đoạn văn dài (mô tả sản phẩm, nội dung blog).
- **Không** áp dụng cho heading, button, label, breadcrumb — giữ căn trái/giữa để tránh giãn từ xấu trên các đoạn ngắn.

## 9. Blog — xem chi tiết bài viết

- Nội dung bài blog lấy từ `assets/data/blog.json` (đổi tên từ `vlog.json` cho khớp với `blog.html`).
- Trang chi tiết: `blog-detail.html?id=<id>`, đọc id từ URL, fetch `blog.json`, render nội dung bài viết.

## 10. Đăng nhập Google/Facebook — chỉ để hiển thị thông tin người dùng

Mục đích duy nhất: sau khi đăng nhập, hiển thị **avatar + tên người dùng** ở góc header. Không cần xác thực bảo mật thật, không cần backend lưu session.

Cách làm (chọn 1 trong 2):
- **Mock login**: nút "Đăng nhập với Google/Facebook" hiện form/popup nhập tên + chọn avatar mẫu → lưu vào `localStorage` (key `user`: `{name, avatar}`).
- **Real client-side**: dùng Google Identity Services / Facebook Login JS SDK (chỉ cần Client ID, không cần backend) để lấy tên + avatar thật từ tài khoản → lưu vào `localStorage` để hiển thị.

Logic header: nếu có `user` trong localStorage → hiện avatar + tên + nút đăng xuất (xóa localStorage); nếu chưa có → hiện nút đăng nhập.

## 11. Bản đồ trong footer

Nhúng Google Maps (iframe) vào footer, đặt ngay dưới phần thông tin liên hệ.

## 12. Header/Footer đồng bộ trên mọi trang

- Tạo `header.html` và `footer.html` riêng, dùng JS `fetch()` để include vào tất cả các trang — sửa một nơi, áp dụng toàn site.
- **Lưu ý**: vì dùng `fetch()` để đọc file local, phải mở site qua local server (VSCode Live Server, `python -m http.server`, `live-server`...). Mở trực tiếp bằng `file://` sẽ lỗi CORS.
- Nếu cần demo bằng cách mở file trực tiếp (không qua server), thay bằng copy thủ công nội dung header/footer vào từng trang.

---

# THỨ TỰ THỰC HIỆN ĐỀ XUẤT

1. Mục 1 — Tạo `data.json` (nền tảng cho mọi tính năng sau)
2. Mục 2 — Dọn rác HTML
3. Mục 12 — Header/Footer chung (làm sớm để tránh sửa lại nhiều lần)
4. Mục 3 — Link card → trang chi tiết qua query string
5. Mục 4 — Giỏ hàng
6. Mục 6 — Wishlist
7. Mục 7 — Filter/search/phân trang cho `shop.html`
8. Mục 5 — Tìm kiếm toàn site (header)
9. Mục 9 — Blog detail
10. Mục 11 — Map footer
11. Mục 8 — Justify text (mang tính style, làm cuối)
12. Mục 10 — Đăng nhập Google/Facebook (rủi ro/scope cao nhất, làm cuối)