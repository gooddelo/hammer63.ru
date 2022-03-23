import { team } from './team.js';
import { openMenu, btnOpenMenu } from './menu.js';
import { showPopup, btnsOpenPopup } from './popup.js';
import { smoothScroll, anchors } from './anchor.js';
import { toggleItem, accordionTitles } from './accordion.js';

const headerNavWrap = document.querySelector('.header__nav-wrapper--nojs');
const buttonNoJs = document.querySelector('.button--nojs');
const buttonSlider = document.querySelectorAll('.services__btn--nojs');
const boxSlider = document.querySelector('.services__wrapper--nojs');
const servicesWrap = document.querySelector('.services__schedule--nojs');

headerNavWrap.classList.remove('header__nav-wrapper--nojs');
buttonNoJs.classList.remove('button--nojs');

if (boxSlider && servicesWrap) {
  boxSlider.classList.remove('services__wrapper--nojs');
  servicesWrap.classList.remove('services__schedule--nojs');
}

for (let btnSlider of buttonSlider) {
  btnSlider.classList.remove('services__btn--nojs');
}

// Плавный скролл

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

// Accordion

if (accordionTitles) {
  for (let i = 0; i < accordionTitles.length; i++) {
    accordionTitles[i].classList.remove('schedule__title--nojs');
    accordionTitles[i].addEventListener('click', toggleItem, false);
  }
}

// Menu

btnOpenMenu.addEventListener('click', openMenu);

// Popup

for (let btnOpenPopup of btnsOpenPopup) {
  btnOpenPopup.addEventListener('click', () => {
    showPopup(btnOpenPopup.dataset.popupid, team[btnOpenPopup.dataset.persona])
  });
}
