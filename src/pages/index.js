import "../pages/index.css";

import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import PopupWithForm from "../components/PopupWithForm";
import Api from "../utils/Api.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage.js";

import {
  cardData,
  addNewCardButton,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  cardListEl,
  validationSettings,
  editFormEl,
  addFormEl,
  confirmFormEl,
  cardSelector,
  deleteCardButton,
  avatarButton,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const editFormValidator = new FormValidator(validationSettings, editFormEl);
const addFormValidator = new FormValidator(validationSettings, addFormEl);
const editFormPopup = new PopupWithForm(
  "#profile-edit-modal",
  submitEditProfile
);

const addFormPopup = new PopupWithForm("#add-card-modal", submitAddCard);
const imagePopup = new PopupWithImage("#preview-image-modal");
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__info-description",
});

const section = new Section(
  {
    items: cardData,
    renderer: renderCard,
  },
  cardListEl
);

section.renderItems();

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "77fade9c-13b8-4e2e-91f7-b3fcc3cb9570",
    "Content-Type": "application/json",
  },
});

const deleteCardPopup = new PopupWithConfirmation(confirmFormEl);

api.getInitialCards().then((res) => {
  console.log(res);
});

deleteCardPopup.setEventListeners();

/*Functions*/

function renderCard(cardData) {
  const card = new Card(
    {
      cardData,
      handleImageClick: (cardData) => {
        const image = {
          name: cardData.name,
          link: cardData.src,
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

/*Event Listeners*/

profileEditButton.addEventListener("click", () => {
  editFormPopup.open();
  /* profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent; */
  const { job, name } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
});

// Confirm Modal

deleteCardButton.addEventListener("click", () => {
  deleteCardPopup.open();
});

// AddCardModal

addNewCardButton.addEventListener("click", () => {
  addFormValidator.disableButton();
  addFormPopup.open();
});

// new functions

function submitEditProfile(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.title,
    job: inputValues.description,
  });
}

function submitAddCard(inputValues) {
  renderCard(inputValues);
}
