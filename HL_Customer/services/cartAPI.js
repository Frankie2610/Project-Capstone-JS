//Mảng trong giỏ hàng Cart
const URL4 = "https://63e8641bcbdc565873852dbf.mockapi.io/api/productInCart";

function apiGetProductsCart(productCart) {
  return axios({
    method: "GET",
    url: URL4,
    data: productCart,
  });
}

function apiCreateProductCart(productChoose) {
  return axios({
    method: "POST",
    url: URL4,
    data: productChoose,
  });
}

function apiDeleteProductCart(productCartId) {
  return axios({
    method: "DELETE",
    url: `${URL4}/${productCartId}`,
  });
}

function apiGetProductById(productId) {
  return axios({
    method: "GET",
    url: `${URL4}/${productId}`,
  });
}

function apiUpdateProductCart(productCartId, productCart) {
  return axios({
    method: "PUT",
    url: `${URL4}/${productCartId}`,
    data: productCart,
  });
}
