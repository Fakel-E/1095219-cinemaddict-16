import {createProfileTemplate} from './view/profile';
import {createSiteMenuTemplate} from './view/site-menu';
import {createSortMenuTemplate} from './view/sort-menu';
import {createFilmTemplate} from './view/film-container';
import {createFilmCardTemplate} from './view/film-card';
import {createButtonShowMoreTemplate} from './view/button-more';
import {createTopRatedTemplate} from './view/top-rate';
import {createTopCommentTemplate} from './view/top-comment';
import {createStatisticTemplate} from './view/statistic';
import {createPopupTemplate} from './view/popup';
import {generateFilm} from './mock/film.js';
// import {generateComment} from './mock/comment.js';
import {generateFilter} from './mock/filter.js';

const FILM_COUNT = 20;
const FILM_TOP = 2;
const FILM_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill('').map(generateFilm);
const filters = generateFilter(films);

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const siteStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createSiteMenuTemplate(filters));
render(siteMainElement, createSortMenuTemplate(),);
render(siteMainElement, createFilmTemplate(),);

const filmTemplate = document.querySelector('.films');
const siteFilmContainer = filmTemplate.querySelector('.films-list');
const filmCardContainer = siteFilmContainer.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_PER_STEP); i++) {
  render(filmCardContainer, createFilmCardTemplate(films[i]));
}
if (films.length > FILM_PER_STEP) {
  let renderedTaskCount = FILM_PER_STEP;
  render(siteFilmContainer, createButtonShowMoreTemplate());

  const loadMoreButton = siteFilmContainer.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedTaskCount, renderedTaskCount + FILM_PER_STEP)
      .forEach((film) => render(filmCardContainer, createFilmCardTemplate(film)));

    renderedTaskCount += FILM_PER_STEP;

    if (renderedTaskCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

render(filmTemplate, createTopRatedTemplate());
render(filmTemplate, createTopCommentTemplate());
const bestFilms = document.querySelectorAll('.films-list--extra');

bestFilms.forEach((topElementsContainer) => {
  const topElement = topElementsContainer.querySelector('.films-list__container');
  for (let k = 0; k < FILM_TOP; k++) {
    render(topElement, createFilmCardTemplate(films[k]));
  }
});

render(siteStatisticElement, createStatisticTemplate());
render(siteFooterElement, createPopupTemplate(films[0]), 'afterend');
