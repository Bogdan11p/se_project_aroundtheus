const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*Elements*/
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#add-card-modal");
const newCardCloseButton = document.querySelector("#add-close-button");
const addCardFormElement = addNewCardModal.querySelector(".modal__form");
const cardTitleInput = addCardFormElement.querySelector(".form__input-title");
const cardUrlInput = addCardFormElement.querySelector(".form__input-url");
const newCardAddSaveButton =
  addCardFormElement.querySelector("#card-save-button");
const addNewCardForm = addNewCardModal.querySelector(".modal__form");

const addNewCardSubmitButton =
  addNewCardForm.querySelector(".form__save-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector("#profile-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__info-description");
const profileTitleInput = document.querySelector(".form__input-name");
const profileDescriptionInput = document.querySelector(
  ".form__input-description"
);

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageZoom = document.querySelector(".modal__preview-image");
const previewImageFooter = document.querySelector(".modal__preview-footer");
const previewImageModalCloseButton = document.querySelector(
  "#preview-close-button"
);
const submitButton = document.querySelector("#card-save-button");
/*Functions*/

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
  document.addEventListener("mousedown", handleOverlay);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
  document.removeEventListener("mousedown", handleOverlay);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__name");
  const likeButton = cardElement.querySelector(".cards__like-button");
  const deleteButton = cardElement.querySelector(".cards__remove-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openPopup(previewImageModal);
    previewImageZoom.src = cardData.link;
    previewImageFooter.textContent = cardData.name;
    previewImageZoom.alt = cardData.name;
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

/*Event Handlers*/

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  cardTitleInput.value = "";
  cardUrlInput.value = "";
  closePopup(addNewCardModal);
}

function closeByEscape(e) {
  if (e.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closePopup(modalOpened);
  }
}

function handleOverlay(e) {
  if (e.target.classList.contains("modal_opened")) {
    closePopup(e.target);
  }
}

/*Event Listeners*/

profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleNewCardSubmit);

// AddCardModal
addNewCardButton.addEventListener("click", () => {
  const addNewCardInputs = addNewCardForm.querySelectorAll(".form__input");
  toggleButtonState(addNewCardInputs, addNewCardSubmitButton, config);

  openPopup(addNewCardModal);
});

addNewCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const link = e.target.link.value;
  const cardView = getCardElement(name, link);
  renderCard(cardView, cardListEl);
  closePopup(addNewCardModal);
  addNewCardForm.reset();
});

newCardCloseButton.addEventListener("click", () => closePopup(addNewCardModal));

previewImageModalCloseButton.addEventListener("click", () =>
  closePopup(previewImageModal)
);

initialCards.forEach((cardData) => {
  const cardView = getCardElement(cardData);
  renderCard(cardData, cardListEl);
});

console.log(addNewCardInputs);
