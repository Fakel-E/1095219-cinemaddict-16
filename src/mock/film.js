import {getRandomInteger} from '../utils/common';
import {mixArray} from '../utils/common';
import {generateRandom} from '../utils/common';
import {generateDate} from '../utils/date';
import {generateComment} from '../mock/comment';

const FILM_NAMES = [
  'Begin',
  'Back to the Future',
  'Dark Knight',
  'Avengers',
  'Legend № 17',
];
const FILM_POSTERS = [
  'images/posters/made-for-each-other.png',
  'images/posters/popeye-meets-sinbad.png',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg',
];

const FILM_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus',
];

const FILM_DIRECTORS = [
  'Anthony Mann',
  'Jason Mamoa',
  'Harisson Ford',
];

const FILM_WRITERS = [
  'Anne Wigton',
  'Heinz Herald',
  'Richard Weil',
];

const FILM_ACTORS = [
  'Erich von Stroheim',
  'Mary Beth Hughes',
  'Dan Duryea',
];

const FILM_COUNTRYS = [
  'USA',
  'Russia',
  'Finland',
];

const FILM_GENRES = [
  'Drama',
  'Film-Noir',
  'Mystery'
];

let filmId = 0;

const generateDescription = () => mixArray(FILM_DESCRIPTIONS);

const generateRandomBooleanValue = () => Boolean(getRandomInteger(0, 1));

export const generateFilm = () => ({
  id: filmId++,
  name: generateRandom(FILM_NAMES),
  originalName: generateRandom(FILM_NAMES),
  poster: generateRandom(FILM_POSTERS),
  director: generateRandom(FILM_DIRECTORS),
  writers: mixArray(FILM_WRITERS),
  actors: mixArray(FILM_ACTORS),
  country: generateRandom(FILM_COUNTRYS),
  description: generateDescription(),
  rate: getRandomInteger(5, 10),
  date: generateDate(),
  runtime: getRandomInteger(60, 260),
  genre: mixArray(FILM_GENRES),
  ageLimit: getRandomInteger(0, 18),
  comments: new Array(getRandomInteger(1, 5)).fill('').map(generateComment),
  isWatchlist: generateRandomBooleanValue(),
  isWatched: generateRandomBooleanValue(),
  isFavorite: generateRandomBooleanValue(),
});
