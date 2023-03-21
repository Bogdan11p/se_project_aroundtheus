export default class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._closeByEscape);
    document.addEventListener("mousedown", this._handleOverlay);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._closeByEscape);
    document.removeEventListener("mousedown", this._handleOverlay);
  }

  _closeByEscape(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlay = (e) => {
    if (e.target.classList.contains("modal_opened")) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal__close")) {
        this.close();
      }
    });
  }
}
