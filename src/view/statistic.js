import AbstractView from './abstract.js';


const createStatisticTemplate = () => (
  '<p>130 291 movies inside</p>'
);

export default class Statistic extends AbstractView {
  get template() {
    return createStatisticTemplate();
  }
}
