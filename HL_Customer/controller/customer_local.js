//* Khi lỗi cartArray not defined thì khai báo let cartArray = [] lại ở hàm addToCart(productId)
showPrice();
let cartArray = getProductsInCart(); //Mảng các sản phẩm giỏ hàng
renderTable(cartArray); //re-render table cart khi refresh lại trang
let productCart;
let pricesList;

let customerData = []; //Khai báo mảng thông tin feedback của KH
getFeedback(); //lấy dữ liệu feedback

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
  let array999 = []; //Mảng Vàng nhẫn 24k
  let array750 = []; //Mảng Vàng nhẫn 24k
  let array680 = []; //Mảng Vàng nhẫn 24k
  let array610 = []; //Mảng Vàng nhẫn 24k
  let arrayThanTai = []; //Mảng Vàng vỉ Thần Tài

  // //productList đang là 1 Promise, nên phải đưa nó vào hàm then () để xử lý giá trị tiếp
  for (i = 0; i < productList.length; i++) {
    if (productList[i].goldPurity === "999") {
      array999.push(productList[i]);
    }
  }
  for (i = 0; i < productList.length; i++) {
    if (productList[i].goldPurity === "750") {
      array750.push(productList[i]);
    }
  }
  for (i = 0; i < productList.length; i++) {
    if (productList[i].goldPurity === "680") {
      array680.push(productList[i]);
    }
  }
  for (i = 0; i < productList.length; i++) {
    if (productList[i].goldPurity === "610") {
      array610.push(productList[i]);
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
    renderProductsCustomer(array999);
  } else if (productType === 2) {
    renderProductsCustomer(array750);
  } else if (productType === 3) {
    renderProductsCustomer(array680);
  } else if (productType === 4) {
    renderProductsCustomer(array610);
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

//Hàm hiển thị Đơn hàng ra giao diện
function renderTable(cartArray) {
  let html = cartArray.reduce((result, productCart, index) => {
    return (
      result +
      `
      <div style="border-top: none !important" class="table d-flex justify-content-between">
          <div>
            <img src="${productCart.img}" with="80" height="80" />
          </div>
          <div>
          <div class="productCartName">${productCart.name}</div>
          <div class="d-flex align-items-center">
          <div class="productCartPrice">${productCart.price.toLocaleString()} ₫</div>
          <div class="quantityGroup">
          <button type='button' class='btn btn-light decrease' onclick="decreaseQuantity(${productCart.id
      })">-</button>
          <span id="numberCart">${productCart.quantity}</span>
          <button type='button' class='btn btn-light increase' onclick="increaseQuantity(${productCart.id
      })">+</button>
          </div>
            </div>
          </div>
           <div class="deleteButton">
          <span
          class="fa-regular fa-trash-can deleteButton text-center"
          onclick="deleteProduct('${productCart.id}')"
          type="button"
          >
          </span>
          </div>
     </div>
      `
    );
  }, "");
  document.getElementById("orderList").innerHTML = html;

  getElement("#totalPayment").innerHTML = `
      <div class="d-flex justify-content-between">
          <span>
              <i class="fa fa-arrow-right"></i> Tổng: 
          </span>
          <span class="ms-3">${calculateTotalCost()} ₫
          </span>
      </div>
  `;
  // setup and update the total quantity of products in UI cart
  getElement(".totalQuantity").innerHTML = calculateTotalQuantity()
  getElement(".totalQuantity2").innerHTML = calculateTotalQuantity()
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
}

//Hàm tính Tổng số sản phẩm trong giỏ hàng
function calculateTotalQuantity() {
  let totalQuantity = 0;
  for (let i = 0; i < cartArray.length; i++) {
    totalQuantity += +cartArray[i].quantity
  }
  return totalQuantity;
}

//Hàm tính chi phí tổng tiền theo sản phẩm
function calculateCost(productCartPrice, productCartQuantity) {
  let totalCostProduct =
    productCartPrice * productCartQuantity
    ;
  return totalCostProduct.toLocaleString();
}

//Hàm tính tổng tiền của Đơn hàng
function calculateTotalCost() {
  let totalOrderExpense = 0;
  for (let i = 0; i < cartArray.length; i++) {
    totalOrderExpense += cartArray[i].price * cartArray[i].quantity;
  }
  return totalOrderExpense.toLocaleString();
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
}

function openModal() {
  getElement("#cartModal").style.display = "block";
}

function closeModal() {
  getElement("#cartModal").style.display = "none";
}

//Hàm lấy phản hồi khách hàng
getElement("#sendFeedback").addEventListener("click", async (evt) => {
  try {
    console.log(checkValid);
    evt.preventDefault();
    if (checkValid) {
      let time = new Date();
      let date = time.getDate();
      let month = time.getMonth() + 1;
      let year = time.getFullYear();
      let hour = time.getHours();
      let minute = time.getMinutes();
      let second = time.getSeconds();

      const info = {
        name: getElement("#nameCustomer").value,
        email: getElement("#emailCustomer").value,
        phone: getElement("#phoneNumber").value,
        feedback: getElement("#feedbackCustomer").value,
        timeComment: date + "/" + month + "/" + year + ", " + hour + ":" + minute + ":" + second
      };
      await apiSendInformation(info);
      resetFeedback();
      alert("👉Cám ơn bạn đã góp ý. Hưng Lợi sẽ liên lạc lại bạn sớm nhất 🥰🤗");
      getFeedback();
    }
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

async function getFeedback() {
  try {
    const { data: customerData } = await axios.get(URL7);
    renderFeedbackCustomer(customerData);
  } catch (error) {
    alert("Lấy dữ liệu phản hồi Khách hàng thất bại");
  }
}

//Dùng hàm reduce
function renderFeedbackCustomer(customerData) {
  customerData = customerData.reverse();
  getElement("#feedbackCount").innerHTML = +customerData.length;
  let html = customerData.reduce((result, customer, index) => {
    return (
      result +
      `
        <div style="padding: 15px; border-top: 1px solid #dadbdd; display: flex">
          <button style="border-radius: 100%; cursor: initial; max-height: 40px; width: 40px !important" class="btn btn-success">
            <span>${customer.name.charAt(0).toUpperCase()}</span>
          </button>
          <div>          
          <span style="font-weight: 600; font-size: 17px; margin: 0 0 0 10px;">${customer.name}</span>
          <p style="margin: 5px 0 5px 10px;">${customer.feedback}</p>        
          <span style="font-size: 14px; display: block; margin-left: 10px; color:#cecece">${customer.timeComment}</span>
          </div>
        </div>
      `
    );
  }, "");
  document.getElementById("feedback").innerHTML = html;
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
    window.location.href = "#productInformation"
  } else {
    alert(
      "Sản phẩm bạn tìm hiện chưa có ở cửa hàng 🥺.Vui lòng liên hệ số 0908169498-Chị Hoa để có thông tin sớm nhất 🥰"
    );
  }
  openModalNavBar(); //Đóng Navbar lại
  getElement("#txtSearch").value = "";
}

const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    searchProduct()
  }
};
