export default class Card {
  constructor(
    { cardData, handleImageClick },
    cardSelector,
    userId,
    handleDeleteCard,
    handleLikeIcon,
    loadingLikeCheck
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
    this._id = cardData._id;
    this._likes = cardData.likes;
    /* this._handleDeleteCard = handleDeleteCard;
    this._handleLikeIcon = handleLikeIcon; */
    this._loadingLikeCheck = loadingLikeCheck;
    this._userId = userId;
    this._userCardOwnerId = cardData["owner"].cardData._id;
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__like-button")
      .addEventListener("click", () => this._handleLikeIcon(this._id));
    this._element
      .querySelector(".cards__remove-button")
      .addEventListener("click", () => this._handleDeleteCard(this._id));

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

  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  renderLikes() {
    this._cardLikes.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _getTemplate() {
    const cardEl = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);
    return cardEl;
  }

  renderCard() {
    this._cardEl = this._getTemplate();
    this._cardImage = this._cardEl.querySelector(".cards__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardEl.querySelector(".cards__name").textContent = this._name;
    this._likeButton = this._cardEl.querySelector(".cards__like-button");
    this._deleteButton = this._cardEl.querySelector(".cards__remove-button");
    this._previewModal = this._cardEl.querySelector("#preview-image-modal");
    this._cardLikes = this._cardEl.querySelector(".card__likes-counter");
    this.renderLikes();
    if (this._userId != this._userCardOwnerId) {
      this._deleteButton.remove();
    }
    this._setEventListeners();
    return this._cardEl;
  }
}
