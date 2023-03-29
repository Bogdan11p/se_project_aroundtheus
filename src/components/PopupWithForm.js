import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._modalForm = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formInputs = this._popup.querySelectorAll(".form__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._formInputs.forEach((input) => {
      inputValues[""] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.close();
    });
  }

  close() {
    super.close();
  }
}

export default PopupWithForm;
