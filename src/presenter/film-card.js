import FilmCardView  from '../view/film-card.js';
import PopupView from '../view/popup.js';
import {render, remove, replace} from '../utils/render.js';

const Mode = {
  CLOSE: 'CLOSE',
  OPENED: 'OPENED',
};

export default class FilmCard {
  #container = null;
  #changeData = null;
  #changeMode = null;

  #film = {};
  #view = null;
  #popupView = null;
  #mode = Mode.CLOSE;

  constructor(container, changeData, changeMode) {
    this.#container = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(film) {
    this.#film = film;

    const prevFilmCardView = this.#view;
    const prevPopupView = this.#popupView;

    this.#view = new FilmCardView(film);
    this.#popupView = new PopupView(film);

    this.#view.setPosterClickHandler(this.#handleViewClick);
    this.#view.setTitleClickHandler(this.#handleViewClick);
    this.#view.setCommentsClickHandler(this.#handleViewClick);

    this.#view.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#view.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#view.setWatchedClickHandler(this.#handleWatchedClick);

    this.#setPopupEventListeners();

    if (prevFilmCardView === null || prevPopupView === null) {
      render(this.#container, this.#view);
      return;
    }

    if (this.#mode === Mode.CLOSE) {
      replace(this.#view, prevFilmCardView);
    }

    if (this.#mode === Mode.OPENED) {
      replace(this.#popupView, prevPopupView);
      replace(this.#view, prevFilmCardView);
    }

    remove(prevFilmCardView);
    remove(prevPopupView);
  }

  destroy() {
    remove(this.#view);
    remove(this.#popupView);
  }

  resetView() {
    if (this.#mode === Mode.OPENED) {
      this.#closeFilmDetail();
    }
  }

  #setPopupEventListeners = () => {
    this.#popupView.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popupView.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupView.setWatchedClickHandler(this.#handleWatchedClick);
    this.#popupView.setCloseButtonClickHandler(this.#handlePopupCloseButtonClick);
  }

  #handleViewClick = () => {
    if (this.#mode === Mode.OPENED) {
      return;
    }
    this.#changeMode();
    this.#mode = Mode.OPENED;
    this.#setPopupEventListeners();
    document.addEventListener('keydown', this.#buttonEscKeydownHandler);
    document.body.classList.add('hide-overflow');
    render(document.body, this.#popupView);
  }

  #closeFilmDetail = () => {
    remove(this.#popupView);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#buttonEscKeydownHandler);
    this.#mode = Mode.CLOSE;
  }

  #handleWatchlistClick = () => {
    this.#changeData(
      Object.assign(
        {},
        this.#film,
        {
          isWatchlist: !this.#film.isWatchlist,
        },
      ),
    );
  }

  #handleFavoriteClick = () => {
    this.#changeData(
      Object.assign(
        {},
        this.#film,
        {
          isFavorite: !this.#film.isFavorite,
        },
      ),
    );
  }

  #handleWatchedClick = () => {
    this.#changeData(
      Object.assign(
        {},
        this.#film,
        {
          isWatched: !this.#film.isWatched,
        },
      ),
    );
  }

  #handlePopupCloseButtonClick = () => {
    this.#closeFilmDetail();
  }

  #buttonEscKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeFilmDetail();
    }
  }
}
