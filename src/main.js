import ProfileView from './view/profile';
import SiteMenuView from './view/site-menu';
import SortMenuView from './view/sort-menu.js';
import FilmTemplateView from './view/film-container.js';
import FilmCardView  from './view/film-card.js';
import ButtonMoreView from './view/button-more.js';
import TopRatedView from './view/top-rate.js';
import TopCommentView from './view/top-comment.js';
import StatisticView from './view/statistic.js';
import PopupView from './view/popup.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './utils/filter.js';
import {render} from './utils/util.js';

const FILM_COUNT = 20;
const FILM_TOP = 2;
const FILM_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill('').map(generateFilm);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const siteStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, new ProfileView().element);
render(siteMainElement, new SiteMenuView(filters).element);
render(siteMainElement, new SortMenuView().element);
render(siteMainElement, new FilmTemplateView().element);

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

    const btnCloseClickHandler = () => {
      buttonClose.addEventListener('click', () => {
        document.body.removeChild(popupView.element);
        popupView.removeElement();
        document.body.classList.remove('hide-overflow');
        buttonClose.removeEventListener('click', btnCloseClickHandler);
      });
    };
    btnCloseClickHandler();
  };

  filmCardComponent.querySelector('.film-card__poster').addEventListener('click', filmCardClickHandler);
  filmCardComponent.querySelector('.film-card__title').addEventListener('click', filmCardClickHandler);
  filmCardComponent.querySelector('.film-card__comments').addEventListener('click', filmCardClickHandler);

  render(container, filmCardComponent);
};

films.slice(0, FILM_PER_STEP).forEach((film) => renderFilmCard(filmCardContainer, film));

const moreBtnListener = (component) => {
  let renderedTaskCount = FILM_PER_STEP;

  const moreBtnClickHandler = () => {
    component.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      films
        .slice(renderedTaskCount, renderedTaskCount + FILM_PER_STEP)
        .forEach((film) => renderFilmCard(filmCardContainer, film));

      renderedTaskCount += FILM_PER_STEP;

      if (renderedTaskCount >= films.length) {
        component.element.remove();
        component.removeElement();
      }
      component.element.removeEventListener('click', moreBtnClickHandler);
    });
  };
  moreBtnClickHandler();
};

if (films.length > FILM_PER_STEP) {

  const loadMoreButtonComponent = new ButtonMoreView();
  render(siteFilmContainer, loadMoreButtonComponent.element);

  moreBtnListener(loadMoreButtonComponent);
}

render(filmTemplate, new TopRatedView().element);
render(filmTemplate, new TopCommentView().element);
const bestFilms = document.querySelectorAll('.films-list--extra');

bestFilms.forEach((topElementsContainer) => {
  const topElement = topElementsContainer.querySelector('.films-list__container');
  for (let k = 0; k < FILM_TOP; k++) {
    render(topElement, new FilmCardView(films[k]).element);
  }
});

render(siteStatisticElement, new StatisticView().element);

