// $(".carousel__product").slick({
//   // infinite: tạo vòng lặp
//   infinite: true,
//   // slidesToShow: số items hiển thị
//   slidesToShow: 1,
//   // slidesToScroll: mỗi lần scroll mấy slide?
//   slidesToScroll: 1,
//   // dots dấu chấm tròn
//   dots: true,
//   // autoplay tự động chạy slide
//   autoplay: true,
//   // autoplaySpeed: tốc độ tự động chạy đơn vị ms. 300ms = 0.3s
//   autoplaySpeed: 1500,
//   // arrows: tắt dấu mũi tên hai bên slide
//   // arrows: false,
// });
const showCarousel = () => {
  $(".carousel__product").slick({
    // infinite: tạo vòng lặp
    infinite: true,
    // slidesToShow: số items hiển thị
    slidesToShow: 1,
    // slidesToScroll: mỗi lần scroll mấy slide?
    slidesToScroll: 1,
    // dots dấu chấm tròn
    dots: true,
    // autoplay tự động chạy slide
    autoplay: true,
    // autoplaySpeed: tốc độ tự động chạy đơn vị ms. 300ms = 0.3s
    autoplaySpeed: 1500,
    // arrows: tắt dấu mũi tên hai bên slide
    // arrows: false,
  });
};
showCarousel();
