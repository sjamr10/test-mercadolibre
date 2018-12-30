import Base from './base';

class Search extends Base {
  getItems = (query) => this.get(`/search?q=${query}`);
}

export default Search;
