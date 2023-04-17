export const cardData = [
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
export const addNewCardButton = document.querySelector(".profile__add-button");
export const addNewCardModal = document.querySelector("#add-card-modal");
export const newCardCloseButton = document.querySelector("#add-close-button");
export const addCardFormElement = addNewCardModal.querySelector(".modal__form");
export const cardTitleInput =
  addCardFormElement.querySelector(".form__input-title");
export const cardUrlInput =
  addCardFormElement.querySelector(".form__input-url");

export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileCloseButton = document.querySelector(
  "#profile-close-button"
);

export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__info-description"
);
export const profileTitleInput = document.querySelector(".form__input-name");
export const profileDescriptionInput = document.querySelector(
  ".form__input-description"
);

export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const cardListEl = document.querySelector(".cards__list");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const previewImageModal = document.querySelector("#preview-image-modal");

export const previewImageModalCloseButton = document.querySelector(
  "#preview-close-button"
);

export const cardSelector = "#card-template";
export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "popup__error_visible",
};

export const editFormEl = profileEditModal.querySelector(".modal__form");
export const addFormEl = addNewCardModal.querySelector(".modal__form");
export const modalPictureFooter = document.querySelector(
  ".modal__preview-footer"
);

export const deleteCardModal = document.querySelector("#delete-card-modal");
export const confirmFormEl = deleteCardModal.querySelector(".modal__form");
export const deleteCardButton = document.querySelector(".cards__remove-button");

export const avatarEditModal = document.querySelector("#avatar-edit-modal");
export const profileAvatar = document.querySelector(".profile__image");
export const avatarButton = document.querySelector(".profile__image-edit");

export const profileInfoTitle = document.querySelector(".profile__title");
export const profileInfoDescription = document.querySelector(
  ".profile__info-description"
);
