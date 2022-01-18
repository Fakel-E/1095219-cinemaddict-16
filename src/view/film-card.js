import {humanizeDate, getFilmDuration} from '../utils/date';
import AbstractView from './abstract.js';

const createFilmCardTemplate = (film) => {
  const {
    name,
    poster,
    description,
    rate,
    date,
    runtime,
    genre,
    isWatchlist,
    isWatched,
    isFavorite
  } = film;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rate}</p>
      <p class="film-card__info">
        <span class="film-card__year">${humanizeDate(date)}</span>
        <span class="film-card__duration">${getFilmDuration(runtime)}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist
        ${isWatchlist ? 'film-card__controls-item--active' : ''}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched
        ${isWatched ? 'film-card__controls-item--active' : ''}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite
        ${isFavorite ? 'film-card__controls-item--active' : ''}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setPosterClickHandler = (callback) => {
    this._callback.clickPoster = callback;
    this.element.querySelector('.film-card__poster').addEventListener('click', this.#posterClickHandler);
  }

  setTitleClickHandler = (callback) => {
    this._callback.clickTitle = callback;
    this.element.querySelector('.film-card__title').addEventListener('click', this.#titleClickHandler);
  }

  setCommentsClickHandler = (callback) => {
    this._callback.clickComments = callback;
    this.element.querySelector('.film-card__comments').addEventListener('click', this.#commentsClickHandler);
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.clickWatchlist = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#addToWatchlistClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.clickFavorite = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  setWatchedClickHandler = (callback) => {
    this._callback.clickWatched = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#markAsWatchedClickHandler);
  }

  #posterClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickPoster();
  }

  #titleClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickTitle();
  }

  #commentsClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickComments();
  }

  #addToWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickWatchlist();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickFavorite();
  }

  #markAsWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickWatched();
  }
}

