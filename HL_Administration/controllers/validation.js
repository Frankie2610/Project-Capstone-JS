let validation = function validate() {
  let isValid = true;

  // kiểm tra tên sản phẩm
  // Tên sản phẩm phải ở dạng ký tự (ko đc ở dạng chữ số không)
  name = getElement("#TenSP").value;
  if (!name.trim()) {
    isValid = false;
    getElement("#tbTenSP").innerHTML = "Tên Sản Phẩm không để trống";
  } else if (!/\d/.test(name)) {
    isValid = false;
    getElement("#tbTenSP").classList.add("d-block");
    getElement("#tbTenSP").innerHTML = "Tên Sản Phẩm không hợp lệ";
  } else {
    getElement("#tbTenSP").innerHTML = "";
  }

  //kiểm tra cân nặng
  // Cân nặng sản phẩm phải ở dạng số (nguyên hay thập phân)
  weight = getElement("#GiaSP").value;
  // if (!weight.trim()) {
  //   isValid = false;
  //   getElement("#tbCanNangSP").innerHTML = "Cân nặng Sản Phẩm không để trống";
  // } else 
  if (!/^\d*(\.\d+)?$/.test(weight)) {
    isValid = false;
    getElement("#tbCanNangSP").classList.add("d-block");
    getElement("#tbCanNangSP").innerHTML = "Cân nặng Sản Phẩm không hợp lệ";
  } else {
    getElement("#tbCanNangSP").innerHTML = "";
  }

  //kiểm tra đường dẫn hình ảnh

  img = getElement("#HinhSP").value;
  if (!img.trim()) {
    isValid = false;
    getElement("#tbLinkSP").innerHTML = "Đường dẫn Sản phẩm không để trống";
  }  else {
    getElement("#tbLinkSP").innerHTML = "";
  }

  //kiểm tra mô tả
  //   Mô tả phải ở dạng ký tự (ko đc ở dạng chữ số không)
  description = getElement("#MoTaSP").value;
  if (!description.trim()) {
    isValid = false;
    getElement("#tbMoTaSP").innerHTML = "Mô tả Sản Phẩm không để trống";
  } else if (/\d/.test(description)) {
    isValid = false;
    getElement("#tbMoTaSP").classList.add("d-block");
    getElement("#tbMoTaSP").innerHTML = "Mô tả Sản Phẩm không hợp lệ";
  } else {
    getElement("#tbMoTaSP").innerHTML = "";
  }

  //kiểm tra Mã sản phẩm (Phải định dạng số)
  // Mã sản phẩm phải ở dạng số
  codeProduct = getElement("#maSP").value;
  if (!codeProduct.trim()) {
    isValid = false;
    getElement("#tbMaSP").innerHTML = "Mã Sản Phẩm không để trống";
  } else if (!/([0-9])\w+/test(codeProduct)) {
    isValid = false;
    getElement("#tbMaSP").classList.add("d-block");
    getElement("#tbMaSP").innerHTML = "Mã Sản Phẩm không hợp lệ";
  } else {
    getElement("#tbMaSP").innerHTML = "";
  }
  return isValid;
}
