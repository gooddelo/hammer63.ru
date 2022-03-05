import { setOverlayHide, setOverlayVisible, trapFocus, body, overlay } from './util.js';

// Popup

const modalTemplate = document.querySelector('#modal-template');
const btnsOpenPopup = document.querySelectorAll('[name=buttonPopup]');

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
    template.querySelector('.our-team__content').querySelector('h2').textContent = data.name;
    template.querySelector('img').src = data.img;
    template.querySelector('.our-team__content').innerHTML += data.text;
  }
};

function showPopup(id, data) {
  if (!data) {
    showPopupTemplate(modalTemplate.content.querySelector('#' + id).cloneNode(true));
  } else {
    showPopupTemplate(modalTemplate.content.querySelector('#' + id).cloneNode(true), data);
  }
}

export { showPopup, btnsOpenPopup }
