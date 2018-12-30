import Base from './base';

class Categories extends Base {
  getCategories = (id) => this.get(`/categories/${id}`);
}

export default Categories;
