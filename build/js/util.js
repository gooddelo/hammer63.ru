const KEYCODE_TAB = 9;
// const INDEX = document.querySelector('#index');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('.page__body');
const main = body.querySelector('main');

// Захват элемента

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

// Скрыть или показать меню

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

// Скрыть или показать overlay

function setOverlayVisible(overlay) {
  body.style.overflow = 'hidden';
  main.style.filter = 'blur(3px)';
  overlay.classList.remove('overlay--hidden');
}

function setOverlayHide(overlay) {
  body.style.overflow = '';
  main.style.filter = '';
  overlay.classList.add('overlay--hidden');
}

// Закрыть что-либо через esc

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {
  isEscEvent,
  setOverlayHide,
  setOverlayVisible,
  showMenu,
  hideMenu,
  trapFocus,
  body,
  overlay,
}
