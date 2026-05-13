import { apiGetProducts } from "../../Asset/JS/productGetPrice_Admin.js";
// ================= Helpers =================
function getElement(selector) {
  return document.querySelector(selector);
}

// ================= STATE =================
let productList = [];

// ================= SEARCH =================
function searchProduct() {
  let search = getElement("#txtSearch").value.toLowerCase();

  let newProductList = productList.filter((product) => {
    let name = product.name.toLowerCase();
    return name.indexOf(search) !== -1;
  });

  renderProducts(newProductList);
}

getElement("#txtSearch").addEventListener("input", (evt) => {
  const search = evt.target.value.toLowerCase();

  let newProductList = productList.filter((product) => {
    let name = product.name.toLowerCase();
    return name.indexOf(search) !== -1;
  });

  renderProducts(newProductList);
});

// ================= CREATE =================
function createProduct() {
  const product = {
    name: getElement("#TenSP").value,
    price: +getElement("#GiaNhapTay").value,
    weight: getElement("#GiaSP").value,
    type: getElement("#productForm").value,
    img: getElement("#HinhSP").value,
    goldPurity: getElement("#loaiSP").value,
    codeProduct: getElement("#maSP").value,
    manufactureFee: +getElement("#TienCongSP").value,
  };

  if (!validate()) return;

  apiCreateProduct(product)
    .then(() => apiGetProducts())
    .then((res) => {
      productList = res.data;
      renderProducts(productList);
      alertSuccess("Thêm sản phẩm thành công");
      $("#myModal").modal("hide");
    })
    .catch(() => {
      alertFail("Thêm sản phẩm thất bại");
    });
}

// ================= DELETE =================
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(() => apiGetProducts())
    .then((res) => {
      productList = res.data;
      renderProducts(productList);
      alertSuccess("Xoá sản phẩm thành công");
    })
    .catch(() => {
      alertFail("Xoá sản phẩm thất bại");
    });
}

// ================= SELECT (EDIT) =================
function selectProduct(productId) {
  resetForm();

  apiGetProductById(productId)
    .then((response) => {
      const product = response.data;

      getElement("#TenSP").value = product.name;
      getElement("#GiaNhapTay").value = product.price;
      getElement("#HinhSP").value = product.img;
      getElement("#GiaSP").value = product.weight;
      getElement("#productForm").value = product.type;
      getElement("#loaiSP").value = product.goldPurity;
      getElement("#maSP").value = product.codeProduct;
      getElement("#TienCongSP").value = product.manufactureFee;

      if (!product.weight) {
        getElement("#manualOrAuto").selectedIndex = 2;
        getElement("#weighItem").style.display = "none";
        getElement("#priceManual").style.display = "block";
        getElement("#manufactureFee").style.display = "none";
      } else {
        getElement("#manualOrAuto").selectedIndex = 1;
        getElement("#priceManual").style.display = "none";
        getElement("#weighItem").style.display = "block";
        getElement("#manufactureFee").style.display = "block";
      }

      getElement("#manualOrAuto").disabled = true;

      getElement(".modal-title").innerHTML = "Cập nhật sản phẩm";
      getElement(".modal-footer").innerHTML = `
        <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
        <button class="btn btn-primary" onclick="updateProduct('${product.id}')">Cập nhật</button>
      `;

      $("#myModal").modal("show");
    })
    .catch(() => {
      alertFail("Lấy chi tiết sản phẩm thất bại");
    });
}

// ================= UPDATE (FIXED CORE ISSUE) =================
function updateProduct(productId) {
  debugger;

  const product = {
    name: getElement("#TenSP").value,
    weight: getElement("#GiaSP").value,
    type: getElement("#productForm").value,
    price: +getElement("#GiaNhapTay").value,
    img: getElement("#HinhSP").value,
    goldPurity: getElement("#loaiSP").value,
    codeProduct: getElement("#maSP").value,
    manufactureFee: +getElement("#TienCongSP").value,
  };

  let isValid = validate();
  if (!isValid) return;

  apiUpdateProduct(productId, product)
    .then(() => {
      // 🔥 QUAN TRỌNG: luôn lấy data mới từ server
      return apiGetProducts();
    })
    .then((response) => {
      productList = response.data;

      renderProducts(productList);

      alertSuccess("Cập nhật sản phẩm thành công");
    })
    .catch(() => {
      alertFail("Cập nhật sản phẩm thất bại");
    });

  $("#myModal").modal("hide");
}

// ================= RENDER =================
function renderProducts(products) {
  let html = products.reduce((result, product, index) => {
    return (
      result +
      `
      <tr style="font-size: 17px">
        <td class="text-center">${index + 1}</td>

        <td class="text-center">
          <img src="${product.img}" width="80" height="80" alt="${product.name}" />
        </td>

        <td>${product.name}</td>
        <td class="text-center">${product.goldPurity}</td>
        <td class="text-center">${product.weight}</td>

        <td class="text-center">
          ${new Intl.NumberFormat("vn-VN").format(product.manufactureFee)}
        </td>

        <td class="price${product.id} text-center">
          ${new Intl.NumberFormat("vn-VN").format(product.price)}
        </td>

        <td class="text-center">
          <button class="btn btn-primary" onclick="selectProduct('${product.id}')">Xem</button>
          <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Xoá</button>
        </td>
      </tr>
    `
    );
  }, "");

  document.getElementById("tblDanhSachSP").innerHTML = html;
}

// ================= ADD BUTTON =================
function addNewProduct() {
  resetForm();
}

// ================= RESET FORM =================
function resetForm() {
  getElement("#manualOrAuto").disabled = false;
  getElement("#manualOrAuto").selectedIndex = 0;

  getElement("#TenSP").value = "";
  getElement("#HinhSP").value = "";
  getElement("#GiaSP").value = "";
  getElement("#loaiSP").selectedIndex = 0;
  getElement("#maSP").value = "";
  getElement("#TienCongSP").value = "";
  getElement("#GiaNhapTay").value = "";
}

// ================= OPTION =================
function getOption() {
  let selectedIndex = getElement("#manualOrAuto").selectedIndex;

  if (selectedIndex === 1) {
    getElement("#priceManual").style.display = "none";
    getElement("#weighItem").style.display = "block";
    getElement("#manufactureFee").style.display = "block";

    getElement("#GiaNhapTay").value = "";
  }

  if (selectedIndex === 2) {
    getElement("#weighItem").style.display = "none";
    getElement("#priceManual").style.display = "block";
    getElement("#manufactureFee").style.display = "none";

    getElement("#TienCongSP").value = "";
    getElement("#GiaSP").value = "";
  }
}

getElement("#btnThemSP").addEventListener("click", () => {
  getOption();

  getElement(".modal-title").innerHTML = "Thêm sản phẩm";
  getElement(".modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
    <button class="btn btn-primary" onclick="createProduct()">Thêm</button>
  `;
});

// ================= VALIDATION =================
function validate() {
  let isValid = true;

  let name = getElement("#TenSP").value;
  if (!name.trim()) {
    isValid = false;
    getElement("#tbTenSP").innerHTML = "Tên Sản Phẩm không để trống";
  }

  let weight = getElement("#GiaSP").value;
  if (!/^\d*(\.\d+)?$/.test(weight)) {
    isValid = false;
    getElement("#tbCanNangSP").innerHTML = "Cân nặng không hợp lệ";
  }

  let img = getElement("#HinhSP").value;
  if (!img.trim()) {
    isValid = false;
    getElement("#tbLinkSP").innerHTML = "Hình không để trống";
  }

  let code = getElement("#maSP").value;
  if (!/^[0-9]*$/.test(code)) {
    isValid = false;
    getElement("#tbMaSP").innerHTML = "Mã sản phẩm không hợp lệ";
  }

  return isValid;
}

// ================= GLOBAL EXPORT FOR HTML onclick =================
window.selectProduct = selectProduct;
window.updateProduct = updateProduct;
window.deleteProduct = deleteProduct;
window.createProduct = createProduct;
window.searchProduct = searchProduct;
window.addNewProduct = addNewProduct;
window.getOption = getOption;