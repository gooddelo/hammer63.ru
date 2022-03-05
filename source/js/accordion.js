import { showList, hideList } from './util.js';

const accordion = document.querySelector('.accordion');

if (accordion) {
  var accordionTitles = accordion.querySelectorAll('.schedule__title');
}

function toggleItem() {

  if (!this.classList.contains('schedule__title--show')) {
    showList(this, 'schedule__title--show');
  } else {
    hideList(this, 'schedule__title--show');
  }
}

export { toggleItem, accordionTitles }
