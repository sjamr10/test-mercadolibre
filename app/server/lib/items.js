const { Search, Categories } = require('app/server/api');


const getResults = (search) =>
  Promise.all([Search.getItems(search)]);

const getCategories = (id) =>
  Promise.all([Categories.getCategories(id)]);

const formatCategories = (categories) => categories.map((category) => category.name);

const formatItems = (results) => results.map((item) => ({
  id: item.id,
  title: item.title,
  price: {
    currency: item.currency_id,
    amount: Math.floor(item.price),
    decimals: parseFloat((item.price % 1).toFixed(2)),
  },
  picture: item.thumbnail,
  condition: item.condition,
  free_shipping: item.shipping.free_shipping,
  state_name: item.address.state_name,
}));

const getItems = (search) => new Promise((resolve, reject) => {
  getResults(search)
    .then((resultsResp) => {
      const { results } = resultsResp[0].data;

      getCategories(results[0].category_id).then((categoriesResp) => {
        const categories = formatCategories(categoriesResp[0].data.path_from_root);

        const limit = 4;
        const items = formatItems(results.slice(0, limit));

        const response = {
          author: {
            name: 'Sergio',
            lastname: 'Miranda',
          },
          categories,
          items,
        };

        resolve(response);
      });
    });
});

export default {
  getItems,
};
