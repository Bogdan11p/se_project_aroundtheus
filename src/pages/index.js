import "../pages/index.css";

import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import PopupWithForm from "../components/PopupWithForm";

import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage.js";

import {
  initialCards,
  addNewCardButton,
  cardTitleInput,
  cardUrlInput,
  profileEditButton,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  cardListEl,
  validationSettings,
  editFormEl,
  addFormEl,
  cardSelector,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo";

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
    items: initialCards,
    renderer: renderCard,
  },
  cardListEl
);

section.renderItems();

/*Functions*/

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

// AddCardModal

addNewCardButton.addEventListener("click", () => {
  addFormValidator.disableButton();
  addFormPopup.open();
});

// new functions

function submitEditProfile(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.title,
    job: inputValues.profileDescription,
  });
}

function submitAddCard(inputValues) {
  renderCard(inputValues);
}
