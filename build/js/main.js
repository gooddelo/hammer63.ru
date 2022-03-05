import { team } from './team.js';
import { openMenu, btnOpenMenu } from './menu.js';
import { showPopup, btnsOpenPopup } from './popup.js';
import { smoothScroll, anchors } from './anchor.js';
import { toggleItem, accordionTitles } from './accordion.js';

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
