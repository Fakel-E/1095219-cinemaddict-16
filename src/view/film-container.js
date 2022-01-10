import AbstractView from './abstract';

export default class FilmTemplate extends AbstractView {
  get template() {
    return `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    </section>`;
  }
}
