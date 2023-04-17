import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imagePopup = document.querySelector("#preview-image-modal");
    this._imageCaption = document.querySelector(".modal__preview-footer");
  }

  open(name, link) {
    this._imageCaption.textContent = name;
    this._imagePopup.src = link;
    this._imagePopup.alt = name;
    super.open();
  }
}
