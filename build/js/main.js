'use strict';
(function () {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 31,
    // loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
})();
