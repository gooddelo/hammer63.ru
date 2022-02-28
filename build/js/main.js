import { team } from "./team.js";

const KEYCODE_TAB = 9;

function trapFocus(element) {
  let focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  let firstFocusableEl = focusableEls[0];
  let lastFocusableEl = focusableEls[focusableEls.length - 1];

  element.addEventListener('keydown', function(e) {
    let isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

    if (!isTabPressed) {
      return;
    }

    if ( e.shiftKey ) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
          e.preventDefault();
        }
      } else /* tab */ {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
          e.preventDefault();
        }
      }
  });
}

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

function setOverlayVisible(overlay) {
  body.style.overflow = 'hidden';
  overlay.classList.remove('overlay--hidden');
}

function setOverlayHide(overlay) {
  body.style.overflow = '';
  overlay.classList.add('overlay--hidden');
}

function smoothScroll(hash) {
  const scrollTo = window.pageYOffset;
  const padding = document.querySelector(hash).getBoundingClientRect().top;
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
}

const anchors = document.querySelectorAll('a[href*="#"]');
const SPEED = 0.7;

for (let i = 0; i < anchors.length; i++) {

  anchors[i].addEventListener('click', function(evt) {

    if (window.location.pathname == '/' + this.pathname.split('/').reverse()[0]) {
      evt.preventDefault();
    } else {
      return;
    }

    const hash = this.href.replace(/[^#]*(.*)/, '$1');
    smoothScroll(hash);
  }, false);
}

// Popup

const modalTemplate = document.querySelector('#modal-template');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('.page__body');
const btnOpenPopup = document.querySelectorAll('#buttonPopup');

const closePopup = (popup) => {
  popup.remove();
  setOverlayHide(overlay);
}

const showPopupTemplate = (template, data) => {
  const btnClose = template.querySelector('.button--close');

  body.insertAdjacentElement('beforeend', template);
  setOverlayVisible(overlay);
  trapFocus(template);

  btnClose.addEventListener('click', () => closePopup(template), {once: true});
  overlay.addEventListener('click', () => closePopup(template), {once: true});

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closePopup(template);
    }
  }, {once: true});

  if (data) {
    template.querySelector(".our-team__content").querySelector("h2").textContent = data.name;
    template.querySelector("img").src = data.img;
    template.querySelector(".our-team__content").innerHTML += data.text;
  }
};

function showPopup(id, data) {
  if (!data) {
    showPopupTemplate(modalTemplate.content.querySelector('#' + id).cloneNode(true));
  } else {
    showPopupTemplate(modalTemplate.content.querySelector('#' + id).cloneNode(true), data);
  }
}

for (let btn of btnOpenPopup) {
  btn.addEventListener('click', () => {
    showPopup(btn.dataset.popupid, team[btn.dataset.persona])
  });
}

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
