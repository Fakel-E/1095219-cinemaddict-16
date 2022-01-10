import AbstractView from './abstract';

export default class FilmListTemplate extends AbstractView {

  get template() {
    return '<div class="films-list__container"> </div>';
  }

}
