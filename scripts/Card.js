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

  _handleLikeIcon() {}

  _handleDeleteCard() {}

  _handlePreviewPicture() {}

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(
      ".cards__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".cards__name").textContent = this._name;
    this._setEventListeners();
  }
}

export default Card;
