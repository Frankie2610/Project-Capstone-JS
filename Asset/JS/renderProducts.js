// Hàm hiển thị danh sách sản phẩm ra table trang Admin
// debugger
function renderProducts(products) {
    let html = products.reduce((result, product, index) => {
        return (
            result +
            `
        <tr style="font-size: 17px">c
          <td class="text-center">${index + 1}</td>
          <td class="text-center">
          <img src="${product.img}" with="80" height="80" alt="${product.name}" />
          <td>${product.name}</td>
          </td>
          <td class="text-center">${product.goldPurity}</td>
          <td class="text-center">${product.weight}</td>
          <td class="text-center">${new Intl.NumberFormat("vn-VN").format(
                product.manufactureFee
            )}</td>
          <td class="price${product.id} text-center">${new Intl.NumberFormat(
                "vn-VN"
            ).format(product.price)}</td>
          <td class="text-center">
            <button
            id="selectProduct"
              class="btn btn-primary"
              onclick="selectProduct('${product.id}')"
            >
              Xem
            </button>
            <button
              class="btn btn-danger"
              onclick="deleteProduct('${product.id}')"
            >
              Xoá
            </button>
          </td>
        </tr>
      `
        );
    }, "");
    document.getElementById("tblDanhSachSP").innerHTML = html;
}

//Hàm hiển thị sản phẩm Vàng ra giao diện trang user
const renderProductsCustomer = (products) => {
    let html = products.reduce((result, product, index) => {
        return (
            result +
            `
        <div 
        id="${product.id}" 
        class="product__item col-6 col-md-4 d-inline-flex ${product.goldPurity}"
        >
          <div class="card">
            <img
              class="imgProduct"
              src="${product.img}"
              alt="${product.name}"
            />
            <a class="text-center mt-3">${product.name}</a>
            <div class="product-footer d-flex justify-content-between">
              <a class="d-flex ms-3 mb-3 align-items-center">
                <i class="fa fa-star" aria-hidden="true"></i>
               5
              </a>
              <p class="me-3">68 đã bán</p>
            </div>
        <div
                  class="product-info flex-column justify-content-center align-items-center text-center"
                >
                  <h2>Chi tiết</h2>
                  <ul class="product__detail">
                    <li>
                      Tên: <span class="nameProduct">${product.name}</span>
                    </li>
                    <li>Loại: Vàng <span>${product.goldPurity}</span></li>
                    <li>Cân nặng: <span class="code02">${product.weight
            }</span> (chỉ)</li>
                    <li>
                      Giá: <span class="productPrice" id="price1">${new Intl.NumberFormat(
                "vn-VN"
            ).format(product.price)}</span> VNĐ
                    </li>
                    <li>Cập nhật: <span class="maSP">${product.priceDateTime
            }</span></li>
                  </ul>
                  <button onclick="addToCart(${product.id
            })" class="btn-gold-blue">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
      `
        );
    }, "");

    document.getElementById("productInformation").innerHTML = html;
}

export {
    renderProducts, renderProductsCustomer
}