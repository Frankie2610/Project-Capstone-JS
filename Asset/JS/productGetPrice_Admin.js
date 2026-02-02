// File Tính giá sản phẩm HL theo khối lượng và Update lại giá lên API

// import { getElement } from "./helpers.js";
import { renderProducts } from "./renderProducts.js";
import { arrayPriceUnit, showPrice } from "./showPriceTable.js";
const URL1 = "https://63f47a4c55677ef68bbcc8ea.mockapi.io/products"; //Product của Hưng Lợi

// const URL2 = "https://www.mihong.vn/api/v1/gold/prices/current"; //Api Mi Hồng

//API Copy giá Vàng MiHong (Giá trong nước và TG)
// const URL3 = "https://6426b4b4556bad2a5b55dbf6.mockapi.io/mihongPrice";

//API Giá vàng Thế giới MiHong
const URL6 = "https://www.mihong.vn/api/v1/gold/prices/world/current";

//API Copy Giá vàng Thế giới MiHong
const URL8 = "https://63f47a4c55677ef68bbcc8ea.mockapi.io/globalGoldPrice";
const URLBE = "https://hung-loi-be.vercel.app/api/gold/sjc"
getGlobalGoldPrice();
getProducts(); //Hiển thị ra list sản phẩm của Hưng Lợi ở trang quản trị

let pricesList = []; //Mảng bản sao của price Mi Hồng
let globalGoldPriceList = []; //Mảng bản sao giá vàng TG
let productList; //Mảng sản phẩm của cửa hàng

let priceDateTimeSJC;
let priceDateTime24k;
let priceDateTime18k;
let priceDateTime16k;
let priceDateTime14k;

let priceDateTime;

let input24k; //input nhập gap24k

window.handleUpdateGapGold = async () => {
  input24k = prompt("gap24k: ");
  await adjustGap24k();
  // await getProducts();
  location.reload() //refresh lại trang web
};

// hàm nhập lại gap24k
window.adjustGap24k = async () => {
  if (input24k) {
    const payload = {
      gap24k: +input24k,
    };
    try {
      const { data } = await apiUpdateGap24k(payload, 1);
    } catch (error) {
      console.log(error);
    }
  }
};

function toNumber(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;

  return Number(
    value
      .toString()
      .replace(/\./g, "")
      .replace(/,/g, "")
  );
}

//Hàm tính toán giá vàng (trên Đơn vị: gram) của từng sản phẩm của cửa tiệm và update lại giá sau khi tính toán lên lại lên API của cửa hàng
async function getProducts() {
  try {
    await showPrice(); // đảm bảo arrayPriceUnit đã có

    const u = 10000; // hệ số làm tròn
    const { data } = await apiGetProducts();
    productList = data;

    for (let i = 0; i < productList.length; i++) {
      const product = productList[i];
      const productId = product.id;

      // Nếu không nhập weight → bỏ qua
      if (!product.weight) continue;

      const weight = toNumber(product.weight);
      const fee = toNumber(product.manufactureFee);

      let unitPrice = 0;
      let priceDateTime = "";

      switch (product.goldPurity) {
        case "SJC":
          unitPrice = toNumber(arrayPriceUnit[1]);
          priceDateTime = priceDateTimeSJC;
          break;

        case "999":
        case "24k-ThầnTài":
          unitPrice = toNumber(arrayPriceUnit[1]);
          priceDateTime = priceDateTime24k;
          break;

        case "750":
          unitPrice = toNumber(arrayPriceUnit[3]);
          priceDateTime = priceDateTime18k;
          break;

        case "680":
          unitPrice = toNumber(arrayPriceUnit[5]);
          priceDateTime = priceDateTime16k;
          break;

        case "610":
          unitPrice = toNumber(arrayPriceUnit[7]);
          priceDateTime = priceDateTime14k;
          break;

        default:
          continue;
      }

      const rawPrice = weight * unitPrice + fee;

      product.price = Math.round(rawPrice) / 10;
      product.priceDateTime = priceDateTime;

      await apiUpdatePriceProduct(product, productId);
    }

    renderProducts(productList);
  } catch (error) {
    console.error(error);
    alert("Lấy dữ liệu sản phẩm thất bại");
  }
}


//Hàm lấy data giá Vàng Thế giới từ API Mi Hồng và copy về API của cửa hàng
// const getGlobalGoldPrice = async () => {
async function getGlobalGoldPrice() {
  try {
    let globalGoldPriceList = (await apiGetGlobalPrice()).data.data;
    //Tạo id
    if (productList) {
      for (i = 0; i < globalGoldPriceList.length; i++) {
        globalGoldPriceList[i] = { ...globalGoldPriceList[i], id: i + 1 };
        let globalPrice = globalGoldPriceList[i];
        await apiUpdateGlobalPrice(globalPrice, globalPriceId);
      }
    }
  } catch (error) {
    alert(error.message);
  }
}

// =======================API============================

//Request lên server lấy Giá Vàng cập nhật hàng ngày (theo đơn vị: chỉ, 1 chỉ = 3.75 gram)
function apiGetPrice() {
  return axios({
    method: "GET",
    url: URLBE,
  });
}

//Request lên server lấy giá vàng thế giới cập nhật hàng ngày
function apiGetGlobalPrice() {
  return axios({
    method: "GET",
    url: URL6,
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

//Copy API Mi Hồng sang Mock API
function apiUpdatePriceMiHong(price, priceId) {
  return axios({
    method: "PUT",
    url: `${URL3}/${priceId}`,
    // url: URL1,
    data: price,
  });
}

//Lấy dữ liệu Giá vàng 24k hàng ngày từ API copy của Mi Hồng về
function apiGetPriceMiHong(price) {
  return axios({
    method: "GET",
    url: URL3,
    data: price,
  });
}

//Copy dữ liệu giá vàng thế giới về API cửa hàng
function apiUpdateGlobalPrice(globalPrice, globalPriceId) {
  return axios({
    method: "PUT",
    url: `${URL8}/${globalPriceId}`,
    data: globalPrice,
  });
}

//Lấy dữ liệu Giá vàng TG từ API copy của Mi Hồng về
function apiGetGlobalGoldPriceMiHong() {
  return axios({
    method: "GET",
    url: URL8,
  });
}
// const apiGetGap24k = async () => {
//   const { data } = await axios.get(URL9);
//   return data;
// };

//Update gap24k
function apiUpdateGap24k(gapGold, gapGoldId) {
  return axios({
    method: "PUT",
    url: `${URL9}/${gapGoldId}`,
    data: gapGold,
  });
}

export {
  productList,
  getProducts
}