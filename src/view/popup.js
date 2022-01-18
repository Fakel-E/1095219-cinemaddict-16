import {humanizeDate, humanizeDateComment, getFilmDuration} from '../utils/date';
import {} from '../utils/date';
import SmartView from './smart.js';

const Emotion = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE: 'puke',
  ANGRY: 'angry',
};


const renderComment = ({emoji, text, author, date}) => (
  `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src=${emoji} width="55" height="55" alt="emoji-smile">
      </span>
        <div>
          <p class="film-details__comment-text">${text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${humanizeDateComment(date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
    </li>`
);

const createCommentTitleCount = (commentsCount, isCommentsCount) => isCommentsCount ? `
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}
    </span></h3>` : '';

const renderFilmControlsTeamplate = (list, history, favorite) => (
  `<button type="button" class="film-details__control-button ${list ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button ${history ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button ${favorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>`
);

const createPopupTemplate = (data) => {
  const {
    name,
    poster,
    description,
    rate,
    date,
    runtime,
    genre,
    originalName,
    director,
    writers,
    actors,
    country,
    ageLimit,
    comments,
    isWatchlist,
    isWatched,
    isFavorite,
    isCommentsCount,
    commentsCount,
    emotion
  } = data;

  const templateComment = comments.map((comment) => renderComment(comment)).join('');
  const templateGenre = genre.map((genres) => `<span class="film-details__genre">${(genres)}</span>`).join('');

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${poster}>
            <p class="film-details__age">${ageLimit}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${name}</h3>
                <p class="film-details__title-original">Original: ${originalName}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${rate}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${humanizeDate(date)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getFilmDuration(runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                ${templateGenre}
                </td>
              </tr>
            </table>
            <p class="film-details__film-description">
            ${description}
            </p>
          </div>
        </div>
        <section class="film-details__controls">
        ${renderFilmControlsTeamplate(isWatchlist, isWatched, isFavorite)}
        </section>
      </div>
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          ${createCommentTitleCount(commentsCount, isCommentsCount)}
          <ul class="film-details__comments-list">
          ${templateComment}
          </ul>
          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">
              ${emotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">` : ''}
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="${Emotion.SMILE}">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="${Emotion.SLEEPING}">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="${Emotion.PUKE}">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="${Emotion.ANGRY}">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
  );
};

export default class PopupView extends SmartView {
  _emotion = null;

  constructor(film) {
    super();
    this._data = PopupView.parseMovieToData(film);

    this.#setInnerHandlers();
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
  }

  get template() {
    return createPopupTemplate(this._data);
  }

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((item) =>
      item.addEventListener('click', this.#emojiClickHandler));
    this.element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this.#popupCloseButtonClickHandler);
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.clickWatchlist = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.clickFavorite = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  setWatchedClickHandler = (callback) => {
    this._callback.clickWatched = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
  }

  setCloseButtonClickHandler = (callback) => {
    this._callback.clickCloseButton = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#popupCloseButtonClickHandler);
  }

  #watchlistClickHandler = () => {
    this._callback.clickWatchlist();
  }

  #favoriteClickHandler = () => {
    this._callback.clickFavorite();
  }

  #watchedClickHandler = () => {
    this._callback.clickWatched();
  }

  #popupCloseButtonClickHandler = () => {
    this._callback.clickCloseButton();
  }

  #emojiClickHandler = (evt) => {
    evt.preventDefault();
    const currentPosition = this.element.scrollTop;
    this.updateData({
      emotion: evt.target.value,
    });
    this.element.scrollTo(0, currentPosition);
    this.element.querySelector('.film-details__comment-input').placeholder = '';
  }

  static parseMovieToData = (movie) => ({...movie,
    emotion: this._emotion,
  });

  static parseDataToMovie = (data) => {
    const movie = {...data};

    delete movie.emotion;

    return movie;
  };
}
