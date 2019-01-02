import Base from './base';

export default class Search extends Base {
  getItems = (query) => this.get(`/items?q=${query}`);
}
