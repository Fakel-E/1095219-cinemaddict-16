import {createElement} from '../utils/util';

export default class FilmsEmpty {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return '<section class="films-list"> <h2 class="films-list__title">There are no movies in our database</h2> </section>';
  }

  removeElement() {
    this.#element = null;
  }
}
