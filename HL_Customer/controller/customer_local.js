//* Khi lỗi cartArray not defined thì khai báo let cartArray = [] lại ở hàm addToCart(productId)
showPrice();
let cartArray = getProductsInCart(); //Mảng các sản phẩm giỏ hàng
renderTable(cartArray); //re-render table cart khi refresh lại trang
let productCart;
let pricesList;

//Hàm đóng/mở modal navbar
function openModalNavBar() {
  getElement("#goldNavbar").classList.toggle("show");
  getElement(".fa-x").classList.toggle("d-none");
  getElement(".fa-bars").classList.toggle("d-none");
}

function support() {
  // document.getElementById("list-support").classList.remove("d-none");
  document.getElementById("list-support").style.display = "block";
}

function closeContact() {
  // document.getElementById("list-support").classList.add("d-none");
  document.getElementById("list-support").style.display = "none";
}

//Hàm hiển thị sản phẩm Vàng (trong dropdown) theo lựa chọn Khách hàng
function chooseProducts() {
  let productType = +document.getElementById("productType").value;
  let arraySJC = []; //Mảng Vàng miếng SJC
  let array24k = []; //Mảng Vàng nhẫn 24k
  let array18k = []; //Mảng Vàng nhẫn 24k
  let array16k = []; //Mảng Vàng nhẫn 24k
  let array14k = []; //Mảng Vàng nhẫn 24k
  let arrayThanTai = []; //Mảng Vàng vỉ Thần Tài

  for (i = 0; i < productList.length; i++) {
    if (productList[i].goldPurity === "24k") {
      array24k.push(productList[i]);
    }
  }
  for (i = 0; i < productList.length; i++) {
    if (productList[i].goldPurity === "18k") {
      array18k.push(productList[i]);
    }
  }
  for (i = 0; i < productList.length; i++) {
    if (productList[i].goldPurity === "16k") {
      array16k.push(productList[i]);
    }
  }
  for (i = 0; i < productList.length; i++) {
    if (productList[i].goldPurity === "14k") {
      array14k.push(productList[i]);
    }
  }
  for (i = 0; i < productList.length; i++) {
    if (productList[i].goldPurity === "SJC") {
      arraySJC.push(productList[i]);
    }
  }
  for (i = 0; i < productList.length; i++) {
    if (productList[i].goldPurity === "24k-ThầnTài") {
      arrayThanTai.push(productList[i]);
    }
  }
  if (!productType) {
    alert("Bạn chưa chọn sản phẩm");
    return;
  } else if (productType === 1) {
    renderProductsCustomer(array24k);
  } else if (productType === 2) {
    renderProductsCustomer(array18k);
  } else if (productType === 3) {
    renderProductsCustomer(array16k);
  } else if (productType === 4) {
    renderProductsCustomer(array14k);
  } else if (productType === 5) {
    renderProductsCustomer(arraySJC);
  } else if (productType === 6) {
    renderProductsCustomer(arrayThanTai);
  }
}

//Hàm hiển thị sản phẩm Vàng ra giao diện
function renderProductsCustomer(products) {
  let html = products.reduce((result, product, index) => {
    return (
      result +
      `
      <div id="${
        product.id
      }" class="product__item col-6 col-md-4 d-inline-flex ${
        product.goldPurity
      }">
        <div class="card">
          <img
            class="imgProduct img-fluid"
            src="${product.img}"
            alt="${product.name}"
          />
          <a class="text-center mt-3">${product.name}</a>
          <div class="product-footer d-flex justify-content-between">
            <a class="d-flex ml-3 mb-3 align-items-center">
              <i class="fa fa-star" aria-hidden="true"></i>
              5
            </a>
            <p class="mr-3">68 đã bán</p>
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
                  <li>Cân nặng: <span class="code02">${
                    product.weight
                  }</span> (chỉ)</li>
                  <li>
                    Giá: <span class="productPrice" id="price1">${new Intl.NumberFormat(
                      "vn-VN"
                    ).format(product.price)}</span> VNĐ
                  </li>
                  <li>Cập nhật: <span class="maSP">${
                    product.priceDateTime
                  }</span></li>
                </ul>
                <button onclick="addToCart(${
                  product.id
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

//Hàm hiển thị Đơn hàng ra giao diện
function renderTable(cartArray) {
  let html = cartArray.reduce((result, productCart, index) => {
    return (
      result +
      `
          <tr>
          <td class="d-none d-sm-block">${productCart.id}</td>
          <td class="d-none d-sm-block">${productCart.name}</td>
          <td>
            <img src="${productCart.img}" with="70" height="70" />
          </td>
          <td>
          <button type='button' class='btn decrease' onclick="decreaseQuantity(${
            productCart.id
          })">-</button>
          <span id="numberCart">${productCart.quantity}</span>
          <button type='button' class='btn increase' onclick="increaseQuantity(${
            productCart.id
          })">+</button>
          </td>
          <td class="d-none d-sm-block">  ${new Intl.NumberFormat(
            "vn-VN"
          ).format(productCart.price)}</td>
          <td>${calculateCost(productCart.price, productCart.quantity)}</td>
          <td>
          <button
          class="btn btn-danger deleteButton text-center"
          onclick="deleteProduct('${productCart.id}')"
          >Xóa
          </button>
          </td>
        </tr>
      `
    );
  }, "");
  document.getElementById("orderList").innerHTML = html;
  // calculate payment
  const subTotal = 30000;
  const bankCharge = 10000;

  //TỔNG HÓA ĐƠN CÓ PHỤ PHÍ
  // getElement("#totalPayment").innerHTML = `
  //     <tr>
  //         <th class='text-end' colspan='2'>Phí Ship (nếu có): </th>
  //         <td>${new Intl.NumberFormat("vn-VN").format(subTotal)} (VNĐ)</td>
  //     </tr>
  //     <tr>
  //         <th class='text-end' colspan='2'>Phí Ngân Hàng</th>
  //         <td scope='col'>${new Intl.NumberFormat("vn-VN").format(
  //           bankCharge
  //         )} (VNĐ)</td>
  //     </tr>
  //     <tr>
  //         <th class='text-end' colspan='2'>
  //             <i class="fa fa-arrow-right"></i> Tổng chi phí:
  //         </th>
  //         <td scope='col'> ${new Intl.NumberFormat("vn-VN").format(
  //           calculateTotalCost() + subTotal + bankCharge
  //         )} (VNĐ)
  //         </td>
  //     </tr>
  // `;

  getElement("#totalPayment").innerHTML = `
      <tr>
          <th class='text-end' colspan='2'>
              <i class="fa fa-arrow-right"></i> Tổng chi phí: 
          </th>
          <td scope='col'> ${new Intl.NumberFormat("vn-VN").format(
            calculateTotalCost()
          )} (VNĐ)
          </td>
      </tr>
  `;
  // setup and update the total quantity of products in UI cart
  getElement(".totalQuantity").innerHTML = calculateTotalQuantity().toString();
  getElement(".totalQuantity2").innerHTML = calculateTotalQuantity().toString();
}

//Hàm thanh toán Đơn hàng
function orderPayment() {
  if (!cartArray.length) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your cart is empty!",
    });
  } else {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your order is done !",
      showConfirmButton: false,
      timer: 1500,
    });
    cartArray = [];
    closeModal();
    storeProductsInCart();
  }
}

//Hàm Reset toàn bộ giỏ hàng
function resetCart() {
  cartArray = [];
  renderTable(cartArray);
  localStorage.clear();
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Bạn đã xóa giỏ hàng",
    showConfirmButton: false,
    timer: 1500,
  });
  closeModal();
}

//Hàm tính Tổng số sản phẩm trong giỏ hàng
function calculateTotalQuantity() {
  let totalQuantity = 0;
  for (let i = 0; i < cartArray.length; i++) {
    totalQuantity += +cartArray[i].quantity.toString();
  }
  return totalQuantity;
}

//Hàm tính chi phí tổng tiền theo sản phẩm
function calculateCost(productCartPrice, productCartQuantity) {
  let totalCostProduct = new Intl.NumberFormat("vn-VN").format(
    productCartPrice * productCartQuantity
  );
  return totalCostProduct;
}

//Hàm tính tổng tiền của Đơn hàng
function calculateTotalCost() {
  let totalOrderExpense = 0;
  for (let i = 0; i < cartArray.length; i++) {
    totalOrderExpense += cartArray[i].price * cartArray[i].quantity;
  }
  return totalOrderExpense;
}

//Hàm xóa sản phẩm trong giỏ hàng theo Id
function deleteProduct(productCartId) {
  let index = cartArray.findIndex((productCart) => {
    return productCart.id == productCartId;
  });
  cartArray.splice(index, 1);
  storeProductsInCart();
}

//Hàm button tăng số lượng sản phẩm trong giỏ hàng
function increaseQuantity(productCartId) {
  let index = cartArray.findIndex((productCart) => {
    return productCart.id == productCartId;
  });
  cartArray[index].quantity = +cartArray[index].quantity + 1;
  storeProductsInCart();
}

//Hàm button giảm số lượng sản phẩm trong giỏ hàng
function decreaseQuantity(productCartId) {
  let index = cartArray.findIndex((productCart) => {
    return productCart.id == productCartId;
  });
  cartArray[index].quantity = +cartArray[index].quantity - 1;

  //Hàm xóa sản phẩm ra khỏi mảng nếu số lượng bị giảm về 0
  for (let i = 0; i < cartArray.length; i++) {
    if (cartArray[i].quantity === 0) {
      cartArray.splice(i, 1);
    }
  }

  // renderTable(cartArray);
  storeProductsInCart();
}

//productList: Mảng chứa sản phẩm của cửa hàng
function addToCart(productId) {
  // let cartArray;  Set lại dòng này, rồi refresh lại trang web rồi xóa đi.
  // //productList đang là 1 Promise, nên phải đưa nó vào hàm then () để xử lý giá trị tiếp
  productList.then((productList) => {
    let count = 0;
    let index = productList.findIndex((product) => {
      return product.id == productId;
    });
    let productCart = productList[index]; //Sp muốn thêm vào giỏ
    for (let i = 0; i < cartArray.length; i++) {
      if (productCart.id === cartArray[i].id) {
        // getProductCart();
        cartArray[i].quantity = +cartArray[i].quantity + 1;
        count++;
        break;
      }
    }
    if (!count) {
      cartArray.push(productCart);
      productCart.quantity = 1;
    }
    // renderTable(cartArray);
    storeProductsInCart();
  });
}

function openModal() {
  getElement("#cartModal").style.display = "block";
}

function closeModal() {
  getElement("#cartModal").style.display = "none";
}

//Hàm lấy phản hồi khách hàng
getElement("#sendFeedback").addEventListener("click", async (evt) => {
  // debugger;
  try {
    evt.preventDefault();
    const info = {
      name: getElement("#nameCustomer").value,
      email: getElement("#emailCustomer").value,
      phone: getElement("#phoneNumber").value,
      feedback: getElement("#feedbackCustomer").value,
    };
    await apiSendInformation(info);
    resetFeedback();
    alert("👉Cám ơn bạn đã góp ý. Hưng Lợi sẽ liên lạc lại bạn sớm nhất 🥰🤗");
  } catch {
    alert("Gửi phản hồi thất bại");
  }
});

//Hàm reset phản hồi customer
function resetFeedback() {
  getElement("#nameCustomer").value = "";
  getElement("#emailCustomer").value = "";
  getElement("#phoneNumber").value = "";
  getElement("#feedbackCustomer").value = "";
}

// =================Local Storage======================
// Lấy dữ liệu từ Local Storage
// cartArray = [];
function getProductsInCart() {
  const json = localStorage.getItem("cartArray");
  // console.log(json);
  if (!json) {
    return [];
  }

  let cartArray = JSON.parse(json);
  for (let i = 0; i < cartArray.length; i++) {
    let productCart = cartArray[i];
  }
  return cartArray;
}

//Lưu dữ liệu giỏ hàng vào Local Storage
function storeProductsInCart() {
  // debugger;
  const json = JSON.stringify(cartArray);
  localStorage.setItem("cartArray", json);
  renderTable(cartArray);
}

// ============ Helpers ==============
function getElement(selector) {
  return document.querySelector(selector);
}

// ========Component Search==========
// getElement("#txtSearch").addEventListener("input", (evt) => {
//   const search = evt.target.value.toLowerCase();
//   let newProductList = productList.filter((product) => {
//     let name = product.name.toLowerCase();
//     console.log(name);
//     return name.indexOf(search) !== -1;
//   });
//   renderProductsCustomer(newProductList);
// });

function searchProduct() {
  // //productList đang là 1 Promise, nên phải đưa nó vào hàm then () để xử lý giá trị tiếp
  productList.then((productList) => {
    // B1: DOM
    let search = getElement("#txtSearch").value;
    // B2: Lọc những product có name khớp với giá trị search
    let newProductList = productList.filter((product) => {
      //Lọc ra mảng mới có product khớp điều kiện
      let name = product.name.toLowerCase();
      search = search.toLowerCase();
      return name.indexOf(search) !== -1;
    });
    if (newProductList.length > 0) {
      renderProductsCustomer(newProductList);
    } else {
      alert(
        "Sản phẩm bạn tìm hiện chưa có ở cửa hàng 🥺.Vui lòng liên hệ số 0908169498-Chị Hoa để có thông tin sớm nhất 🥰"
      );
    }
    openModalNavBar(); //Đóng Navbar lại
    getElement("#txtSearch").value = "";
  });
}
