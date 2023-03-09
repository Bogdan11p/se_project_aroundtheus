import { openPopup } from "./index.js";

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageZoom = previewImageModal.querySelector(
  ".modal__preview-image"
);
const previewImageFooter = previewImageModal.querySelector(
  ".modal__preview-footer"
);

class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__like-button")
      .addEventListener("click", () => this._handleLikeIcon());
    this._element
      .querySelector(".cards__remove-button")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => this._handlePreviewPicture());
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".cards__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handlePreviewPicture() {
    previewImageZoom.src = this._link;
    previewImageFooter.textContent = this._name;
    previewImageZoom.alt = this._name;
    openPopup(previewImageModal);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(".cards__image").src = this._link;
    this._element.querySelector(".cards__name").textContent = this._name;
    this._element.querySelector(".cards__image").alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
