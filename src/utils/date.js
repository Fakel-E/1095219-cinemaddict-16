import dayjs from 'dayjs';
import {getRandomInteger} from './common.js';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const MAX_DAYS_GAP = 7;

export const generateDate = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  return dayjs().add(daysGap, 'day').toDate();
};

export const humanizeDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
export const humanizeDateComment = (dueDate) => dayjs(dueDate).format('YYYY/MM/D/ H:MM');

export const getFilmDuration = (runtime) => {
  const filmDuration = `${dayjs.duration(runtime, 'minutes').format('H')}h ${dayjs.duration(runtime, 'minutes').format('mm')}m`;
  return filmDuration;
};
