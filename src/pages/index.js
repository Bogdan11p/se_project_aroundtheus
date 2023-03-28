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
  modalPictureFooter,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo";

const editFormValidator = new FormValidator(validationSettings, editFormEl);
const addFormValidator = new FormValidator(validationSettings, addFormEl);
const editFormPopup = new PopupWithForm(
  "#profile-edit-modal",
  submitEditProfile
);

const addFormPopup = new PopupWithForm("#add-card-modal", submitAddCard);
const imagePopup = new PopupWithImage("#preview-image-modal", imageClick);
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

section.renderItems();

/*Functions*/

function imageClick() {
  previewImageModal.src = initialCards.link;
  modalPictureFooter.textContent = initialCards.name;
  previewImageZoom.alt = initialCards.name;
  /* imagePopup.open(); */
}

function renderCard(initialCards) {
  const card = new Card(
    {
      initialCards,
      imageClick: (initialCards) => {
        const image = {
          name: initialCards.name,
          link: initialCards.src,
        };
        imagePopup.open(image.name, image.link);
      },
    },
    cardSelector
  ).renderCard();

  section.addItem(card);
}

// Validation

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editFormPopup.setEventListeners();
addFormPopup.setEventListeners();
imagePopup.setEventListeners();

/*Event Handlers*/

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  editFormPopup.close();
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  addFormValidator.disableButton();
  addFormPopup.close();
  evt.target.reset();
}

/*Event Listeners*/

profileEditButton.addEventListener("click", () => {
  editFormPopup.open();
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileCloseButton.addEventListener("click", () => editFormPopup.close());

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// AddCardModal

addNewCardButton.addEventListener("click", () => {
  addFormValidator.disableButton();
  addFormPopup.open();
});

newCardCloseButton.addEventListener("click", () => addFormPopup.close());

previewImageModal.addEventListener("click", () => imagePopup.open());
previewImageModalCloseButton.addEventListener("click", () =>
  imagePopup.close()
);

addCardFormElement.addEventListener("submit", handleNewCardSubmit);

// new functions

function openProfileEditForm() {
  const profileInfo = userInfo.getUserInfo();
  profileTitleInput.value = profileInfo.name;
  profileDescriptionInput.value = profileInfo.job;
  editFormValidator.disableButton();
  editFormPopup.open();
}

function submitEditProfile(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.title,
    job: inputValues.profileDescription,
  });
}

function submitAddCard(inputValues) {
  renderCard({ name: inputValues.place, link: inputValues.url });
}