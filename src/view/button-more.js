import {createElement} from '../utils/util';

const createButtonShowTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class ButtonMore {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createButtonShowTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
