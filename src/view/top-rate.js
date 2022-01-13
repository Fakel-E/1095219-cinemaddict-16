import AbstractView from './abstract.js';

export const createTopRatedTemplate = () => (
  `<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class TopRated extends AbstractView {
  get template() {
    return createTopRatedTemplate();
  }

  get container() {
    return this.element.querySelector('.films-list__container');
  }

  isEmptyContainer() {
    return this.element.querySelector('.films-list__container').childElementCount === 0;
  }
}
