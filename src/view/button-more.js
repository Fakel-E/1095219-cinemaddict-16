import AbstractView from './abstract.js';

const createButtonShowTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class ButtonMore extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createButtonShowTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }
}
