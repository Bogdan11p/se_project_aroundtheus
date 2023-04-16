import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._confirmButton = this._popupElement.querySelector(
      "#delete-confirmation-button"
    );
    this._saveButton = this._popupElement.querySelector(".form__save-button");
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._confirmButton.textContent = "Loading...";
    } else {
      this._saveButton.textContent = "Yes";
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    this._handleSubmit();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("click", () => {
      this._handleSubmit();
      e.preventDefault();
    });
  }
}

export default PopupWithConfirmation;
