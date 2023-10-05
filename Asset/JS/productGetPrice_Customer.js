// File constructor Product và tính giá sản phẩm theo khối lượng

const URL1 = "https://63f47a4c55677ef68bbcc8ea.mockapi.io/products"; //Product của Hưng Lợi
const URL2 = "https://www.mihong.vn/api/v1/gold/prices/current"; //Api Mi Hồng
URL3 = "https://6426b4b4556bad2a5b55dbf6.mockapi.io/mihongPrice"; //MockApi copy Mihong
URL4 = "https://63e8641bcbdc565873852dbf.mockapi.io/api/productInCart"; //MockApi giỏ hàng
const URL5 = "https://6426b4b4556bad2a5b55dbf6.mockapi.io/feedback";
const URL6 = "https://www.mihong.vn/api/v1/gold/prices/world/current";
const URL7 = "https://6426b4b4556bad2a5b55dbf6.mockapi.io/feedback";

// Lấy dữ liệu sản phẩm từ API cửa tiệm về và render ra.
const getProducts = async () => {
  // debugger;
  try {
    const { data: productList } = await apiGetProducts();
    renderProductsCustomer(productList);
    return productList;
  } catch (error) {
    alert("Lấy dữ liệu sản phẩm thất bại");
    return null;
  }
};
let productList = getProducts(); //Mảng sản phẩm của cửa hàng;

// =======================API============================

//Request lên server lấy Giá Vàng cập nhật hàng ngày (theo đơn vị: chỉ, 1 chỉ = 3.755 gram)
function apiGetPrice() {
  return axios({
    method: "GET",
    url: URL2,
  });
}

//Request lên server lấy thông tin sản phẩm từ trang quản trị
function apiGetProducts() {
  const data = axios.get(URL1);
  return data;
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

//Lấy dữ liệu từ API copy Mi Hồng về
function apiGetPriceMiHong() {
  return axios({
    method: "GET",
    url: URL3,
  });
}

//Lấy phản hồi khách hàng
function apiSendInformation(info) {
  return axios({
    method: "POST",
    url: URL5,
    data: info,
  });
}
