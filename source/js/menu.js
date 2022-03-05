import { setOverlayHide, setOverlayVisible, body, overlay } from "./util.js";

// Menu

const btnOpenMenu = body.querySelector('.button--burger');
const headerMenu = body.querySelector('.header__nav');
const menuItems = headerMenu.querySelectorAll('.header__nav-item');

function showMenu(btn, menu) {
  btn.classList.remove('button--burger');
  btn.classList.add('button--close');
  menu.classList.add('header__nav--show');
  setOverlayVisible(overlay);
}

function hideMenu(btn, menu) {
  btn.classList.add('button--burger');
  btn.classList.remove('button--close');
  menu.classList.remove('header__nav--show');
  setOverlayHide(overlay);
}

for (let menuItem of menuItems) {
  menuItem.addEventListener('click', () => hideMenu(btnOpenMenu, headerMenu)); // Закрываем меню по клику на элементы
}


function openMenu() {
  if (btnOpenMenu.classList.contains('button--burger')) {
    showMenu(btnOpenMenu, headerMenu);
  } else {
    hideMenu(btnOpenMenu, headerMenu);
  }
}

export { openMenu, btnOpenMenu };
