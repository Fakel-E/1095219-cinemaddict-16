import ProfileView from './view/profile';
import SiteMenuView from './view/site-menu';
import SortMenuView from './view/sort-menu.js';
import FilmTemplateView from './view/film-container.js';
import FilmCardView  from './view/film-card.js';
import FilmEmptyView  from './view/films-empty.js';
import ButtonMoreView from './view/button-more.js';
import TopRatedView from './view/top-rate.js';
import TopCommentView from './view/top-comment.js';
import StatisticView from './view/statistic.js';
import PopupView from './view/popup.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './utils/filter.js';
import {render, remove} from './utils/render.js';

const FILM_COUNT = 20;
const FILM_TOP = 2;
const FILM_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill('').map(generateFilm);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const siteStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, new ProfileView());
render(siteMainElement, new SiteMenuView(filters));
render(siteMainElement, new SortMenuView());
render(siteMainElement, new FilmTemplateView());

const filmTemplate = document.querySelector('.films');
const siteFilmContainer = filmTemplate.querySelector('.films-list');
const filmCardContainer = siteFilmContainer.querySelector('.films-list__container');

const renderFilmCard = (container, filmElements) => {
  const filmCardComponent = new FilmCardView(filmElements).element;
  const popupView = new PopupView(filmElements);

  const filmCardClickHandler = () => {
    document.body.classList.add('hide-overflow');
    document.body.appendChild(popupView.element);

    const buttonClose = document.querySelector('.film-details__close-btn');

    const removePopup = () => {
      document.body.removeChild(popupView.element);
      popupView.removeElement();
      document.body.classList.remove('hide-overflow');
      buttonClose.removeEventListener('click', removePopup);
    };

    const buttonEscKeydownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removePopup();
        document.removeEventListener('keydown', buttonEscKeydownHandler);
      }
    };

    buttonClose.addEventListener('click', removePopup);
    document.addEventListener('keydown', buttonEscKeydownHandler);
  };

  const addClickHandler = (element) => {
    element.querySelectorAll('.film-card__poster, .film-card__title, .film-card__comments')
      .forEach((item) => {
        item.addEventListener('click', filmCardClickHandler);
      });
  };

  addClickHandler(filmCardComponent);

  render(container, filmCardComponent);
};

const showMoreFilms = (component) => {
  let renderedTaskCount = FILM_PER_STEP;

  component.setClickHandler(() => {
    films
      .slice(renderedTaskCount, renderedTaskCount + FILM_PER_STEP)
      .forEach((film) => renderFilmCard(filmCardContainer, film));

    renderedTaskCount += FILM_PER_STEP;

    if (renderedTaskCount >= films.length) {
      remove(component);
    }
    component.element.removeEventListener('click', showMoreFilms);
  });
};

if (films.length === 0) {
  render(siteMainElement, new FilmEmptyView());
} else {
  films.slice(0, FILM_PER_STEP).forEach((film) => renderFilmCard(filmCardContainer, film));
  render(filmTemplate, new TopRatedView());
  render(filmTemplate, new TopCommentView());
}

if (films.length > FILM_PER_STEP) {

  const loadMoreButtonComponent = new ButtonMoreView();
  render(siteFilmContainer, loadMoreButtonComponent);

  showMoreFilms(loadMoreButtonComponent);
}

const bestFilms = document.querySelectorAll('.films-list--extra');

bestFilms.forEach((topElementsContainer) => {
  const topElement = topElementsContainer.querySelector('.films-list__container');
  for (let k = 0; k < FILM_TOP; k++) {
    render(topElement, new FilmCardView(films[k]));
  }
});

render(siteStatisticElement, new StatisticView());

