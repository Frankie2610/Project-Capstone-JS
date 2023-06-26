//Function sort mảng Sản phẩm từ Cao-Thấp hay Thấp-Cao
function sortPrice() {
  debugger;
  let valueSort = +getElement("#sortPrice").value;
  let sortPriceArray = []; //Mảng sắp xếp Giá Cao-Thấp hoặc Thấp-Cao
  if (valueSort === 1) {
    sortPriceArray = sortJSON(productList, "price", true);
  } else if (valueSort === 2) {
    sortPriceArray = sortJSON(productList, "price", false);
  } else {
    return;
  }
  renderProducts(sortPriceArray);
}

function sortJSON(productList, price, asc) {
  return productList.sort((a, b) => {
    let x = a[price];
    let y = b[price];
    if (asc) {
      return x < y ? -1 : x > y ? 1 : 0;
    } else {
      return x > y ? -1 : x < y ? 1 : 0;
    }
  });
}
