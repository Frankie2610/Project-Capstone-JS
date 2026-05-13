// File constructor Product và tính giá sản phẩm theo khối lượng
import { renderProductsCustomer } from "./renderProducts.js";

const URL1 = "https://63f47a4c55677ef68bbcc8ea.mockapi.io/products"; //Product của Hưng Lợi
const URL2 = "https://api.mihong.vn/v1/gold-prices?market=domestic"; //Api Mi Hồng
const URL5 = "https://6426b4b4556bad2a5b55dbf6.mockapi.io/feedback";
const URL6 = "https://www.mihong.vn/api/v1/gold/prices/world/current";
let productList;

// =======================API============================

//Request lên server lấy thông tin sản phẩm từ trang quản trị
const apiGetProducts = () => {
  const data = axios.get(URL1);
  return data;
}

//Lấy phản hồi khách hàng
const apiSendInformation = (info) => {
  return axios({
    method: "POST",
    url: URL5,
    data: info,
  });
}
// Lấy dữ liệu sản phẩm từ API cửa tiệm về và render ra.
const getProducts = async () => {
  try {
    // const { data: productList } = await apiGetProducts(); khi này productList là BIẾN CỤC BỘ vì const productList = data
    const { data } = await apiGetProducts();
    productList = data; //Gán lại giá trị sản phẩm cửa hàng vào mảng productList để tái sử dụng; khi này productList là BIẾN TOÀN CỤC
    renderProductsCustomer(productList);
    return productList;
  } catch (error) {
    alert("Lấy dữ liệu sản phẩm thất bại");
    location.reload()
  }
};
getProducts()

export {
  productList,
  getProducts,
  apiGetProducts,
  apiSendInformation
}