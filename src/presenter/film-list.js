import MainContentView from '../view/main-content.js';
import FilmTemplateView from '../view/film-container.js';
import FilmListTemplateView from '../view/film-list.js';
import FilmEmptyView  from '../view/films-empty.js';
import ButtonMoreView from '../view/button-more.js';
import FilmCardPresenter from '../presenter/film-card.js';
import TopRatedView from '../view/top-rate.js';
import TopCommentView from '../view/top-comment.js';
import {render, remove, selectRatedFilms, selectCommentFilm} from '../utils/render.js';
import { updateItemById } from '../utils/common.js';

const FILM_PER_STEP = 5;
const FILM_TOP = 2;

export default class FilmList {
  #container = null;
  #films = [];

  #renderedFilmCount = FILM_PER_STEP;
  #allFilmsView = new FilmTemplateView();
  #allFilmsListView = new FilmListTemplateView();
  #mainContentView = new MainContentView();
  #FilmsEmptyView = new FilmEmptyView();
  #showMoreButtonView = new ButtonMoreView();
  #topRatedView = new TopRatedView();
  #topCommentView = new TopCommentView();

  #filmCardPresenter = {};
  #filmCardPresenterStorage  = {};
  #topRateFilmPresenterStorage = {};
  #topCommentFilmPresenterStorage = {};

  constructor(container) {
    this.#container = container;
  }

  init(films) {
    this.#films = films.slice();

    this.#renderAllFilms();
    render(this.#container, this.#mainContentView);
    render(this.#mainContentView, this.#allFilmsView);
    render(this.#mainContentView, this.#topRatedView);
    render(this.#mainContentView, this.#topCommentView);
  }

  #handleModeChange = () => {
    [
      ...Object.values(this.#filmCardPresenterStorage),
      ...Object.values(this.#topRateFilmPresenterStorage),
      ...Object.values(this.#topCommentFilmPresenterStorage),
    ]
      .forEach((presenter) => presenter.resetView());
  }

  #renderFilmCard = (film, templateElement, typePresenter) => {
    const filmCardPresenter = new FilmCardPresenter(templateElement, this.#handleFilmChange, this.#handleModeChange);

    filmCardPresenter.init(film);
    typePresenter[film.id] = filmCardPresenter;
  }

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilmCard(film, this.#allFilmsListView, this.#filmCardPresenterStorage));
  }

  #renderTopFilms = (from, to) => {

    selectRatedFilms(this.#films)
      .slice(from, to)
      .forEach((film) => this.#renderFilmCard(film, this.#topRatedView.container, this.#topRateFilmPresenterStorage));
  }

  #renderCommentFilms = (from, to) => {

    selectCommentFilm(this.#films)
      .slice(from, to)
      .forEach((film) => this.#renderFilmCard(film, this.#topCommentView.container, this.#topCommentFilmPresenterStorage));
  }

  #renderNoFilms = () => {
    render(this.#container, this.#FilmsEmptyView);
  }

  #handleShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_PER_STEP);
    this.#renderedFilmCount += FILM_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonView);
    }
  }

  #renderShowMoreButton = () => {
    render(this.#allFilmsView, this.#showMoreButtonView);

    this.#showMoreButtonView.setClickHandler(this.#handleShowMoreButtonClick);
  }

  #renderAllFilms = () => {
    this.#renderFilms(0, FILM_PER_STEP);
    render(this.#allFilmsView, this.#allFilmsListView);

    if (this.#films.length > FILM_PER_STEP) {
      this.#renderShowMoreButton();
    }

    this.#renderTopFilms(0, FILM_TOP);
    this.#renderCommentFilms(0, FILM_TOP);
  }

  #render = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderAllFilms();
  }

  #clear = () => {
    Object
      .values(this.#filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this.#filmCardPresenter = {};
    this.#renderedFilmCount = FILM_PER_STEP;
    remove(this.#showMoreButtonView);
  }

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItemById(this.#films, updatedFilm);
    this.#filmCardPresenter[updatedFilm.id].init(updatedFilm);
  }
}
