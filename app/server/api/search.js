import Base from './base';

export default class Search extends Base {
  getValidSearch = (id) => this.get(`/search/${id}`);

  getInfo = (id, code) => this.get(`/search/search-info/${id}/${code}`);
}
