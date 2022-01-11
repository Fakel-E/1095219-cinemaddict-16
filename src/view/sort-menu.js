import AbstractView from './abstract.js';
import {SortType} from '../utils/common.js';

const createSortItemTemplate = (sortType, isChecked) => `
  <li>
    <a href="#${sortType}" class="sort__button ${isChecked ? 'sort__button--active' : ''}" data-sort-type="${sortType}">
      Sort by ${sortType}
    </a>
  </li>
`;

const createSortMenuTemplate = (activeSortType) => {
  const sortItemsTemplate = Object
    .values(SortType)
    .map((sortType) => createSortItemTemplate(sortType, sortType === activeSortType)).join('');
  return `<ul class="sort">${sortItemsTemplate}</ul>`;
};


export default class SortMenu extends AbstractView {
  #activeSortType = {};

  constructor(activeSortType) {
    super();

    this.#activeSortType = activeSortType;
  }

  get template() {
    return createSortMenuTemplate(this.#activeSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'a') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }
}
