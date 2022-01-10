import AbstractView from './abstract';

export default class MainContent extends AbstractView {

  get template() {
    return '<section class="films"> </section>';
  }
}
