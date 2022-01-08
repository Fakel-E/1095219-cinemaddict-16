import ProfileView from './view/profile';
import SiteMenuView from './view/site-menu';
import SortMenuView from './view/sort-menu.js';
import FilmListPresenter from './presenter/film-list.js';
import StatisticView from './view/statistic.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './utils/filter.js';
import {render} from './utils/render.js';

const FILM_COUNT = 20;

const films = new Array(FILM_COUNT).fill('').map(generateFilm);
const filters = generateFilter(films);


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, new ProfileView());
render(siteMainElement, new SiteMenuView(filters));
render(siteMainElement, new SortMenuView());
const filmPresenter = new FilmListPresenter(siteMainElement);
filmPresenter.init(films);

render(siteStatisticElement, new StatisticView(FILM_COUNT));
