let arrayPriceUnit = []; //Mảng giá Vàng đơn vị Lượng

async function showPrice() {
  try {
    pricesList = (await apiGetPriceMiHong()).data;
    globalGoldPriceList = (await apiGetGlobalGoldPriceMiHong()).data;

    arrayPriceUnit.push(
      pricesList[0].buyingPrice,
      pricesList[0].sellingPrice,
      pricesList[1].buyingPrice,
      pricesList[1].sellingPrice,
      pricesList[5].buyingPrice,
      pricesList[5].sellingPrice,
      pricesList[6].buyingPrice,
      pricesList[6].sellingPrice,
      pricesList[7].buyingPrice,
      pricesList[7].sellingPrice
    );

    //DOM Giá vàng Thế giới
    getElement("#globalGoldBuyingPrice").innerHTML =
      globalGoldPriceList[0].buyingPrice + "/";
    getElement("#globalGoldSellingPrice").innerHTML =
      globalGoldPriceList[0].sellingPrice;

    //DOM thời gian cập nhật giá vàng
    getElement("#dateTime").innerHTML = pricesList[1].dateTime;

    getElement("#priceBuyingSJC").innerHTML = pricesList[0].buyingPrice.toLocaleString();
    getElement("#priceSellingSJC").innerHTML = pricesList[0].sellingPrice.toLocaleString();
    getElement("#sellChangePercentSJC").innerHTML =
      pricesList[1].sellChangePercent.toFixed(2) + "%";

    getElement("#priceBuying24k").innerHTML = pricesList[1].buyingPrice.toLocaleString();
    getElement("#priceSelling24k").innerHTML = pricesList[1].sellingPrice.toLocaleString();
    getElement("#sellChangePercent24k").innerHTML =
      pricesList[1].sellChangePercent.toFixed(2) + "%";

    getElement("#priceBuying18k").innerHTML = pricesList[5].buyingPrice.toLocaleString();
    getElement("#priceSelling18k").innerHTML = pricesList[5].sellingPrice.toLocaleString();
    getElement("#sellChangePercent18k").innerHTML =
      pricesList[5].sellChangePercent.toFixed(2) + "%";

    getElement("#priceBuying16k").innerHTML = pricesList[6].buyingPrice.toLocaleString();
    getElement("#priceSelling16k").innerHTML = pricesList[6].sellingPrice.toLocaleString();
    getElement("#sellChangePercent16k").innerHTML =
      pricesList[6].sellChangePercent.toFixed(2) + "%";

    getElement("#priceBuying14k").innerHTML = pricesList[7].buyingPrice.toLocaleString();
    getElement("#priceSelling14k").innerHTML = pricesList[7].sellingPrice.toLocaleString();
    getElement("#sellChangePercent14k").innerHTML =
      pricesList[7].sellChangePercent.toFixed(2) + "%";

    if (+pricesList[0].sellChangePercent >= 0) {
      getElement("#sellChangePercentSJC").innerHTML =
        "+" + pricesList[0].sellChangePercent.toFixed(2) + "%";
      getElement("#sellChangePercentSJC").classList.add("text-success");
      getElement("#sellChangePercentSJC").classList.remove("text-danger");
    } else {
      getElement("#sellChangePercentSJC").classList.add("text-danger");
      getElement("#sellChangePercentSJC").classList.remove("text-success");
    }

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
