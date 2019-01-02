import Base from './base';

export default class Item extends Base {
  getItem = (id) => this.get(`/items/${id}`);
}
