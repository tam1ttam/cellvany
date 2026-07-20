import json, html
from pathlib import Path
from datetime import date

ROOT = Path(__file__).resolve().parent
DOMAIN = "https://cellvany.id.vn"
TODAY = "2026-07-18"
BUILD_VERSION = "20260720"

PRODUCT_SLUGS = {
  1:"dau-goi-buoi-bo-ket-cho-me-sau-sinh",2:"dau-xa-khong-silicon",3:"tay-te-bao-chet-da-dau-muoi-hong",
  4:"sua-rua-mat-ph-5-5-rau-ma",5:"serum-cam-gao-mo-tham-sau-sinh",6:"kem-duong-khoa-am-mam-yen-mach",
  7:"sua-tam-oai-huong-nha-dam",8:"dau-tay-trang-hoa-tra-squalane",9:"xit-duong-hoa-hong-lo-hoi",
  10:"kem-duong-dau-ti-cho-me",11:"kem-duong-the-cho-me-va-be",12:"dau-thoa-ran-da-huu-co",
  13:"tam-goi-so-sinh-yen-mach",14:"kem-cham-soc-cham-sua-ham-ta"
}

PRODUCT_KEYWORDS = {
  1:"dầu gội trị rụng tóc cho mẹ sau sinh",2:"dầu xả không chứa silicon",3:"tẩy tế bào chết da đầu bằng muối hồng",
  4:"sữa rửa mặt pH 5.5",5:"serum cám gạo mờ thâm nám sau sinh",6:"kem dưỡng khóa ẩm mầm yến mạch",
  7:"sữa tắm oải hương nha đam cấp ẩm",8:"dầu tẩy trang hoa trà hữu cơ squalane",9:"xịt dưỡng chất hoa hồng lô hội",
  10:"kem bôi nứt đầu ti khi cho con bú",11:"kem dưỡng thể cho mẹ và bé",12:"dầu thoa ngăn ngừa rạn da hữu cơ",
  13:"sữa tắm gội sơ sinh yến mạch không cay mắt",14:"kem chăm sóc hăm tã cho trẻ sơ sinh"
}

SAFE_DESCRIPTIONS = {
  1:"Công thức làm sạch da đầu dịu nhẹ với bưởi Năm Roi, bồ kết và đương quy, dành cho mái tóc cần được chăm sóc sau sinh.",
  2:"Dầu xả không silicon giúp tóc dễ chải, mềm mượt hơn mà không tạo cảm giác nặng tóc.",
  3:"Sản phẩm làm sạch tế bào chết và dầu thừa trên da đầu với hạt muối mịn, phù hợp dùng định kỳ.",
  4:"Sữa rửa mặt pH 5.5 làm sạch nhẹ nhàng, phù hợp với làn da nhạy cảm của mẹ trong giai đoạn sau sinh.",
  5:"Serum cám gạo kết hợp Vitamin B3 và HA giúp cấp ẩm, hỗ trợ làn da trông đều màu và tươi tắn hơn.",
  6:"Kem dưỡng từ mầm yến mạch giúp giữ ẩm và giảm cảm giác khô căng trong quy trình chăm sóc da buổi tối.",
  7:"Sữa tắm không chứa xà phòng công nghiệp, làm sạch dịu nhẹ và để lại cảm giác thư giãn với hương oải hương.",
  8:"Dầu tẩy trang hoa trà và squalane giúp hòa tan kem chống nắng, lớp trang điểm và bụi bẩn mà không cần chà xát mạnh.",
  9:"Xịt dưỡng hoa hồng và lô hội giúp bổ sung độ ẩm nhanh, tiện dùng khi mẹ bận rộn.",
  10:"Kem dưỡng không mùi giúp chăm sóc vùng da đầu ti khô và nhạy cảm. Đọc kỹ hướng dẫn trước khi dùng trong thời gian cho con bú.",
  11:"Kem dưỡng thể không hương liệu nhân tạo, giúp giữ ẩm cho làn da của mẹ và bé.",
  12:"Dầu dưỡng giúp duy trì độ mềm mại và đàn hồi của da bụng, đùi và ngực trong thai kỳ.",
  13:"Sản phẩm tắm gội 2 trong 1 với yến mạch, thiết kế cho làn da và tóc mỏng manh của bé.",
  14:"Kem tạo lớp bảo vệ giúp giảm tiếp xúc trực tiếp giữa vùng da mặc tã với độ ẩm và ma sát. Không thay thế thuốc điều trị."
}

ARTICLES = [
 {"slug":"cach-tri-rung-toc-sau-sinh-buoi-bo-ket","title":"Cách Chăm Sóc Tóc Rụng Sau Sinh Bằng Bưởi Và Bồ Kết","kw":"cách trị rụng tóc sau sinh bằng bưởi bồ kết","cat":"Chăm sóc tóc sau sinh","product":1,"image":"Cham_soc_toc_rung_sau_sinh_cho_me_bim.jpeg","sections":[("Vì sao tóc rụng nhiều sau sinh?","Thay đổi nội tiết, thiếu ngủ, căng thẳng và dinh dưỡng có thể làm tóc rụng rõ hơn trong những tháng sau sinh. Hiện tượng này thường có tính tạm thời, nhưng mẹ nên đi khám nếu tóc rụng thành mảng, da đầu đau hoặc tình trạng kéo dài."),("Bưởi và bồ kết được dùng như thế nào?","Vỏ bưởi tạo mùi thơm tự nhiên; bồ kết chứa chất tạo bọt thực vật giúp làm sạch. Nên chọn sản phẩm có công thức rõ ràng thay vì tự pha quá đậm đặc, đồng thời ngừng dùng nếu da đầu kích ứng."),("Quy trình chăm sóc dễ áp dụng","Gội nhẹ nhàng, không cào da đầu, dùng dầu xả ở thân tóc và hạn chế buộc tóc quá chặt. Ăn đủ chất và nghỉ ngơi khi có thể cũng là phần quan trọng của quá trình chăm sóc.")]},
 {"slug":"da-dau-bi-dau-phai-lam-sao","title":"Da Đầu Bị Dầu Phải Làm Sao? Cách Chăm Sóc Dễ Áp Dụng","kw":"da đầu bị dầu phải làm sao","cat":"Chăm sóc tóc sau sinh","product":3,"image":"tinh_chat_tay_te_bao_chet_da_dau_tu_muoi_bien_bac_ha.jpeg","sections":[("Nguyên nhân da đầu nhanh bết","Tuyến bã nhờn, thời tiết nóng ẩm, sản phẩm không phù hợp và thói quen chạm tay lên tóc đều có thể khiến tóc nhanh bết."),("Cách gội đầu phù hợp","Tập trung làm sạch da đầu, xả kỹ và chỉ thoa dầu xả ở thân tóc. Không cần gội bằng nước quá nóng hoặc chà xát mạnh."),("Khi nào nên gặp bác sĩ?","Nếu da đầu có vảy dày, đỏ, đau, chảy dịch hoặc rụng tóc thành mảng, nên khám da liễu thay vì tự tăng tần suất tẩy da đầu.")]},
 {"slug":"tac-hai-cua-silicon-trong-dau-xa","title":"Silicon Trong Dầu Xả Có Hại Không? Cách Chọn Sản Phẩm Phù Hợp","kw":"tác hại của silicon trong dầu xả","cat":"Chăm sóc tóc sau sinh","product":2,"image":"dau_xa_suon_muot_sinh_hoc.jpeg","sections":[("Silicon trong dầu xả là gì?","Silicon tạo lớp phủ giúp tóc trông mượt và dễ chải. Không phải mọi loại silicon đều xấu, nhưng một số người thích công thức không silicon vì cảm giác nhẹ tóc."),("Khi nào tóc có cảm giác nặng?","Dùng quá nhiều dầu xả, xả chưa sạch hoặc thoa trực tiếp lên da đầu có thể khiến tóc nhanh bết, bất kể sản phẩm có silicon hay không."),("Cách chọn dầu xả","Ưu tiên kết cấu phù hợp độ dày của tóc, dùng lượng vừa đủ và theo dõi cảm giác sau vài lần gội.")]},
 {"slug":"sua-rua-mat-ph-5-5-cho-da-gi","title":"Sữa Rửa Mặt pH 5.5 Cho Da Gì? Cách Chọn Phù Hợp","kw":"sữa rửa mặt ph 5.5 cho da gì","cat":"Chăm sóc da","product":4,"image":"sua_rua_mat_tao_bot_diu_nhe.jpeg","sections":[("pH 5.5 có ý nghĩa gì?","Độ pH gần với bề mặt da thường tạo cảm giác dễ chịu hơn sau khi rửa, đặc biệt khi da dễ khô căng."),("Loại da nào có thể sử dụng?","Da thường, da khô, da hỗn hợp và da nhạy cảm đều có thể cân nhắc, nhưng độ pH không phải tiêu chí duy nhất. Hương liệu và chất làm sạch cũng cần được xem xét."),("Dấu hiệu sản phẩm chưa phù hợp","Da căng rát kéo dài, đỏ hoặc ngứa sau khi rửa là dấu hiệu nên giảm tần suất hoặc đổi sản phẩm.")]},
 {"slug":"sua-rua-mat-rau-ma-co-tac-dung-gi","title":"Sữa Rửa Mặt Rau Má Có Tác Dụng Gì Với Làn Da?","kw":"sữa rửa mặt rau má có tác dụng gì","cat":"Chăm sóc da","product":4,"image":"sua_rua_mat_tao_bot_diu_nhe.jpeg","sections":[("Vai trò chính vẫn là làm sạch","Sữa rửa mặt lưu lại trên da trong thời gian ngắn nên chức năng quan trọng nhất là lấy đi bụi bẩn, dầu thừa và kem chống nắng."),("Rau má trong sản phẩm làm sạch","Chiết xuất rau má thường được đưa vào công thức hướng đến cảm giác dịu nhẹ. Hiệu quả còn phụ thuộc toàn bộ công thức, không chỉ một thành phần."),("Cách sử dụng","Tạo bọt trong tay, massage nhẹ khoảng 30–60 giây và rửa kỹ bằng nước mát hoặc ấm nhẹ.")]},
 {"slug":"tai-sao-dung-kem-duong-am-van-bi-kho-da","title":"Tại Sao Dùng Kem Dưỡng Ẩm Vẫn Bị Khô Da?","kw":"tại sao dùng kem dưỡng ẩm vẫn bị khô da","cat":"Chăm sóc da","product":6,"image":"kem_duong_khoa_am_diu_da.jpeg","sections":[("Thoa kem khi da đã quá khô","Kem dưỡng thường dễ phát huy vai trò giữ ẩm hơn khi được thoa trên da còn hơi ẩm sau bước làm sạch hoặc serum."),("Sản phẩm chưa phù hợp","Kết cấu quá nhẹ, dùng lượng quá ít hoặc quy trình làm sạch mạnh có thể khiến da vẫn khô."),("Điều chỉnh thói quen","Hạn chế nước nóng, máy lạnh quá khô và tăng lớp dưỡng từng bước. Nếu da nứt, ngứa kéo dài, nên trao đổi với bác sĩ da liễu.")]},
 {"slug":"da-me-bim-xin-mau-thieu-ngu-phai-lam-sao","title":"Da Mẹ Sau Sinh Xỉn Màu Vì Thiếu Ngủ: Nên Chăm Sóc Thế Nào?","kw":"da mẹ bỉm xỉn màu thiếu ngủ phải làm sao","cat":"Chăm sóc da sau sinh","product":5,"image":"serum_cap_am_duong_sang_mo_tham.jpeg","sections":[("Thiếu ngủ ảnh hưởng vẻ ngoài của da","Thiếu ngủ có thể khiến da trông mệt mỏi, khô và kém tươi tắn. Đây không phải vấn đề có thể giải quyết chỉ bằng một sản phẩm."),("Routine tối giản cho mẹ bận rộn","Buổi sáng ưu tiên làm sạch nhẹ, dưỡng ẩm và chống nắng. Buổi tối làm sạch rồi dùng serum cấp ẩm và kem dưỡng."),("Chăm sóc từ sinh hoạt","Uống đủ nước, ăn đa dạng và tranh thủ nghỉ khi có thể giúp hỗ trợ sức khỏe chung.")]},
 {"slug":"ba-bau-nen-dung-nuoc-hay-dau-tay-trang","title":"Bà Bầu Nên Dùng Nước Hay Dầu Tẩy Trang?","kw":"bà bầu nên dùng nước hay dầu tẩy trang","cat":"Chăm sóc da mẹ bầu","product":8,"image":"dau_tay_trang_hoa_tra.jpeg","sections":[("Khác nhau giữa hai dạng tẩy trang","Nước tẩy trang tiện lợi; dầu tẩy trang phù hợp khi dùng kem chống nắng bền hoặc trang điểm. Cả hai đều cần công thức phù hợp với da."),("Tiêu chí lựa chọn khi mang thai","Đọc nhãn, tránh sản phẩm khiến da kích ứng và hỏi bác sĩ nếu đang điều trị da trong thai kỳ."),("Cách dùng dầu tẩy trang","Massage bằng tay khô, thêm nước để nhũ hóa rồi rửa sạch. Không cần chà mạnh bằng bông.")]},
 {"slug":"cach-bao-ve-da-khi-thuc-dem-cham-con","title":"Cách Bảo Vệ Da Khi Thức Đêm Chăm Con","kw":"cách bảo vệ da khi thức đêm chăm con","cat":"Chăm sóc da sau sinh","product":9,"image":"xit_duong_chat_toner_mist_khoa_am_tinh_chat_hoa_hong_lo_hoi.jpeg","sections":[("Giữ quy trình ngắn gọn","Một quy trình ít bước nhưng duy trì đều thường thực tế hơn với mẹ có con nhỏ."),("Ba bước cơ bản","Làm sạch dịu nhẹ, bổ sung độ ẩm và khóa ẩm. Ban ngày thêm kem chống nắng phù hợp."),("Đừng kỳ vọng sản phẩm thay thế giấc ngủ","Mỹ phẩm giúp chăm sóc bề mặt da nhưng không thay thế nghỉ ngơi, dinh dưỡng và hỗ trợ y tế khi cần.")]},
 {"slug":"bau-may-thang-nen-cham-soc-da-ran","title":"Bầu Mấy Tháng Nên Bắt Đầu Chăm Sóc Da Rạn?","kw":"bầu mấy tháng thì bôi kem trị rạn","cat":"Chăm sóc da mẹ bầu","product":12,"image":"dau_thoa_ngan_ngua_va_lam_mo_vet_ran_huu_co.jpeg","sections":[("Có thời điểm cố định không?","Rạn da phụ thuộc cơ địa, tốc độ thay đổi cân nặng và độ đàn hồi da. Có thể bắt đầu dưỡng ẩm sớm khi da có cảm giác căng hoặc khô."),("Dưỡng ẩm có ngăn hoàn toàn rạn da?","Không sản phẩm bôi ngoài nào bảo đảm ngăn hoàn toàn rạn da. Dưỡng ẩm chủ yếu giúp da mềm và giảm khó chịu do khô căng."),("Cách dùng an toàn","Thoa nhẹ nhàng trên da lành và ngừng dùng khi kích ứng. Hỏi bác sĩ trước khi dùng sản phẩm chứa hoạt chất mà mẹ chưa rõ độ an toàn.")]},
 {"slug":"bi-nut-dau-ti-khi-cho-con-bu","title":"Bị Nứt Đầu Ti Khi Cho Con Bú: Nguyên Nhân Và Cách Chăm Sóc","kw":"bị nứt đầu ti khi cho con bú","cat":"Chăm sóc mẹ sau sinh","product":10,"image":"kem_duong_lam_diu_va_bao_ve_dau_ti.jpeg","sections":[("Nguyên nhân thường gặp","Tư thế ngậm bắt vú chưa đúng, ma sát từ máy hút sữa hoặc da quá khô có thể gây đau và nứt."),("Cách chăm sóc ban đầu","Giữ vùng da sạch, khô thoáng và kiểm tra lại tư thế cho bú với người có chuyên môn. Chỉ dùng sản phẩm phù hợp cho vùng đầu ti."),("Khi nào cần hỗ trợ y tế?","Sốt, sưng nóng đỏ, chảy mủ, đau tăng hoặc nghi ngờ nhiễm trùng cần được khám sớm.")]},
 {"slug":"tre-so-sinh-bi-rom-say-nen-tam-la-gi","title":"Trẻ Sơ Sinh Bị Rôm Sảy Nên Tắm Lá Gì? Lưu Ý An Toàn","kw":"trẻ sơ sinh bị rôm sảy nên tắm lá gì","cat":"Chăm sóc em bé","product":13,"image":"Skincare_cho_be_so_sinh_luu_y_quan_trongjpeg.jpeg","sections":[("Có nên tự ý tắm lá?","Lá cây không được làm sạch hoặc pha quá đặc có thể gây kích ứng và nhiễm khuẩn. Với trẻ sơ sinh, nước sạch và sản phẩm dịu nhẹ thường dễ kiểm soát hơn."),("Giữ da bé thoáng mát","Mặc quần áo thoáng, tránh ủ quá nóng và lau khô nhẹ sau tắm."),("Khi nào cần khám?","Đưa bé đi khám nếu phát ban lan nhanh, có mủ, sốt, bé bỏ bú hoặc quấy khóc bất thường.")]},
 {"slug":"tre-so-sinh-bi-ham-ta-phai-lam-sao","title":"Trẻ Sơ Sinh Bị Hăm Tã Phải Làm Sao?","kw":"trẻ sơ sinh bị hăm tã phải làm sao","cat":"Chăm sóc em bé","product":14,"image":"tre_so_sinh_bi_ham_ta_phai_lam_sao.jpeg","sections":[("Nhận biết hăm tã nhẹ","Vùng da mặc tã đỏ và khó chịu nhưng chưa có vết loét hoặc mủ thường có thể bắt đầu chăm sóc tại nhà."),("Các bước chăm sóc","Thay tã thường xuyên, rửa bằng nước ấm, thấm khô nhẹ và để da thoáng trước khi mặc tã mới."),("Dấu hiệu cần khám","Sốt, mụn mủ, vết trợt lan rộng, đau nhiều hoặc không cải thiện là lý do cần đưa bé đến bác sĩ.")]},
 {"slug":"my-pham-thuan-chay-chong-lao-hoa-tot-khong","title":"Mỹ Phẩm Thuần Chay Chống Lão Hóa Có Tốt Không?","kw":"mỹ phẩm thuần chay chống lão hóa tốt không","cat":"Mỹ phẩm thuần chay","product":5,"image":"serum_cap_am_duong_sang_mo_tham.jpeg","sections":[("Thuần chay nói lên điều gì?","Thuần chay mô tả việc công thức không dùng thành phần có nguồn gốc động vật; khái niệm này không tự động quyết định hiệu quả trên da."),("Hiệu quả phụ thuộc công thức","Khả năng dưỡng ẩm hoặc hỗ trợ da trông tươi tắn phụ thuộc hoạt chất, nồng độ, độ ổn định và cách sử dụng."),("Cách chọn sản phẩm","Chọn theo nhu cầu da, đọc bảng nhãn và ưu tiên thương hiệu minh bạch về công thức, thử nghiệm và hướng dẫn an toàn.")]},
 {"slug":"quy-trinh-duong-da-chong-lao-hoa-thuan-chay","title":"Quy Trình Dưỡng Da Chống Lão Hóa Thuần Chay Tối Giản","kw":"quy trình dưỡng da chống lão hóa thuần chay","cat":"Mỹ phẩm thuần chay","product":6,"image":"Cach_cham_soc_da_me_bim_sua_dung_cach.jpeg","sections":[("Buổi sáng","Làm sạch nhẹ, dưỡng ẩm và chống nắng. Chống nắng đều đặn là bước quan trọng để hạn chế tác động của tia UV lên da."),("Buổi tối","Làm sạch kem chống nắng, dùng serum phù hợp rồi khóa ẩm. Tăng sản phẩm từ từ để dễ nhận biết kích ứng."),("Duy trì thực tế","Không cần quá nhiều bước. Một quy trình phù hợp và duy trì đều thường hữu ích hơn việc thay đổi sản phẩm liên tục.")]},
 {"slug":"kem-chong-nang-vat-ly-cho-ba-bau","title":"Kem Chống Nắng Thuần Vật Lý Cho Bà Bầu: Cách Chọn An Toàn","kw":"kem chống nắng thuần vật lý cho bà bầu","cat":"Chăm sóc da mẹ bầu","product":12,"image":"kem_chong_nang_vat_ly_lanh_tinh_spf_50+_pa++++.jpeg","sections":[("Kem chống nắng vật lý là gì?","Sản phẩm thường sử dụng các màng lọc khoáng như zinc oxide hoặc titanium dioxide. Mẹ bầu vẫn nên đọc toàn bộ nhãn thay vì chỉ dựa vào chữ vật lý."),("Nâng tone và bảo vệ ánh sáng nhìn thấy","Một số công thức có màu giúp hạn chế vệt trắng và tạo hiệu ứng da đều màu. Hiệu quả trước ánh sáng nhìn thấy phụ thuộc công thức cụ thể, không chỉ tên sản phẩm."),("Cách chọn trong thai kỳ","Ưu tiên sản phẩm có nguồn gốc rõ ràng, thử trước trên vùng nhỏ và hỏi bác sĩ nếu da đang điều trị hoặc có tiền sử dị ứng.")]},
 {"slug":"nam-khi-mang-thai-nen-cham-soc-the-nao","title":"Nám Khi Mang Thai Nên Chăm Sóc Thế Nào?","kw":"chữa trị nám khi mang thai","cat":"Chăm sóc da mẹ bầu","product":5,"image":"Bi_quyet_chong_ran_da_trong_thai_ki.jpeg","sections":[("Vì sao nám xuất hiện trong thai kỳ?","Thay đổi nội tiết và tiếp xúc ánh nắng có thể làm sắc tố da rõ hơn. Tình trạng ở mỗi người không giống nhau."),("Các bước chăm sóc thận trọng","Che chắn, dùng kem chống nắng phù hợp và duy trì dưỡng ẩm. Không tự dùng hoạt chất mạnh khi chưa hỏi bác sĩ."),("Khi nào cần khám da liễu?","Nếu vùng sắc tố thay đổi nhanh, có hình dạng bất thường hoặc mẹ muốn điều trị chuyên sâu, nên được bác sĩ đánh giá trực tiếp.")]},
 {"slug":"cac-loai-sua-tam-khong-chua-xa-phong","title":"Các Loại Sữa Tắm Không Chứa Xà Phòng: Cách Nhận Biết Và Lựa Chọn","kw":"các loại sữa tắm không chứa xà phòng","cat":"Chăm sóc cơ thể","product":7,"image":"sua_tam_diu_nhe_cap_am.jpeg","sections":[("Không chứa xà phòng nghĩa là gì?","Sản phẩm syndet dùng hệ chất làm sạch tổng hợp thay cho xà phòng truyền thống và thường được thiết kế với độ pH dịu hơn."),("Ai có thể cân nhắc?","Người có da khô, dễ căng sau tắm hoặc muốn công thức làm sạch nhẹ có thể cân nhắc, nhưng vẫn cần xem hương liệu và toàn bộ thành phần."),("Cách dùng để da bớt khô","Tắm nhanh với nước ấm nhẹ, không kỳ cọ mạnh và thoa dưỡng ẩm sau khi lau khô.")]}
]

def esc(value): return html.escape(str(value or ""), quote=True)
def abs_image(value):
    value = str(value or "").lstrip("/")
    return f"/{value}" if value else "/asset/logo.png"

def head(title, description, canonical, image, schema):
    return f'''<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png"><link rel="apple-touch-icon" sizes="192x192" href="/favicon-192.png"><title>{esc(title)}</title><meta name="description" content="{esc(description)}"><link rel="canonical" href="{canonical}"><meta property="og:type" content="website"><meta property="og:locale" content="vi_VN"><meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(description)}"><meta property="og:url" content="{canonical}"><meta property="og:image" content="{DOMAIN}{image}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{esc(title)}"><meta name="twitter:description" content="{esc(description)}"><meta name="twitter:image" content="{DOMAIN}{image}"><script type="application/ld+json">{json.dumps(schema, ensure_ascii=False)}</script><link rel="stylesheet" href="/seo-pages.css?v={BUILD_VERSION}"></head><body>'''

def shell_start(title, subtitle, crumb):
    return f'''<section class="seo-hero"><h1>{esc(title)}</h1><p>{esc(subtitle)}</p></section><nav class="crumbs" aria-label="Breadcrumb"><a href="/index.html">Trang chủ</a> › {crumb}</nav>'''

def scripts():
    return f'''<script src="/asset/js/shared.js?v={BUILD_VERSION}"></script><script>function seoAdd(id,btn){{CELLVANY.handleAddToCart(id,btn)}}</script></body></html>'''

def product_page(p):
    pid=p["id"]; slug=PRODUCT_SLUGS[pid]; kw=PRODUCT_KEYWORDS[pid]; url=f"{DOMAIN}/products/{slug}.html"; image=abs_image(p.get("image")); desc=SAFE_DESCRIPTIONS[pid]
    title=f"{p['name']} | Cellvany"; schema={"@context":"https://schema.org","@type":"Product","name":p["name"],"image":[DOMAIN+image],"description":desc,"sku":f"CV-{pid:03d}","brand":{"@type":"Brand","name":"Cellvany"},"offers":{"@type":"Offer","url":url,"priceCurrency":"VND","price":p["price"],"availability":"https://schema.org/InStock" if p.get("inStock") else "https://schema.org/OutOfStock","itemCondition":"https://schema.org/NewCondition"}}
    body=head(title,desc,url,image,schema)+shell_start(p["name"],desc,f'<a href="/products.html">Sản phẩm</a> › {esc(p["name"])}')
    body+=f'''<main class="seo-main"><section class="product-layout"><div class="product-photo"><img src="{image}" alt="{esc(p['name'])}" width="700" height="700"></div><div><p class="eyebrow">{esc(p['stage'])}</p><h2>{esc(p['name'])}</h2><p class="lead">{esc(desc)}</p><div class="price">{esc(p['priceDisplay'])}</div><div class="actions"><button class="btn btn-primary" onclick="seoAdd({pid},this)">Thêm vào giỏ</button><a class="btn btn-secondary" href="/cart.html">Xem giỏ hàng</a></div><p class="note">Mỹ phẩm không thay thế thuốc điều trị. Ngừng sử dụng nếu xuất hiện kích ứng và hỏi người có chuyên môn khi cần.</p></div></section><article class="content"><header class="content-heading"><p class="eyebrow">Hướng dẫn sản phẩm</p><h2>{esc(kw.title())}: thông tin cần biết</h2><p>{esc(desc)}</p></header><div class="content-grid"><section><span class="content-number">01</span><h2>Sản phẩm phù hợp với ai?</h2><p>Sản phẩm hướng đến {esc(p['stage'].lower())}. Hãy cân nhắc tình trạng da hoặc tóc thực tế và thử trên vùng nhỏ nếu bạn có cơ địa nhạy cảm.</p></section><section><span class="content-number">02</span><h2>Cách sử dụng</h2><p>Dùng lượng vừa đủ theo hướng dẫn trên bao bì. Luôn sử dụng nhẹ nhàng, tránh vùng da đang tổn thương và bảo quản sản phẩm nơi khô ráo.</p></section></div><section class="faq"><h2>Câu hỏi thường gặp</h2><details><summary>Có thể dùng hằng ngày không?</summary><p>Tần suất phụ thuộc loại sản phẩm và tình trạng cá nhân. Bắt đầu theo hướng dẫn trên nhãn và điều chỉnh nếu da hoặc tóc có dấu hiệu khó chịu.</p></details><details><summary>Khi nào nên ngừng sử dụng?</summary><p>Ngừng dùng khi có cảm giác bỏng rát, sưng, ngứa hoặc phát ban kéo dài.</p></details></section></article></main>'''+scripts()
    path=ROOT/"products"/f"{slug}.html"; path.parent.mkdir(exist_ok=True); path.write_text(body,encoding="utf-8")
    return f"products/{slug}.html"

def article_page(a, products):
    p=products[a["product"]]; image=f"/asset/img/{a['image']}"; url=f"{DOMAIN}/blog/{a['slug']}.html"; desc=f"{a['title']}. Hướng dẫn dễ hiểu, thận trọng và phù hợp cho người đọc Cellvany."
    schema={"@context":"https://schema.org","@type":"BlogPosting","headline":a["title"],"description":desc,"image":[DOMAIN+image],"datePublished":TODAY,"dateModified":TODAY,"author":{"@type":"Organization","name":"Cellvany"},"publisher":{"@type":"Organization","name":"Cellvany","logo":{"@type":"ImageObject","url":DOMAIN+"/asset/logo.png"}},"mainEntityOfPage":url}
    toc=''.join(f'<a href="#muc-{i}">{i}. {esc(h)}</a>' for i,(h,_) in enumerate(a["sections"],1)); sections=''.join(f'<section id="muc-{i}"><h2>{esc(h)}</h2><p>{esc(text)}</p></section>' for i,(h,text) in enumerate(a["sections"],1))
    related=f'''<aside class="sidebar"><h2>Sản phẩm liên quan</h2><a href="/products/{PRODUCT_SLUGS[p['id']]}.html"><img src="{abs_image(p['image'])}" alt="{esc(p['name'])}"><strong>{esc(p['name'])}</strong></a><p>Bài viết cung cấp thông tin tham khảo, không thay thế chẩn đoán hoặc điều trị y tế.</p></aside>'''
    body=head(a["title"]+" | Cellvany",desc,url,image,schema)+shell_start(a["title"],f"Giải đáp cho tìm kiếm: {a['kw']}",f'<a href="/blog.html">Blog</a> › {esc(a["title"])}')
    body+=f'''<main class="seo-main blog-layout"><article class="article"><p class="article-meta">Cellvany · Cập nhật {TODAY} · {esc(a['cat'])}</p><img class="article-image" src="{image}" alt="{esc(a['title'])}" width="1000" height="560"><div class="toc"><strong>Nội dung chính</strong>{toc}</div><p class="lead">Bài viết trả lời ngắn gọn và thực tế cho câu hỏi “{esc(a['kw'])}”, đồng thời nêu rõ những trường hợp nên tìm hỗ trợ chuyên môn.</p>{sections}<div class="note"><strong>Lưu ý:</strong> Nội dung chỉ nhằm mục đích cung cấp thông tin chung. Với mẹ bầu, mẹ sau sinh và trẻ nhỏ, hãy hỏi bác sĩ khi có triệu chứng bất thường.</div></article>{related}</main>'''+scripts()
    path=ROOT/"blog"/f"{a['slug']}.html"; path.parent.mkdir(exist_ok=True); path.write_text(body,encoding="utf-8")
    return f"blog/{a['slug']}.html"

def listing_page(articles):
    cards=''.join(f'''<a class="card" href="/blog/{a['slug']}.html"><img src="/asset/img/{a['image']}" alt="{esc(a['title'])}"><div class="card-body"><h2>{esc(a['title'])}</h2><p>{esc(a['cat'])}</p></div></a>''' for a in articles)
    url=DOMAIN+"/blog.html"; desc="Blog Cellvany chia sẻ kiến thức chăm sóc tóc sau sinh, da mẹ bầu, mẹ sau sinh và làn da em bé."
    schema={"@context":"https://schema.org","@type":"Blog","name":"Blog Cellvany","url":url,"description":desc}
    body=head("Blog chăm sóc mẹ và bé | Cellvany",desc,url,"/asset/hero.png",schema)+shell_start("Kiến Thức Chăm Sóc Mẹ Và Bé",desc,'Blog')+f'<main class="seo-main"><div class="grid">{cards}</div></main>'+scripts()
    (ROOT/"blog.html").write_text(body,encoding="utf-8")

def category_pages(products):
    cats=[("san-pham-cho-me-bau","Sản Phẩm Cho Mẹ Bầu","pregnant","mỹ phẩm cho mẹ bầu"),("cham-soc-da-sau-sinh","Chăm Sóc Da Sau Sinh","postpartum","sản phẩm chăm sóc da sau sinh"),("cham-soc-em-be","Sản Phẩm Chăm Sóc Em Bé","baby","sản phẩm chăm sóc em bé"),("cham-soc-toc-sau-sinh","Chăm Sóc Tóc Sau Sinh","hair","chăm sóc tóc sau sinh")]
    out=[]
    for slug,title,kind,kw in cats:
        items=[p for p in products.values() if (p["stageEn"]==kind if kind!="hair" else p["categoryEn"]=="hair-care")]
        cards=''.join(f'''<a class="card" href="/products/{PRODUCT_SLUGS[p['id']]}.html"><img src="{abs_image(p['image'])}" alt="{esc(p['name'])}"><div class="card-body"><h2>{esc(p['name'])}</h2><p>{esc(p['priceDisplay'])}</p></div></a>''' for p in items)
        url=f"{DOMAIN}/collections/{slug}.html"; desc=f"Khám phá {kw} Cellvany với thông tin rõ ràng, hướng dẫn sử dụng và bài viết liên quan."
        schema={"@context":"https://schema.org","@type":"CollectionPage","name":title,"url":url,"description":desc}
        body=head(title+" | Cellvany",desc,url,"/asset/hero.png",schema)+shell_start(title,desc,f'<a href="/products.html">Sản phẩm</a> › {title}')+f'<main class="seo-main"><div class="category-intro"><h2>{esc(kw.title())}</h2><p>{esc(desc)}</p></div><div class="grid">{cards}</div></main>'+scripts()
        path=ROOT/"collections"/f"{slug}.html"; path.parent.mkdir(exist_ok=True); path.write_text(body,encoding="utf-8"); out.append(f"collections/{slug}.html")
    return out

def sitemap(paths):
    core=["","about.html","shop.html","products.html","blog.html","contact.html"]
    urls=[]
    for p in core+paths:
        loc=DOMAIN+("/" if p=="" else "/"+p)
        priority="1.0" if p=="" else ("0.9" if p in ["shop.html","products.html","blog.html"] else "0.8")
        urls.append(f"  <url><loc>{loc}</loc><lastmod>{TODAY}</lastmod><changefreq>weekly</changefreq><priority>{priority}</priority></url>")
    (ROOT/"sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+"\n".join(urls)+'\n</urlset>\n',encoding="utf-8")

data_path=ROOT/"asset/data/data.json"; data=json.loads(data_path.read_text(encoding="utf-8")); data["products"]=[p for p in data["products"] if p["id"] in PRODUCT_SLUGS]
for p in data["products"]: p["seoUrl"]="/products/"+PRODUCT_SLUGS[p["id"]]+".html"
for s in data["stages"]: s["count"]=sum(1 for p in data["products"] if p["stageEn"]==s["id"])
data_path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
vlog={"blogs":[]}
for i,a in enumerate(ARTICLES,1):
    vlog["blogs"].append({"id":i,"title":a["title"],"slug":a["slug"],"excerpt":a["sections"][0][1],"content":"".join(f"<h2>{esc(h)}</h2><p>{esc(t)}</p>" for h,t in a["sections"]),"author":"Cellvany","date":TODAY,"category":a["cat"],"image":a["image"],"tags":[a["kw"]],"metaDescription":f"{a['title']}. Hướng dẫn rõ ràng và dễ áp dụng từ Cellvany."})
(ROOT/"asset/data/vlog.json").write_text(json.dumps(vlog,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
products={p["id"]:p for p in data["products"]}; generated=[product_page(p) for p in data["products"]]; generated += [article_page(a,products) for a in ARTICLES]; listing_page(ARTICLES); generated += category_pages(products); sitemap(generated)
print(f"Generated {len(generated)} SEO pages, blog listing and sitemap")
