import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popup = document.querySelector(".modal__form");
    this._confirmButton = document.querySelector("#delete-confirmation-button");
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
    this._popup.addEventListener("click", () => {
      this._handleSubmit();
      e.preventDefault();
    });
  }
}

export default PopupWithConfirmation;
