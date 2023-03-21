import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(name, link) {
    this._image = this._popupElement.querySelector("#preview-image-modal");
    this._popupElement.querySelector(".modal__preview-footer").textContent =
      name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}
