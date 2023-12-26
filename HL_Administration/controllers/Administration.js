// Hàm tìm kiếm sản phẩm theo tên

function searchProduct() {
  // B1: DOM
  let search = getElement("#txtSearch").value;
  // B2: Lọc những product có name khớp với giá trị search
  let newProductList = productList.filter((product) => {
    //Lọc ra mảng mới có product khớp điều kiện
    let name = product.name.toLowerCase();
    search = search.toLowerCase();
    return name.indexOf(search) !== -1;
  });
  renderProducts(newProductList);
}

//Hàm tìm kiếm tên sản phẩm thông qua sự kiện type input.
getElement("#txtSearch").addEventListener("input", (evt) => {
  const search = evt.target.value.toLowerCase();
  let newProductList = productList.filter((product) => {
    let name = product.name.toLowerCase();
    console.log(name);
    return name.indexOf(search) !== -1;
  });
  renderProducts(newProductList);
});

// Hàm thêm sản phẩm: DOM và gửi yêu cầu thêm sản phẩm tới API
function createProduct() {
  debugger;
  // getElement("#manualOrAuto").disabled = false;
  const product = {
    name: getElement("#TenSP").value,
    price: +getElement("#GiaNhapTay").value,
    weight: getElement("#GiaSP").value,
    type: getElement("#productForm").value,
    img: getElement("#HinhSP").value,
    // description: getElement("#MoTaSP").value,
    goldPurity: getElement("#loaiSP").value,
    codeProduct: getElement("#maSP").value,
    manufactureFee: +getElement("#TienCongSP").value,
  };

  isValid = validate();
  if (!isValid) {
    return;
  }

  apiCreateProduct(product)
    .then((response) => {
      //1.Ở đây gọi API getProducts, ko dùng renderProducts vì renderProducts ko có giá Vàng lấy từ Mi Hồng, trong khi hàm renderProducts có biến {product.price}
      getProducts(productList);
      alertSuccess("Thêm sản phẩm thành công");
    })
    .catch((error) => {
      alertFail("Thêm sản phẩm thất bại");
    });
  $("#myModal").modal("hide");
}

// Hàm xoá sản phẩm
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(() => {
      //2. Hàm xóa chỉ cần renderProducts, không cần gọi lại API, vì hàm xóa chỉ cần ID để xóa toàn bộ object
      renderProducts(productList);
      alertSuccess("Xóa sản phẩm thành công");
    })
    .catch((error) => {
      alertFail("Xoá sản phẩm thất bại");
    });
}

// Hàm lấy chi tiết 1 sản phẩm và hiển thị lên modal
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
      // getElement("#MoTaSP").value = product.description;
      getElement("#loaiSP").value = product.goldPurity;
      getElement("#maSP").value = product.codeProduct;
      getElement("#TienCongSP").value = product.manufactureFee;

      //Hàm logic để hiển thị dropdown Auto/Manual
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

      //Hàm khóa nhập vào Cân nặng và Giá tiền nhập tay cùng lúc. Chọn 1 trong 2 option thì option còn lại set về 0
      // getOption();

      // Mở và cập nhật giao diện cho modal
      getElement(".modal-title").innerHTML = "Cập nhật sản phẩm";
      getElement(".modal-footer").innerHTML = `
        <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
        <button class="btn btn-primary" onclick="updateProduct('${product.id}')">Cập nhật</button>
      `;
      $("#myModal").modal("show");
    })
    .catch((error) => {
      alertFail("Lấy chi tiết sản phẩm thất bại");
    });
}

// Hàm cập nhật sản phẩm
function updateProduct(productId) {
  debugger;
  const product = {
    name: getElement("#TenSP").value,
    weight: getElement("#GiaSP").value,
    type: getElement("#productForm").value,
    price: +getElement("#GiaNhapTay").value,
    img: getElement("#HinhSP").value,
    // description: getElement("#MoTaSP").value,
    goldPurity: getElement("#loaiSP").value,
    codeProduct: getElement("#maSP").value,
    manufactureFee: +getElement("#TienCongSP").value,
  };

  let isValid = validate();
  if (!isValid) {
    return;
  }
  apiUpdateProduct(productId, product)
    .then((response) => {
      // renderProducts(response.data);  a
      alertSuccess("Sản phẩm đã được cập nhật");
      getProducts(productList);
      alertSuccess("Cập nhật sản phẩm thành công");
    })
    .catch((error) => {
      alertFail("Cập nhật sản phẩm thất bại");
    });
  $("#myModal").modal("hide");
}

// Hàm hiển thị danh sách sản phẩm ra table
function renderProducts(products) {
  let html = products.reduce((result, product, index) => {
    return (
      result +
      `
      <tr style="font-size: 17px">
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

//Hàm gọi Modal để chuẩn bị thêm mới sản phẩm
function addNewProduct() {
  resetForm();
}

//Hàm reset dữ liệu trên Modal
function resetForm() {
  getElement("#manualOrAuto").disabled = false;
  getElement("#manualOrAuto").selectedIndex = 0;
  getElement("#TenSP").value = "";
  getElement("#HinhSP").value = "";
  getElement("#GiaSP").value = "";
  // getElement("#MoTaSP").value = "";
  getElement("#loaiSP").selectedIndex = 0;
  getElement("#maSP").value = "";
  getElement("#TienCongSP").value = "";
  getElement("#GiaNhapTay").value = "";

  getElement("#tbTenSP").classList.remove("d-block");
  getElement("#tbCanNangSP").classList.remove("d-block");
  getElement("#tbLinkSP").classList.remove("d-block");
  // getElement("#tbMoTaSP").classList.remove("d-block");
  getElement("#tbMaSP").classList.remove("d-block");
}

// ============ DOM ===============
function getOption() {
  let selectedIndex = getElement("#manualOrAuto").selectedIndex;
  if (selectedIndex === 1) {
    getElement("#priceManual").style.display = "none";
    getElement("#weighItem").style.display = "block";
    getElement("#manufactureFee").style.display = "block";

    getElement("#GiaNhapTay").value = ""; //Set giá trị input Giá nhập tay = 0
  }
  if (selectedIndex === 2) {
    getElement("#weighItem").style.display = "none";
    getElement("#priceManual").style.display = "block";
    getElement("#manufactureFee").style.display = "none";

    //Set input Cân nặng SP và Tiền công = 0
    getElement("#TienCongSP").value = "";
    getElement("#GiaSP").value = "";
  }
}

getElement("#btnThemSP").addEventListener("click", () => {
  getOption(); //Hàm getOption() chỉ được gọi khi người dùng click vào ô dropdown

  getElement(".modal-title").innerHTML = "Thêm sản phẩm";
  getElement(".modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
    <button class="btn btn-primary" onclick="createProduct()">Thêm</button>
  `;
});

// ============ Helpers ==============
function getElement(selector) {
  return document.querySelector(selector);
}

// ===============Validation===================
function validate() {
  let isValid = true;

  // kiểm tra tên sản phẩm
  name = getElement("#TenSP").value;
  if (!name.trim()) {
    isValid = false;
    getElement("#tbTenSP").classList.add("d-block");
    getElement("#tbTenSP").innerHTML = "Tên Sản Phẩm không để trống";
  } else if (/^\d*[0-9]$/.test(name)) {
    isValid = false;
    getElement("#tbTenSP").classList.add("d-block");
    getElement("#tbTenSP").innerHTML = "Tên Sản Phẩm không hợp lệ";
  } else {
    getElement("#tbTenSP").innerHTML = "";
  }

  //kiểm tra cân nặng
  weight = getElement("#GiaSP").value;
  // if (!weight.trim()) {
  //   isValid = false;
  //   getElement("#tbCanNangSP").classList.add("d-block");
  //   getElement("#tbCanNangSP").innerHTML = "Cân nặng Sản Phẩm không để trống";
  // } else
  if (!/^\d*(\.\d+)?$/.test(weight)) {
    isValid = false;
    getElement("#tbCanNangSP").classList.add("d-block");
    getElement("#tbCanNangSP").innerHTML = "Cân nặng Sản Phẩm không hợp lệ";
  } else {
    getElement("#tbCanNangSP").innerHTML = "";
  }

  //kiểm tra đường dẫn hình ảnh
  img = getElement("#HinhSP").value;
  if (!img.trim()) {
    isValid = false;
    getElement("#tbLinkSP").classList.add("d-block");
    getElement("#tbLinkSP").innerHTML = "Đường dẫn Sản phẩm không để trống";
  } else {
    getElement("#tbLinkSP").innerHTML = "";
  }

  //kiểm tra mô tả
  // description = getElement("#MoTaSP").value;
  // if (!description.trim()) {
  //   isValid = false;
  //   getElement("#tbMoTaSP").classList.add("d-block");
  //   getElement("#tbMoTaSP").innerHTML = "Mô tả Sản Phẩm không để trống";
  // } else if (/\d/.test(description)) {
  //   isValid = false;
  //   getElement("#tbMoTaSP").classList.add("d-block");
  //   getElement("#tbMoTaSP").innerHTML = "Mô tả Sản Phẩm không hợp lệ";
  // } else {
  //   getElement("#tbMoTaSP").innerHTML = "";
  // }

  //kiểm tra Mã sản phẩm (Phải định dạng số)
  codeProduct = getElement("#maSP").value;
  if (!codeProduct.trim()) {
    isValid = false;
    getElement("#tbMaSP").classList.add("d-block");
    getElement("#tbMaSP").innerHTML = "Mã Sản Phẩm không để trống";
  } else if (!/^[0-9]*$/.test(codeProduct)) {
    isValid = false;
    getElement("#tbMaSP").classList.add("d-block");
    getElement("#tbMaSP").innerHTML = "Mã Sản Phẩm không hợp lệ";
  } else {
    getElement("#tbMaSP").innerHTML = "";
  }
  return isValid;
}

//Hàm tìm kiếm tên sản phẩm thông qua sự kiện type input
// function lookUpProduct() {
//   getElement("#txtSearch").addEventListener("input", (event) => {
//     let newProductList = productList.filter((product) => {
//       let name = product.name.toLowerCase();
//       let search = event.target.value.toLowerCase();
//       return product.name.indexOf(search) !== -1;
//     });
//     renderProducts(newProductList);
//   });
// }
