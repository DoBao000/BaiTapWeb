// Đăng nhập
function dnValidate(frm){
    let emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(emailReg.test(frm.email.value)==false){
        alert("Vui lòng nhập lại email!!!");
        return false;
    }
    if(frm.password.value.length<8){
        alert("Vui lòng nhập mật khẩu hơn 8 ký tự");
        return false;
    }
    alert("Đã gửi dữ liệu");
    return true;
}

// Đăng ký
function dkValidate(frm) {
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailReg.test(frm.email.value) == false) {
        alert("Vui lòng nhập lại email!!!");
        return false;
    }
    var pass1 = frm.password1.value;
    var pass2 = frm.password2.value;
    if (pass1.length < 8) {
        alert("Vui lòng nhập mật khẩu hơn 8 ký tự");
        return false;
    }
    if (pass1 !== pass2) {
        alert("Mật khẩu nhập lại không khớp");
        return false;
    }
    alert("Đã gửi dữ liệu");
    return true;
}

// Sản phẩm - Giỏ hàng
const danhSachSanPham = {
    sp001: { ten: "Bộ loa và micro", gia: 599000, hinh: "./images/sanpham/op1_boloamicro.jpg" },
    sp002: { ten: "Khung backdrop", gia: 229000, hinh: "./images/sanpham/op1_khungbackdrop.jpg" },
    sp003: { ten: "Hộp bong bóng rút tiền", gia: 399000, hinh: "./images/sanpham/op2_hopbongbong.jpg" },
    sp004: { ten: "Bó hoa sinh nhật", gia: 499000, hinh: "./images/sanpham/op2_bohoahong.jpg" },
    sp005: { ten: "Gấu bông", gia: 299000, hinh: "./images/sanpham/op2_gaubong.jpg" },
    sp006: { ten: "Đồng hồ treo tường", gia: 119000, hinh: "./images/sanpham/op2_donghotrotuong.jpg" },
    sp007: { ten: "Bánh kem mẫu 1", gia: 269000, hinh: "./images/sanpham/op3_banhkemtheomau1.jpg" },
    sp008: { ten: "Bánh kem mẫu 2", gia: 269000, hinh: "./images/sanpham/op3_banhkemtheomau2.jpg" },
    sp009: { ten: "Bánh kem mẫu 3", gia: 269000, hinh: "./images/sanpham/op3_banhkemtheomau3.jpg" },
    sp010: { ten: "Bình xịt tuyết", gia: 27000, hinh: "./images/sanpham/op4_binhxittuyet.jpg" },
    sp011: { ten: "Bộ dĩa nhựa", gia: 29000, hinh: "./images/sanpham/op4_bodia.jpg" },
    sp012: { ten: "Bộ ly nhựa", gia: 26000, hinh: "./images/sanpham/op4_boly.jpeg" },
    sp013: { ten: "Nón sinh nhật", gia: 210000, hinh: "./images/sanpham/op4_nonsinhnhat.jpg" },
    sp014: { ten: "Bong bóng mạ chrome", gia: 24000, hinh: "./images/sanpham/op4_bongbongchrome.jpg" },
    sp015: { ten: "Dây treo trang trí", gia: 89000, hinh: "./images/sanpham/op4_daytreo.jpg" },







};

// định dạng tiền tệ
function dinhDangTien(te) {
    return te.toLocaleString('vi-VN') + 'đ';
}

// thêm sản phẩm vào localStorage (gọi từ nút "Chọn")
function themSP(maSP) {
    let soLuong = parseInt($(`#${maSP}`).val());
    let gioHang = JSON.parse(localStorage.getItem("gioHang")) || {};

    if (gioHang[maSP]) {
        gioHang[maSP] += soLuong;
    } else {
        gioHang[maSP] = soLuong;
    }
    localStorage.setItem("gioHang", JSON.stringify(gioHang));
    alert("Đã thêm sản phẩm vào giỏ hàng!");
}

$(document).ready(function () {
    if ($("#giohang").length > 0) {
        function hienThiGioHang() {
            let gioHang = JSON.parse(localStorage.getItem("gioHang")) || {};
            let html = "";
            let tong = 0;

            $.each(gioHang, function (ma, sl) {
                if (danhSachSanPham[ma]) {
                    let sp = danhSachSanPham[ma];
                    let thanhTien = sp.gia * sl;
                    tong += thanhTien;
                    html += `
    <div class="item" data-id="${ma}">
        <img src="${sp.hinh}" alt="${sp.ten}" class="anhsp" />
        <div class="ttsp">
            <p><b>${sp.ten}</b></p>
            <input class="soluong" type="number" value="${sl}" min="1" max="10"/>
            <p>${dinhDangTien(thanhTien)} <i class="fa-solid fa-trash xoa"></i></p>
        </div>
    </div>
`;

                }
            });

            $("#giohang").html(html + `
                <div id="thanhtoan">
                    <div id="tongcong">
                        <b>Tổng cộng</b>
                        <p>${dinhDangTien(tong)}</p>
                    </div>
                    <div>
                        <button id="muahang">Đặt hàng</button>
                    </div>
                </div>
            `);
        }

        // Hiển thị giỏ hàng
        hienThiGioHang();

        // Cập nhật số lượng
        $("#giohang").on("change", ".soluong", function () {
            let maSP = $(this).closest("div[data-id]").attr("data-id");
            let soLuongMoi = parseInt($(this).val());
            let gioHang = JSON.parse(localStorage.getItem("gioHang")) || {};
            gioHang[maSP] = soLuongMoi;
            localStorage.setItem("gioHang", JSON.stringify(gioHang));
            hienThiGioHang();
        });

        // Xóa sản phẩm
        $("#giohang").on("click", ".xoa", function () {
            let maSP = $(this).closest("div[data-id]").attr("data-id");
            let gioHang = JSON.parse(localStorage.getItem("gioHang")) || {};
            delete gioHang[maSP];
            localStorage.setItem("gioHang", JSON.stringify(gioHang));
            hienThiGioHang();
        });

        // Đặt hàng
        $("#giohang").on("click", "#muahang", function () {
            alert("Cảm ơn bạn đã đặt hàng!");
            localStorage.removeItem("gioHang");
            hienThiGioHang();
        });
    }
});

//liên hệ
function Formlh() {
    var ten = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var loiNhan = document.querySelector("textarea").value;

    if (ten === "" || email === "" || loiNhan === "") {
        alert("Vui lòng điền đầy đủ thông tin!");
    } else {
        alert("Cảm ơn bạn đã liên hệ và góp ý!");
    }
}