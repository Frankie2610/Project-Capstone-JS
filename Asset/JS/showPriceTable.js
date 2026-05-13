import { getElement } from "./helpers.js";

const URLBE = "https://hung-loi-be.vercel.app/api/gold/sjc";

let priceSJC, priceSJCBuying;
let price999, price999Buying;
let price18k, price18kBuying;
let price16k, price16kBuying;
let price14k, price14kBuying;

let arrayPriceUnit = [];

async function showPrice() {
  try {
    const res = await fetch(URLBE);
    const data = await res.json();
    const items = data.items || [];
    // const normalize = (str) =>
    //   str
    //     // .toLowerCase()
    //     // .normalize("NFC")
    //     .replace(/\s+/g, " ")
    //     .trim();

    const findGold = (keyword) =>
      items.find((i) =>
        i.code?.includes(keyword)
      );

    const SJC = findGold("SJC");
    console.log(SJC);

    const gold24k = findGold("999");
    const gold18k = findGold("750");
    const gold16k = findGold("680");
    const gold14k = findGold("610");

    if (!SJC || !gold24k || !gold18k || !gold16k || !gold14k) {
      console.error("Thiếu dữ liệu vàng:", {
        SJC,
        gold24k,
        gold18k,
        gold16k,
        gold14k
      });
      alert("API thiếu dữ liệu một số loại vàng");
      return;
    }

    // ===== Giá =====
    function formatWithThousand(value) {
      return `${(value).toLocaleString("en-US")}`;
    }
    priceSJC = formatWithThousand(SJC.sellingPrice * 10);
    priceSJCBuying = formatWithThousand(SJC.buyingPrice * 10);

    price999 = formatWithThousand(gold24k.sellingPrice * 10);
    price999Buying = formatWithThousand(gold24k.buyingPrice * 10);

    price18k = formatWithThousand(gold18k.sellingPrice * 10);
    price18kBuying = formatWithThousand(gold18k.buyingPrice * 10);

    price16k = formatWithThousand(gold16k.sellingPrice * 10);
    price16kBuying = formatWithThousand(gold16k.buyingPrice * 10);

    price14k = formatWithThousand(gold14k.sellingPrice * 10);
    price14kBuying = formatWithThousand(gold14k.buyingPrice * 10);

    function normalizeMoney(value) {
      if (typeof value === "number") return value;

      if (!value) return 0;

      return Number(
        value
          .toString()
          .replace(/\./g, "") // xoá dấu . ngăn nghìn
          .replace(/,/g, "")  // xoá dấu ,
      );
    }

    arrayPriceUnit = [
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
    ].map(normalizeMoney);

    // ===== DOM =====
    getElement("#priceBuyingSJC").innerHTML =
      priceSJCBuying.toLocaleString();
    getElement("#priceSellingSJC").innerHTML =
      priceSJC.toLocaleString();

    getElement("#priceBuying24k").innerHTML =
      price999Buying.toLocaleString();
    getElement("#priceSelling24k").innerHTML =
      price999.toLocaleString();

    getElement("#priceBuying18k").innerHTML =
      price18kBuying.toLocaleString();
    getElement("#priceSelling18k").innerHTML =
      price18k.toLocaleString();

    getElement("#priceBuying16k").innerHTML =
      price16kBuying.toLocaleString();
    getElement("#priceSelling16k").innerHTML =
      price16k.toLocaleString();

    getElement("#priceBuying14k").innerHTML =
      price14kBuying.toLocaleString();
    getElement("#priceSelling14k").innerHTML =
      price14k.toLocaleString();

    const goldMap = {
      SJC,
      "24k": gold24k,
      "18k": gold18k,
      "16k": gold16k,
      "14k": gold14k
    };

    ["SJC", "24k", "18k", "16k", "14k"].forEach(key => {
      const el = getElement(`#sellChangePercent${key}`);
      const item = goldMap[key];

      if (!el || !item) return;

      const value = Number(item?.sellChangePercent ?? 0);

      el.innerHTML = `${value} %`;

      // reset class trước để tránh bị cộng dồn
      el.classList.remove("text-success", "text-danger");

      if (value < 0) {
        el.classList.add("text-danger");
      } else {
        el.classList.add("text-success");
      }
    });

    getElement("#dateTime").innerHTML = gold24k.dateTime;

  } catch (error) {
    console.error(error);
    alert("Lỗi khi lấy dữ liệu giá vàng");
  }
}


export {
  showPrice,
  arrayPriceUnit
};
