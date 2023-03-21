import "../pages/index.css";

import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import PopupWithForm from "../components/PopupWithForm";

import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage.js";

import {
  initialCards,
  addNewCardButton,
  addNewCardModal,
  newCardCloseButton,
  addCardFormElement,
  cardTitleInput,
  cardUrlInput,
  profileEditButton,
  profileEditModal,
  profileCloseButton,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  cardListEl,
  previewImageModal,
  previewImageModalCloseButton,
  validationSettings,
  editFormEl,
  addFormEl,
  cardSelector,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo";

const editFormValidator = new FormValidator(validationSettings, editFormEl);
const addFormValidator = new FormValidator(validationSettings, addFormEl);
const editFormPopup = new PopupWithForm("#edit-form", () => {});

const addFormPopup = new PopupWithForm("#add-card-modal");
const imagePopup = new PopupWithImage("#preview-image-modal");
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__info-description",
});

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  cardListEl
);

/*Functions*/

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, cardSelector);
  wrapper.prepend(card.getView());
}

export function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
  document.addEventListener("mousedown", handleOverlay);
}

export function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
  document.removeEventListener("mousedown", handleOverlay);
}

// Validation

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editFormPopup.setEventListeners();
addFormPopup.setEventListeners();
imagePopup.setEventListeners();

//section.renderItems();

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

  addFormValidator.disableButton();

  closePopup(addNewCardModal);
  evt.target.reset();
}

function closeByEscape(e) {
  if (e.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    close(modalOpened);
  }
}

function handleOverlay(e) {
  if (e.target.classList.contains("modal_opened")) {
    close(e.target);
  }
}

/*Event Listeners*/

addNewCardButton.addEventListener("click", () => {
  addFormValidator.disableButton();
  addFormPopup.open();
});

profileEditModal.addEventListener("click", () => {
  openProfileEditForm();
});

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
  openPopup(addNewCardModal);
});

newCardCloseButton.addEventListener("click", () => closePopup(addNewCardModal));

previewImageModalCloseButton.addEventListener("click", () =>
  closePopup(previewImageModal)
);

initialCards.forEach((cardData) => {
  renderCard(cardData, cardListEl);
});

function openProfileEditForm() {
  const profileInfo = userInfo.getUserInfo();
  profileTitleInput.value = profileInfo.name;
  profileDescriptionInput.value = profileInfo.job;
  editFormValidator._toggleButtonState();
  editFormPopup.open();
}
