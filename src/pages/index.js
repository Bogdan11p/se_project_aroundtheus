// Import pages

import "../pages/index.css";

import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../utils/Api.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage.js";

import {
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
  avatarEditModal,
  profileAvatar,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// Import pages

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "77fade9c-13b8-4e2e-91f7-b3fcc3cb9570",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  userName: profileTitleInput,
  userJob: profileDescriptionInput,
  userAvatar: profileAvatar,
});

function createCard(cardData) {
  const card = new Card(
    cardData,
    userId,
    "#card-template",

    (cardName, cardLink) => {
      imagePopup.open(cardName, cardLink);
    },

    (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitAction(() => {
        deleteCardPopup.renderLoading(true);

        api
          .deleteUserCard(cardId)
          .then(() => {
            card.deleteCard();
            deleteCardPopup.renderLoading(false);
            deleteCardPopup.close();
          })

          .catch((err) => {
            console.log(err);
          })

          .finally(() => {
            deleteCardPopup.renderLoading(false);
          });
      });
    },

    (cardId) => {
      if (card.isLiked()) {
        api
          .removeCardLikes(cardId)
          .then((data) => {
            card.updateLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addCardLikes(cardId)
          .then((data) => {
            card.updateLikes(data.likes);
          })

          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
  return card;
}

api
  .getAPIInfo()
  .then(([userData, userCards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData.avatar);
    cardSection = new Section(
      {
        items: userCards,
        renderer: (cardData) => {
          const newCard = createCard(cardData);
          cardSection.addItem(newCard.generateCard());
        },
      },
      cardListEl
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarEditModal
);

// API

/*Event Listeners*/

profileEditButton.addEventListener("click", () => {
  editFormPopup.open();
});

// Avatar Change Modal

const avatarChangePopup = new PopupWithForm("#avatar-edit-modal", (values) => {
  avatarChangePopup.renderLoading(true);
  api
    .updateProfileAvatar(value.avatar)
    .then((value) => {
      userInfo.setAvatar(value.avatar);
      avatarChangePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarChangePopup.renderLoading(false, "Save");
    });
});

avatarChangePopup.setEventListeners();
avatarFormValidator.enableValidation();

// Avatar Change Modal

// Delete Card Modal

const deleteCardPopup = new PopupWithConfirmation("#delete-card-modal");
let cardSection;
let userId;
let handleDeleteCard;

deleteCardPopup.setEventListeners();

// Delete Card Modal

// Profile Edit Modal

const editFormValidator = new FormValidator(validationSettings, editFormEl);

const editFormPopup = new PopupWithForm("#profile-edit-modal", (values) => {
  editFormPopup.renderLoading(true);
  api
    .updateProfileInfo(values)
    .then((data) => {
      userInfo.setUserInfo(data);
      editFormPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editFormPopup.renderLoading(false, "Save");
    });
});

editFormPopup.setEventListeners();
editFormValidator.enableValidation();
editFormValidator.disableButton();

// Profile Edit Modal

// AddCardModal

const addFormValidator = new FormValidator(validationSettings, addFormEl);

const addFormPopup = new PopupWithForm("#add-card-modal", (values) => {
  addFormPopup.renderLoading(true);
  api
    .addNewCard(values)
    .then((cardData) => {
      const card = createCard(cardData);
      addFormPopup.close();
      cardSection.addItem(card.generateCard());
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addFormPopup.renderLoading(false, "Create");
    });
});

avatarButton.addEventListener("click", () => {
  avatarChangePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator.disableButton();
  addFormPopup.open();
});

addFormPopup.setEventListeners();
addFormValidator.enableValidation();

// AddCardModal

// Preview Image Modal

const imagePopup = new PopupWithImage("#preview-image-modal");

imagePopup.setEventListeners();

// Preview Image Modal

// new functions

function openProfileEditForm() {
  const { name, about } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = about;
  editFormPopup.open();
}

/*  function submitEditProfile(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.title,
    job: inputValues.description,
  });
}

function submitAddCard(inputValues) {
  renderCard(inputValues); 
}  */
