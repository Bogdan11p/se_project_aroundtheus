import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imagePopup = document.querySelector("#preview-image-modal");
    this._imageCaption = document.querySelector(".modal__preview-footer");
    this._previewImage = document.querySelector(".modal__preview-image");
  }

  open(name, link) {
    this._imageCaption.textContent = name;
    this._previewImage.src = link;
    this._previewImage.alt = name;
    super.open();
  }
}
