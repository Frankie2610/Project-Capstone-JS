let cartArray = getProductCart(); //Mảng các sản phẩm khách
//Hàm tick để chọn loại sp mà customer mong muốn
function chooseProducts() {
  let productType = +document.getElementById("productType").value;
  s;
  let arrayVangNhan24k = []; //Mảng Vàng nhẫn 24k
  let arrayThanTai = []; //Mảng Vàng vỉ Thần Tài
  let arraySJC = []; //Mảng Vàng miếng SJC
  if (!productType) {
    alert("Bạn chưa chọn sản phẩm");
    return;
  } else if (productType === 1) {
    for (i = 0; i < productList.length; i++) {
      if (productList[i].goldPurity === "24k") {
        arrayVangNhan24k.push(productList[i]);
      }
    }
    renderProductsCustomer(arrayVangNhan24k);
  } else if (productType === 2) {
    for (i = 0; i < productList.length; i++) {
      if (productList[i].goldPurity === "SJC") {
        arraySJC.push(productList[i]);
      }
    }
    renderProductsCustomer(arraySJC);
  } else {
    for (i = 0; i < productList.length; i++) {
      if (productList[i].goldPurity === "24k-ThầnTài") {
        arrayThanTai.push(productList[i]);
      }
    }
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
      }" class="product__item col-6 col-md-4 mt-3 d-inline-flex ${
        product.goldPurity
      }">
        <div class="card">
          <img
            class="imgProduct"
            src="${product.img}"
            alt=""
          />
          <a class="text-center">${product.name}</a>
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
                  }</span> (g)</li>
                  <li>
                    Giá: <span class="productPrice" id="price1">${new Intl.NumberFormat(
                      "vn-VN"
                    ).format(product.price)}</span> VNĐ
                  </li>
                  <li>Mã SP: <span class="maSP">00${product.id}</span></li>
                </ul>
                <a class="mb-2" href="#" onclick="checkPrice()"
                  >Click đây để xem giá</a
                >
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
  debugger;
  let html = cartArray.reduce((result, productCart, index) => {
    return (
      result +
      `
          <tr>
          <td>${productCart.codeProduct}</td>
          <td>${productCart.name}</td>
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
          <td>  ${new Intl.NumberFormat("vn-VN").format(productCart.price)}</td>
          <td>${calculateCost(productCart.price, productCart.quantity)}</td>
          <td>
          <button
          class="btn btn-danger"
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
  getElement("#totalPayment").innerHTML = `
      <tr>
          <th class='text-end' colspan='5'>Phí Ship (nếu có): </th>
          <td>${new Intl.NumberFormat("vn-VN").format(subTotal)} (VNĐ)</td>
      </tr>
      <tr>
          <th class='text-end' colspan='5'>Phí Ngân Hàng</th>
          <td scope='col'>${new Intl.NumberFormat("vn-VN").format(
            bankCharge
          )} (VNĐ)</td>
      </tr>
      <tr>
          <th class='text-end' colspan='5'>
              <i class="fa fa-arrow-right"></i> Tổng chi phí: 
          </th>
          <td scope='col'> ${new Intl.NumberFormat("vn-VN").format(
            calculateTotalCost() + subTotal + bankCharge
          )} (VNĐ)
          </td>
      </tr>
  `;
  // setup and update the total quantity of products in UI cart
  getElement(".totalQuantity").innerHTML = calculateTotalQuantity().toString();
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
    resetCart(); //Reset lại giỏ hàng
    // storeProductsInCart();
  }
}

//Hàm reset, clear giỏ hàng
function resetCart() {
  let productCartId;
  for (let i = 0; i < cartArray.length; i++) {
    productCartId = cartArray[i].id;
    // cartArray = cartArray.splice(i, 1);
    apiDeleteProductCart(productCartId)
      .then((response) => {
        cartArray = []; //Set mảng về rỗng để cập nhật giao diện cho customer xem nhanh chóng (thực chất là các obj trên API đã đc clear)
        renderTable(cartArray);
      })
      .catch((error) => {
        alert("API delete product error");
      });
  }
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
calculateTotalCost();
function calculateTotalCost() {
  let totalOrderExpense = 0;
  for (let i = 0; i < cartArray.length; i++) {
    totalOrderExpense += cartArray[i].price * cartArray[i].quantity;
    // console.log(totalOrderExpense);
  }
  return totalOrderExpense;
}

//Hàm xóa sản phẩm trong giỏ hàng theo Id
function deleteProduct(productCartId) {
  // debugger;
  let index = cartArray.findIndex((productCart) => {
    return productCart.id == productCartId;
  });
  productCartId = cartArray[index].id;
  cartArray.splice(index, 1);
  apiDeleteProductCart(productCartId)
    .then((response) => {
      renderTable(cartArray);
    })
    .catch((error) => {
      alert("API delete product error");
    });
}

//Hàm button tăng số lượng sản phẩm trong giỏ hàng
function increaseQuantity(productCartId) {
  let index = cartArray.findIndex((productCart) => {
    return productCart.id == productCartId;
  });
  productCart = cartArray[index];
  cartArray[index].quantity = +cartArray[index].quantity + 1;
  apiUpdateProductCart(productCartId, productCart)
    .then((response) => {
      renderTable(cartArray);
    })
    .catch((error) => {
      alert("API increase product error");
    });
}

//Hàm button giảm số lượng sản phẩm trong giỏ hàng
function decreaseQuantity(productCartId) {
  let index = cartArray.findIndex((productCart) => {
    return productCart.id == productCartId;
  });
  productCart = cartArray[index];
  cartArray[index].quantity = +cartArray[index].quantity - 1;
  apiUpdateProductCart(productCartId, productCart)
    .then((response) => {
      renderTable(cartArray);
    })
    .catch((error) => {
      alert("API decrease product error");
    });
}

//Hàm lấy dữ liệu ban đầu trong giỏ hàng (Nếu có) và hiển thị ra giao diện
function getProductCart() {
  let cartArray = [];
  apiGetProductsCart()
    .then((response) => {
      if (!response.data) {
        //Trường hợp giỏ hàng ko có sản phẩm từ những lần lựa chọn trước nên mảng !response.data
        return [];
      }
      if (cartArray.length !== 0) {
        //Trường hợp giỏ hàng ko có sản phẩm từ những lần lựa chọn trước nên mảng !response.data và sau lần chọn đầu tiên thì đã có sản phẩm trong mảng
        cartArray.push(response.data);
        renderTable(cartArray);
      }
      if (response.data[0]) {
        //Trường hợp giỏ hàng đã có sản phẩm từ những lần lựa chọn trước
        for (let i = 0; i < response.data.length; i++) {
          cartArray.push(response.data[i]);
        }
        renderTable(cartArray);
      }
      // showKeyProduct();
    })
    .catch((error) => {
      alert("API get product error");
    });
  return cartArray;
}

//Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productChooseId) {
  // debugger;
  let count = 0; //Tạo cờ hiệu
  let productCart; //Sản phẩm trong giỏ hàng customer
  let productChoose; //Sản phẩm customer chọn để thêm vào giỏ
  let index = productList.findIndex((product) => {
    //productList: Mảng sản phẩm của cửa hàng
    return product.id == productChooseId;
  });
  for (let i = 0; i < cartArray.length; i++) {
    if (productList[index].id === cartArray[i].id) {
      productCart = cartArray[i];
      productCartId = cartArray[i].id;
      cartArray[i].quantity = +cartArray[i].quantity + 1;
      count++;
      break;
    }
  }
  if (count == 0) {
    //Tạo mới, thêm mới vào mảng giỏ hàng
    productChoose = productList[index];
    cartArray.push(productChoose);
    productChoose.quantity = 1;
    apiCreateProductCart(productChoose)
      .then((response) => {
        renderTable(cartArray);
      })
      .catch((error) => {
        alert("Thêm sản phẩm vào Giỏ hàng thất bại");
      });
  }
  if (count !== 0) {
    //Update lại số lượng nếu sản phẩm đã đc thêm vào giỏ hàng rồi
    apiUpdateProductCart(productCartId, productCart)
      .then((response) => {
        renderTable(cartArray);
      })
      .catch((error) => {
        alert("Thêm sản phẩm vào Giỏ hàng thất bại");
      });
  }
}

function openModal() {
  getElement("#cartModal").style.display = "block";
}

function closeButton() {
  getElement("#cartModal").style.display = "none";
}
// ============ Helpers ==============
function getElement(selector) {
  return document.querySelector(selector);
}
