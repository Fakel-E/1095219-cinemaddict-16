import {createElement} from '../utils/util';


const createStatisticTemplate = () => (
  '<p>130 291 movies inside</p>'
);

export default class Statistic {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createStatisticTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
