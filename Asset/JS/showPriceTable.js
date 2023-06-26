//Hệ số hiệu chỉnh trượt giá Vàng/1 Chỉ (giữa các tiệm)
const gapSJC = 10000; //SJC
const gap24k = 35000; //24k
const gap18k = 122000;
const gap16k = 122000;
const gap14k = 122000;

const portion18k = 0.75; //18k-Bán
const portion16k = 0.68; //16k-Bán
const portion14k = 0.61; //16k-Bán

const gapBuySellSJC = 100000;
const gapBuySell24k = 200000;
const gapBuySell18k = 200000;
const gapBuySell16k = 200000;
const gapBuySell14k = 200000;
const r = 10000;

let priceSJC;
let priceSJCBuying;
let price999;
let price999Buying;
let price18k;
let price18kBuying;

let price16k;
let price16kBuying;

let price14k;
let price14kBuying;
let arrayPriceUnit = []; //Mảng giá Vàng đơn vị Lượng

async function showPrice() {
  try {
    pricesList = (await apiGetPriceMiHong()).data;
    globalGoldPriceList = (await apiGetGlobalGoldPriceMiHong()).data;
    priceSJC = pricesList[0].sellingPrice + gapSJC;
    priceSJCBuying = priceSJC - gapBuySellSJC;

    price999 = Math.ceil((pricesList[1].sellingPrice + gap24k) / r) * r;
    price999Buying = price999 - gapBuySell24k;

    price18k = Math.ceil((price999 * portion18k + gap18k) / r) * r;
    price18kBuying = price18k - gapBuySell18k;

    price16k = Math.ceil((price999 * portion16k + gap16k) / r) * r;
    price16kBuying = price16k - gapBuySell16k;

    price14k = Math.ceil((price999 * portion14k + gap14k) / r) * r;
    price14kBuying = price14k - gapBuySell14k;

    arrayPriceUnit.push(
      priceSJCBuying,
      priceSJC,
      price999Buying,
      price999,
      price18kBuying,
      price18k,
      price16kBuying,
      price16k,
      price14kBuying,
      price14k
    );

    //DOM Giá vàng Thế giới
    getElement("#globalGoldBuyingPrice").innerHTML =
      globalGoldPriceList[0].buyingPrice + "/";
    getElement("#globalGoldSellingPrice").innerHTML =
      globalGoldPriceList[0].sellingPrice;

    //DOM thời gian cập nhật giá vàng
    getElement("#dateTime").innerHTML = pricesList[1].dateTime;

    getElement("#priceBuying24k").innerHTML = price999Buying.toLocaleString();

    getElement("#priceSelling24k").innerHTML = price999.toLocaleString();
    getElement("#sellChangePercent24k").innerHTML =
      pricesList[1].sellChangePercent.toFixed(2) + "%";

    getElement("#priceBuying18k").innerHTML = price18kBuying.toLocaleString();

    getElement("#priceSelling18k").innerHTML = price18k.toLocaleString();
    getElement("#sellChangePercent18k").innerHTML =
      pricesList[5].sellChangePercent.toFixed(2) + "%";

    getElement("#priceBuying16k").innerHTML = price16kBuying.toLocaleString();
    getElement("#priceSelling16k").innerHTML = price16k.toLocaleString();
    getElement("#sellChangePercent16k").innerHTML =
      pricesList[6].sellChangePercent.toFixed(2) + "%";

    getElement("#priceBuying14k").innerHTML = price14kBuying.toLocaleString();
    getElement("#priceSelling14k").innerHTML = price14k.toLocaleString();
    getElement("#sellChangePercent14k").innerHTML =
      pricesList[7].sellChangePercent.toFixed(2) + "%";

    if (+pricesList[1].sellChangePercent >= 0) {
      getElement("#sellChangePercent24k").innerHTML =
        "+" + pricesList[1].sellChangePercent.toFixed(2) + "%";
      getElement("#sellChangePercent24k").classList.add("text-success");
      getElement("#sellChangePercent24k").classList.remove("text-danger");
    } else {
      getElement("#sellChangePercent24k").classList.add("text-danger");
      getElement("#sellChangePercent24k").classList.remove("text-success");
    }

    if (+pricesList[5].sellChangePercent >= 0) {
      getElement("#sellChangePercent18k").innerHTML =
        "+" + pricesList[5].sellChangePercent.toFixed(2) + "%";
      getElement("#sellChangePercent18k").classList.add("text-success");
      getElement("#sellChangePercent18k").classList.remove("text-danger");
    } else {
      getElement("#sellChangePercent18k").classList.add("text-danger");
      getElement("#sellChangePercent18k").classList.remove("text-success");
    }

    if (+pricesList[6].sellChangePercent >= 0) {
      getElement("#sellChangePercent16k").innerHTML =
        "+" + pricesList[6].sellChangePercent.toFixed(2) + "%";
      getElement("#sellChangePercent16k").classList.add("text-success");
      getElement("#sellChangePercent16k").classList.remove("text-danger");
    } else {
      getElement("#sellChangePercent16k").classList.add("text-danger");
      getElement("#sellChangePercent16k").classList.remove("text-success");
    }

    if (+pricesList[7].sellChangePercent >= 0) {
      getElement("#sellChangePercent14k").innerHTML =
        "+" + pricesList[7].sellChangePercent.toFixed(2) + "%";
      getElement("#sellChangePercent14k").classList.add("text-success");
      getElement("#sellChangePercent14k").classList.remove("text-danger");
    } else {
      getElement("#sellChangePercent14k").classList.add("text-danger");
      getElement("#sellChangePercent14k").classList.remove("text-success");
    }
  } catch (error) {
    alert("Lấy dữ liệu giá API thất bại");
  }
}

// ========== Get Data giá Vàng Thế giới ================
//Lấy dữ liệu Giá vàng TG từ API copy của Mi Hồng về
function apiGetGlobalGoldPriceMiHong() {
  return axios({
    method: "GET",
    url: "https://63f47a4c55677ef68bbcc8ea.mockapi.io/globalGoldPrice",
  });
}
