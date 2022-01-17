import MainContentView from '../view/main-content.js';
import FilmTemplateView from '../view/film-container.js';
import FilmListTemplateView from '../view/film-list.js';
import SortMenuView from '../view/sort-menu.js';
import FilmEmptyView  from '../view/films-empty.js';
import ButtonMoreView from '../view/button-more.js';
import FilmCardPresenter from '../presenter/film-card.js';
import TopRatedView from '../view/top-rate.js';
import TopCommentView from '../view/top-comment.js';
import {
  render,
  remove,
  selectRatedFilms,
  selectCommentFilm,
  sortByDate,
  sortByRating } from '../utils/render.js';
import { updateItemById, SortType } from '../utils/common.js';

const FILM_PER_STEP = 5;
const FILM_TOP = 2;

export default class FilmList {
  #container = null;
  #films = [];
  #sourcedFilms = [];

  #currentSortType = SortType.DEFAULT;
  #renderedFilmCount = FILM_PER_STEP;
  #allFilmsView = new FilmTemplateView();
  #sortMenuView = new SortMenuView(/*SortType.DEFAULT*/);
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
    this.#sourcedFilms = films.slice();

    this.#renderFilmsBoard();
  }

  #handleModeChange = () => {
    [
      ...Object.values(this.#filmCardPresenterStorage),
      ...Object.values(this.#topRateFilmPresenterStorage),
      ...Object.values(this.#topCommentFilmPresenterStorage),
    ]
      .forEach((presenter) => presenter.resetView());
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clear();
    this.#renderFilmsBoard();
  }

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortByDate);
        break;
      case SortType.RATE:
        this.#films.sort(sortByRating);
        break;
      default:
        this.#films = this.#sourcedFilms.slice();
    }

    this.#currentSortType = sortType;
  }

  #renderSort = () => {
    this.#sortMenuView = new SortMenuView(this.#currentSortType);
    render(this.#mainContentView, this.#sortMenuView);

    this.#sortMenuView.setSortTypeChangeHandler(this.#handleSortTypeChange);
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

    if (this.#topRatedView.isEmptyContainer()) {
      selectRatedFilms(this.#films)
        .slice(from, to)
        .forEach((film) => this.#renderFilmCard(film, this.#topRatedView.container, this.#topRateFilmPresenterStorage));
    }
  }

  #renderCommentFilms = (from, to) => {

    if (this.#topCommentView.isEmptyContainer()) {
      selectCommentFilm(this.#films)
        .slice(from, to)
        .forEach((film) => this.#renderFilmCard(film, this.#topCommentView.container, this.#topCommentFilmPresenterStorage));
    }
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
    this.#renderSort();
    this.#renderFilms(0, FILM_PER_STEP);
    render(this.#allFilmsView, this.#allFilmsListView);

    if (this.#films.length > FILM_PER_STEP) {
      this.#renderShowMoreButton();
    }

    this.#renderTopFilms(0, FILM_TOP);
    this.#renderCommentFilms(0, FILM_TOP);
  }

  #renderFilmsBoard = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderAllFilms();
    render(this.#container, this.#mainContentView);
    render(this.#mainContentView, this.#allFilmsView);
    render(this.#mainContentView, this.#topRatedView);
    render(this.#mainContentView, this.#topCommentView);
  }

  #clear = () => {
    Object
      .values(this.#filmCardPresenterStorage)
      .forEach((presenter) => presenter.destroy());
    this.#filmCardPresenter = {};
    this.#renderedFilmCount = FILM_PER_STEP;
    remove(this.#sortMenuView);
    remove(this.#showMoreButtonView);
  }

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItemById(this.#films, updatedFilm);
    this.#sourcedFilms = updateItemById(this.#sourcedFilms, updatedFilm);
    this.#filmCardPresenterStorage[updatedFilm.id].init(updatedFilm);
  }
}
