export default class Section {
  constructor({ items, renderer }, itemListEl) {
    this._items = items;
    this._renderer = renderer;
    this._itemList = itemListEl;
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(item) {
    this._itemList.prepend(item);
  }
}
