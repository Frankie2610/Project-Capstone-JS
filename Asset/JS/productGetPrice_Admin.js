// File Tính giá sản phẩm HL theo khối lượng và Update lại giá lên API

//API Copy giá Vàng MiHong (Giá trong nước và TG)
const URL3 = "https://6426b4b4556bad2a5b55dbf6.mockapi.io/mihongPrice";

//API Giá vàng Thế giới MiHong
const URL6 = "https://www.mihong.vn/api/v1/gold/prices/world/current";

//API Copy Giá vàng Thế giới MiHong
const URL8 = "https://63f47a4c55677ef68bbcc8ea.mockapi.io/globalGoldPrice";
getGlobalGoldPrice();
getProducts(); //Hiển thị ra list sản phẩm của Hưng Lợi ở trang quản trị

let pricesList = []; //Mảng bản sao của price Mi Hồng
let globalGoldPriceList = []; //Mảng bản sao giá vàng TG
let productList = []; //Mảng sản phẩm của cửa hàng

let priceDateTimeSJC;
let priceDateTime24k;
let priceDateTime18k;
let priceDateTime16k;
let priceDateTime14k;

let priceDateTime;
// let arrayPriceUnit = []; //Mảng giá Vàng đơn vị Lượng
//Hàm tính toán giá vàng (trên Đơn vị: gram) của từng sản phẩm của cửa tiệm và update lại giá sau khi tính toán lên lại lên API của cửa hàng
async function getProducts() {
  try {
    pricesList = (await apiGetPrice()).data.data;
    //Tạo các đối tượng constructor để thêm thuộc tính ID, vì các obj của Mi Hồng ko có thuộc tính ID
    // pricesList = prices.map((price) => {
    //   return new Price(
    //     price.buyingPrice,
    //     price.sellingPrice,
    //     price.code,
    //     price.sellChange,
    //     price.sellChangePercent,
    //     price.buyChange,
    //     price.buyChangePercent,
    //     price.dateTime,
    //     price.id
    //   );
    // });

    //Tạo ID cho API của tiệm vì API Mi Hồng không có ID
    for (i = 0; i < pricesList.length; i++) {
      pricesList[i] = { ...pricesList[i], id: i + 1 };
      let price = pricesList[i];
      let priceId = pricesList[i].id;
      await apiUpdatePriceMiHong(price, priceId);
    }

    //Lấy thời gian cập nhật theo tuổi Vàng
    priceDateTimeSJC = pricesList[0].dateTime;
    priceDateTime24k = pricesList[1].dateTime;
    priceDateTime18k = pricesList[5].dateTime;
    priceDateTime16k = pricesList[6].dateTime;
    priceDateTime14k = pricesList[7].dateTime;

    await showPrice();
    const u = 10000; //Hệ số làm tròn giá sản phẩm cửa hàng
    productList = (await apiGetProducts()).data;
    for (let i = 0; i < productList.length; i++) {
      product = productList[i]; //Định nghĩa product cho hàm Update lại giá
      productId = productList[i].id; //Định nghĩa productId cho hàm Update lại giá

      // TH1: Nếu weight = 0, nghĩa là chọn nhập giá tiền bằng tay
      if (!productList[i].weight) {
        console.log(productList[i].weight);
      } //TH2: Nếu weight = true, nghĩa là chọn nhập cân nặng để chương trình tự tính toán giá tiền
      else {
        if (productList[i].goldPurity === "SJC") {
          productList[i].price =
            Math.round(
              (productList[i].weight * arrayPriceUnit[1] +
                productList[i].manufactureFee) /
                u
            ) * u;
          puoductList[i].priceDateTime = priceDateTimeSJC;
        } else if (
          productList[i].goldPurity === "999" ||
          productList[i].goldPurity === "24k-ThầnTài"
        ) {
          productList[i].price =
            Math.round(
              (productList[i].weight * arrayPriceUnit[3] +
                productList[i].manufactureFee) /
                u
            ) * u;
          productList[i].priceDateTime = priceDateTime24k;
        } else if (productList[i].goldPurity === "750") {
          productList[i].price =
            Math.round(
              (productList[i].weight * arrayPriceUnit[5] +
                productList[i].manufactureFee) /
                u
            ) * u;
          productList[i].priceDateTime = priceDateTime18k;
        } else if (productList[i].goldPurity === "680") {
          productList[i].price =
            Math.round(
              (productList[i].weight * arrayPriceUnit[7] +
                productList[i].manufactureFee) /
                u
            ) * u;
          productList[i].priceDateTime = priceDateTime16k;
        } else if (productList[i].goldPurity === "610") {
          productList[i].price =
            Math.round(
              (productList[i].weight * arrayPriceUnit[9] +
                productList[i].manufactureFee) /
                u
            ) * u;
          productList[i].priceDateTime = priceDateTime14k;
        }
        await apiUpdatePriceProduct(product, productId);
      }
    }
    renderProducts(productList);
  } catch (error) {
    alert("Lấy dữ liệu sản phẩm thất bại");
  }
}

//Hàm lấy data giá Vàng Thế giới từ API Mi Hồng và copy về API của cửa hàng
// const getGlobalGoldPrice = async () => {
async function getGlobalGoldPrice() {
  try {
    let globalGoldPriceList = (await apiGetGlobalPrice()).data.data;
    // globalGoldPriceList = globalGoldPriceList.map((price) => {
    //   return new GlobalGoldPrice(
    //     price.buyingPrice,
    //     price.sellingPrice,
    //     price.buyChange,
    //     price.sellChange,
    //     price.code,
    //     price.name,
    //     price.importNumber,
    //     price.dateTime,
    //     price.changed,
    //     price.id
    //   );
    // });

    //Tạo id
    for (i = 0; i < globalGoldPriceList.length; i++) {
      globalGoldPriceList[i] = { ...globalGoldPriceList[i], id: i + 1 };
      let globalPrice = globalGoldPriceList[i];
      let globalPriceId = globalGoldPriceList[i].id;
      await apiUpdateGlobalPrice(globalPrice, globalPriceId);
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
    url: URL2,
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
