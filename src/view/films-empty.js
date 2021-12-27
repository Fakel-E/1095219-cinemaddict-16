import AbstractView from './abstract.js';

export default class FilmsEmpty extends AbstractView {
  get template() {
    return '<section class="films-list"> <h2 class="films-list__title">There are no movies in our database</h2> </section>';
  }
}
