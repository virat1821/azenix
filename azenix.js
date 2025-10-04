var swiper = new Swiper(".testimonial-wrapper", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 30,
  loop: true,
  speed: 1300,
  autoplay: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      slidesPerGroup: 3
    },
    480: {
      slidesPerView: 2,
      slidesPerGroup: 1
    }
  }
});
