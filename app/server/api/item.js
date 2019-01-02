import Base from './base';

class Item extends Base {
  getItem = (id) => this.get(`/items/${id}`);
  getDescription = (id) => this.get(`/items/${id}/description`);
}

export default Item;
