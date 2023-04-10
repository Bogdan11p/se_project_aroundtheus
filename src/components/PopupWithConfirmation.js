import Popup from "./Popup";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popup = this._popupElement.querySelector(".modal__form");
    this._confirmButton = document.querySelector("#delete-confirmation-button");
    this._saveButton = document.querySelector(".form__save-button");
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleSubmit();
    });
    this._popup.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}

export default PopupWithConfirmation;
