// File constructor Product và tính giá sản phẩm theo khối lượng

const URL = "https://63f47a4c55677ef68bbcc8ea.mockapi.io/products"; //Product của Hưng Lợi
const URL2 = "https://63f47a4c55677ef68bbcc8ea.mockapi.io/mihong"; //Price
// https://www.mihong.vn/api/v1/gold/prices/current

getProducts();
getPrice();

let priceSJC;
let price999;
arrayPriceUnit = []; //Mảng giá Vàng trên đơn vị gram
//Hàm lấy giá vàng hàng ngày
function getPrice() {
  apiGetPrice()
    .then((response) => {
      const prices = response.data.map((price) => {
        return new Price(
          price.buyingPrice,
          price.sellingPrice,
          price.code,
          price.dateTime
        );
      });

      priceSJC = prices[0].buyingPrice / 3.75; //Giá Vàng SJC trên 1 gram
      price999 = prices[1].buyingPrice / 3.75; //Giá Vàng SJC trên 1 gram
      arrayPriceUnit.push(priceSJC, price999);
    })
    .catch((error) => {
      alert("API get price error");
    });
}

//Hàm tính toán giá vàng (trên Đơn vị: gram) của từng sản phẩm của cửa tiệm
let productList = []; //Mảng sản phẩm của cửa hàng
function getProducts() {
  apiGetProducts()
    .then((response) => {
      productList = response.data.map((product) => {
        return new Product(
          product.id,
          product.name,
          product.price,
          product.goldPurity,
          product.weight,
          product.size,
          product.img,
          product.description,
          product.quantity,
          product.codeProduct
          // product.calculatePrice()
        );
      });
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].goldPurity === "SJC") {
          productList[i].price = productList[i].weight * arrayPriceUnit[0];
        } else {
          productList[i].price = productList[i].weight * arrayPriceUnit[1];
        }
      }
      // renderProducts(productList);
    })
    .catch((error) => {
      alert("API get product error");
    });
}

// function updateProduct(productId) {
//   apiUpdateProduct(product, productId)
//     .then((response) => {
//       //   getProducts();
//       console.log(response);
//     })
//     .catch((error) => {
//       alert("API update product price error");
//     });
// }

// =================API============================
//Request lên server lấy Giá Vàng cập nhật hàng ngày (theo đơn vị: lượng, 1 lượng = 37.5 gram)
function apiGetPrice() {
  return axios({
    method: "GET",
    url: URL2,
  });
}

//Request lên server lấy thông tin sản phẩm từ trang quản trị
function apiGetProducts() {
  return axios({
    method: "GET",
    url: URL,
  });
}

//Push Giá vàng của sản phẩm (sau khi tính toán) của hàng lên lại server của cửa hàng
// function apiUpdateProduct(product, productId) {
//   return axios({
//     method: "PUT",
//     url: `${URL}/${productId}`,
//     // url: URL,
//     data: product,
//   });
// }
