'use strict';
(function () {

  const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

  function setOverlayVisible(overlay) {
    body.style.overflow = 'hidden';
    overlay.classList.remove('overlay--hidden');
  }

  function setOverlayHide(overlay) {
    body.style.overflow = '';
    overlay.classList.add('overlay--hidden');
  }

  const anchors = document.querySelectorAll('a[href*="#"]');  //выбираем все ссылки к якорю на странице
  const SPEED = 0.7;                                          // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
  for (let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function(evt) {
      evt.preventDefault();
      const scrollTo = window.pageYOffset;                  // производим прокрутку
      const hash = this.href.replace(/[^#]*(.*)/, '$1');    // id элемента, к которому нужно перейти
      const padding = document.querySelector(hash).getBoundingClientRect().top;  // отступ от окна браузера до id
      let start = null;
      requestAnimationFrame(step);
      function step(time) {
        if (start === null) start = time;
        const progress = time - start;
        const distance = (padding < 0 ? Math.max(scrollTo - progress/SPEED, scrollTo + padding) : Math.min(scrollTo + progress/SPEED, scrollTo + padding));
        window.scrollTo(0, distance);
        if (distance != scrollTo + padding) {
          requestAnimationFrame(step)
        } else {
          location.hash = hash;
        }
      }
    }, false);
  }

  // Popup

  const scheduleTemplate = document.querySelector('#schedule-template').content.querySelector('.schedule');
  const btnOpenPopup = document.querySelector('.button--services');
  const overlay = document.querySelector('.overlay');
  const body = document.querySelector('.page__body');

  const closePopup = (popup) => {
    popup.remove();
    setOverlayHide(overlay);
  }

  const showPopupTemplate = (template) => {
    const btnClose = template.querySelector('.button--close');

    body.insertAdjacentElement('beforeend', template);
    setOverlayVisible(overlay);
    // trapFocus(template);

    btnClose.addEventListener('click', () => closePopup(template), {once: true});
    overlay.addEventListener('click', () => closePopup(template), {once: true});

    document.addEventListener('keydown', (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        closePopup(template);
      }
    }, {once: true});
  };

  const showPopup = (evt) => {
    evt.preventDefault();
    showPopupTemplate(scheduleTemplate.cloneNode(true));
  }

  btnOpenPopup.addEventListener('click', showPopup)

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
