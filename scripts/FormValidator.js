class FormValidator {
constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement; 

}

_showInputError(inputEl) {

    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);

}

_hideInputError(inputEl) {
  const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(this._inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.remove(this._errorClass);
}

_toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

}

_hasInvalidInput() {
return this._inputEls.some((inputEl) => !inputElement.validity.valid);

}

_checkInputValidity() {

  if (!inputEl.validity.valid) {
   this._showInputError(inputEl);
  }
  this._hideInputError(inputEl);

}


_setEventListeners () {

    this._inputEls = [...this.form.querySelectorAll(this._inputSelector)];
    this._submitButton = this.form.querySelector(this._submitButtonSelector);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });

}

enableValidation() {
    this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
  
      setEventListeners(formEl, options);
}



const settings = {
    formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "popup__error_visible",
}

export default FormValidator;