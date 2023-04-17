export default class Card {
  constructor(
    data,
    userId,
    cardSelector,
    handleImageClick,

    handleLikeIcon,
    handleDeleteCard
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._handleLikeIcon = handleLikeIcon;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._cardSelector = cardSelector;
    this._id = data._id;
    this._likes = data.likes;

    this._userId = userId;
    this._userCardOwnerId = data["owner"]._id;
  }

  setCardEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon(this._id);
    });

    this._deleteButton.addEventListener("click", () => {
      console.log("hey");
      this._handleDeleteCard(this._id);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  /* _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  } */

  deleteCard() {
    this._cardEl.remove();
    this._cardEl = null;
  }

  updateLikes(likes) {
    this._likes = likes;
    this.renderLikes();
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

  generateCard() {
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
    this.setCardEventListeners();
    return this._cardEl;
  }
}
