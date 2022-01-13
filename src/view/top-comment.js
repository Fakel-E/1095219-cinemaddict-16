import AbstractView from './abstract.js';

export const createTopCommentTemplate = () => (
  `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      </div>
  </section>`
);

export default class TopComment extends AbstractView {
  get template() {
    return createTopCommentTemplate();
  }

  get container() {
    return this.element.querySelector('.films-list__container');
  }

  isEmptyContainer() {
    return this.element.querySelector('.films-list__container').childElementCount === 0;
  }
}
