import {createElement} from '../utils/util';

export const createTopCommentTemplate = () => (
  `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      </div>
  </section>`
);

export default class TopComment {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTopCommentTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
