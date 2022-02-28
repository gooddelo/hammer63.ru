const accordion = document.querySelector('.accordion');
const accordionTitles = accordion.querySelectorAll('.schedule__title');

const hideList = (item, className) => {
  item.classList.remove(className);
}

const showList = (item, className) => {
  item.classList.add(className);
}

for (let i = 0; i < accordionTitles.length; i++) {
  accordionTitles[i].addEventListener('click', toggleItem, false);
}

function toggleItem() {

  if (!this.classList.contains('schedule__title--show')) {
    showList(this, 'schedule__title--show');
  } else {
    hideList(this, 'schedule__title--show');
  }
}
