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
    const normalize = (str) =>
      str
        .toLowerCase()
        .normalize("NFC")
        .replace(/\s+/g, " ")
        .trim();

    const findGold = (keyword) =>
      items.find((i) =>
        normalize(i.TypeName).includes(normalize(keyword)) &&
        normalize(i.BranchName) === "hồ chí minh"
      );

    const SJC = findGold("Vàng SJC 1L");
    const gold24k = findGold("Nữ trang 99,99%");
    const gold18k = findGold("75%");
    const gold16k = findGold("68%");
    const gold14k = findGold("61%");

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
      return `${(value).toLocaleString("en-US")},000`;
    }
    priceSJC = formatWithThousand(SJC.Sell);
    priceSJCBuying = formatWithThousand(SJC.Buy);

    price999 = formatWithThousand(gold24k.Sell);
    price999Buying = formatWithThousand(gold24k.Buy);

    price18k = formatWithThousand(gold18k.Sell);
    price18kBuying = formatWithThousand(gold18k.Buy);

    price16k = formatWithThousand(gold16k.Sell);
    price16kBuying = formatWithThousand(gold16k.Buy);

    price14k = formatWithThousand(gold14k.Sell);
    price14kBuying = formatWithThousand(gold14k.Buy);

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

    ["SJC", "24k", "18k", "16k", "14k"].forEach(k => {
      const el = getElement(`#sellChangePercent${k}`);
      el.innerHTML = "0.00%";
      el.classList.add("text-success");
    });

    getElement("#dateTime").innerHTML = data.updatedAt;

  } catch (error) {
    console.error(error);
    alert("Lỗi khi lấy dữ liệu giá vàng");
  }
}


export {
  showPrice,
  arrayPriceUnit
};
