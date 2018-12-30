import Base from './base';

export default class Search extends Base {
  search = (data) => this.post('/search', data, { timeout: 60000 });
}
