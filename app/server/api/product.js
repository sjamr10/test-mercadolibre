import Base from './base';

class Product extends Base {
  getProduct = (id) => this.get(`/items/${id}`);
  getDescription = (id) => this.get(`/items/${id}/description`);
}

export default Product;
