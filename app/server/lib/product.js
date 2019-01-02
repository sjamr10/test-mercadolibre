const { Item, Categories } = require('app/server/api');


const getProducInfo = (id) =>
  Promise.all([Item.getItem(id), Item.getDescription(id)]);

const getCategories = (id) =>
  Promise.all([Categories.getCategories(id)]);

const formatCategories = (categories) => categories.map((category) => category.name);

const getProduct = (id) => new Promise((resolve, reject) => {
  getProducInfo(id)
    .then((productResp) => {
      const product = productResp[0].data;

      getCategories(product.category_id)
        .then((categoriesResp) => {
          const categories = formatCategories(categoriesResp[0].data.path_from_root);

          const description = productResp[1].data;

          const item = {
            id,
            title: product.title,
            price: {
              currency: product.currency_id,
              amount: Math.floor(product.price),
              decimals: parseFloat((product.price % 1).toFixed(2)),
            },
            picture: product.pictures[0].url,
            condition: product.condition,
            free_shipping: product.shipping.free_shipping,
            sold_quantity: product.sold_quantity,
            description: description.plain_text,
            categories,
          };

          const response = {
            author: {
              name: 'Sergio',
              lastname: 'Miranda',
            },
            item,
          };

          resolve(response);
        });
    });
});

export default {
  getProduct,
};
