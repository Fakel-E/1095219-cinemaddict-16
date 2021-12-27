import AbstractView from './abstract.js';

const createButtonShowTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class ButtonMore extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  get template() {
    return createButtonShowTemplate();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.element.addEventListener('click', this._clickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}
