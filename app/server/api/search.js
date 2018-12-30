import Base from './base';

class Search extends Base {
  getItems = (query) => this.get(`/sites/MLA/search?q=${query}`);
}

export default Search;
