export default class Card {
  constructor({ cardData, handleImageClick }, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__like-button")
      .addEventListener("click", () => this._handleLikeIcon());
    this._element
      .querySelector(".cards__remove-button")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element.querySelector(".cards__image").addEventListener("click", () =>
      this._handleImageClick({
        name: this._name,
        src: this._link,
      })
    );
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".cards__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);
  }

  renderCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".cards__image").src = this._link;
    this._element.querySelector(".cards__name").textContent = this._name;
    this._element.querySelector(".cards__image").alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}
