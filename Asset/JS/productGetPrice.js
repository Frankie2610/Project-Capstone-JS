// File constructor Product và tính giá sản phẩm theo khối lượng

URL1 = "https://63f47a4c55677ef68bbcc8ea.mockapi.io/products"; //Product của Hưng Lợi
URL2 = "https://www.mihong.vn/api/v1/gold/prices/current"; //Api Mi Hồng
URL3 = "https://6426b4b4556bad2a5b55dbf6.mockapi.io/mihongPrice"; //MockApi copy Mihong

getProducts();
// getPrice();
// updatePriceProduct();

let priceSJC; //Giá Vàng SJC
let price999; //Giá Vàng 24k
arrayPriceUnit = []; //Mảng giá Vàng trên đơn vị gram

//Hàm lấy giá vàng hàng ngày
// function getPrice() {
//   apiGetPrice()
//     .then((response) => {
//       const prices = response.data.map((price) => {
//         return new Price(
//           price.buyingPrice,
//           price.sellingPrice,
//           price.code,
//           price.dateTime
//         );
//       });

//       priceSJC = prices[0].buyingPrice / 3.75; //Giá Vàng SJC trên 1 gram
//       price999 = prices[1].buyingPrice / 3.75; //Giá Vàng SJC trên 1 gram
//       arrayPriceUnit.push(priceSJC, price999);
//     })
//     .catch((error) => {
//       alert("API get price error");
//     });
// }
// $.ajax({
//   type: "GET",
//   url: URL2,
//   success: (data) => {
//     console.log(data);
//   },
//   error: () => {
//     console.log("Error");
//   },
// });

// fetch("https://www.mihong.vn/api/v1/gold/prices/current")
//   .then((response) => response.json())
//   .then(console.log);
// res.header("Access-Control-Allow-Origin", "*");

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// axios
//   .post(
//     URL2,
//     {},
//     {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json",
//         // Token: Constants.API_GHTK.API_TOKEN_KEY,
//         "X-Requested-With": "XMLHttpRequest",
//         // "Host": "dev.ghtk.vn"
//       },

//       async: true,
//       crossDomain: true,
//     }
//   )
//   .then(function (response) {
//     console.log("response is 5 : " + response.data);
//   });

// res.header("Access-Control-Allow-Origin", "true");

// const express = require("express");
// const app = express();
// app.use(cors());
// axios
//   .get("https://www.mihong.vn/api/v1/gold/prices/current", {
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//     },
//     proxy: {
//       host: "104.236.174.88",
//       port: 3128,
//     },
//   })
//   .then(function (response) {
//     console.log("response is : " + response.data);
//   })
//   .catch(function (error) {
//     if (error.response) {
//       console.log(error.response.headers);
//     } else if (error.request) {
//       console.log(error.request);
//     } else {
//       console.log(error.message);
//     }
//     console.log(error.config);
//   });

//Hàm tính toán giá vàng (trên Đơn vị: gram) của từng sản phẩm của cửa tiệm và update lại giá sau khi tính toán lên lại lên API
let productList = []; //Mảng sản phẩm của cửa hàng
async function getProducts() {
  debugger;
  try {
    let prices = (await apiGetPrice()).data;
    // console.log(response);
    // response.headers.add("Access-Control-Allow-Origin", "*");
    // console.log(prices);
    // console.log(response);
    const pricesList = prices.data.map((price) => {
      return new Price(
        price.buyingPrice,
        price.sellingPrice,
        price.code,
        price.dateTime
      );
    });
    priceSJC = pricesList[0].sellingPrice / 375; //Giá Vàng SJC trên 1 gram
    price999 = pricesList[1].sellingPrice / 375; //Giá Vàng SJC trên 1 gram
    arrayPriceUnit.push(priceSJC, price999);

    let products = await apiGetProducts();
    productList = products.data.map((product) => {
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
      );
    });
    for (let i = 0; i < productList.length; i++) {
      product = productList[i]; //Định nghĩa product cho hàm Update lại giá
      productId = productList[i].id; //Định nghĩa productId cho hàm Update lại giá

      if (productList[i].goldPurity === "SJC") {
        productList[i].price = Math.round(
          productList[i].weight * arrayPriceUnit[0]
        );
      } else {
        productList[i].price = Math.round(
          productList[i].weight * arrayPriceUnit[1]
        );
      }
    }
    renderProductsCustomer(productList);
    await apiUpdatePriceProduct(product, productId);
  } catch (error) {
    alert("Lấy dữ liệu sản phẩm thất bại");
  }
}

// async function updatePriceProduct() {
//   debugger;
//   try {
//     let products = await apiGetProducts();
//     productList = products.data.map((product) => {
//       return new Product(
//         product.id,
//         product.name,
//         product.price,
//         product.goldPurity,
//         product.weight,
//         product.size,
//         product.img,
//         product.description,
//         product.quantity,
//         product.codeProduct
//       );
//     });
//     console.log(productList);
//     for (let i = 0; i < productList.length; i++) {
//       product = productList[i];
//       productId = productList[i].id;
//     }
//     await apiUpdatePriceProduct(product, productId);
//   } catch (error) {
//     alert("Cập nhật giá sản phẩm thất bại");
//   }
// }

// =======================API============================

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
    url: URL1,
  });
}

// Push Giá vàng của sản phẩm (sau khi tính toán) của hàng lên lại server của cửa hàng
function apiUpdatePriceProduct(product, productId) {
  return axios({
    method: "PUT",
    url: `${URL1}/${productId}`,
    // url: URL1,
    data: product,
  });
}

// let prices = await fetch(
//   "http://www.mihong.vn/api/v1/gold/prices/current",
//   {
//     method: "GET",
//     withCredentials: true,
//     crossorigin: true,
//     mode: "cors",
//   }
// )
//   .then((response) => {
//     if (!response.ok) {
//       // request API thất bại
//       // throw là từ khoá dùng để ném ra một lỗi, khi gặp từ khoá này ngay lập tức sẽ đi tới callback của catch
//       throw "Lỗi";
//     }

//     return response.json();
//   })
//   .then((data) => {
//     console.log("Fetch:", data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
