const { Product, Categories } = require('app/server/api');


const getProducInfo = (id) =>
  Promise.all([Product.getProduct(id), Product.getDescription(id)]);

const getCategories = (id) =>
  Promise.all([Categories.getCategories(id)]);

const formatCategories = (categories) => categories.map((category) => category.name);

const render = (req, res) => {
  const id = req.path.split('/').pop();

  getProducInfo(id)
    .then((response) => {
      const product = response[0].data;

      getCategories(product.category_id)
        .then((categoriesResp) => {
          const categories = formatCategories(categoriesResp[0].data.path_from_root);

          const description = response[1].data;

          const item = {
            id,
            title: product.title,
            price: {
              currency: product.currency_id,
              amount: Math.floor(product.price),
              decimals: parseFloat((product.price % 1).toFixed(2)),
            },
            picture: product.pictures[0],
            condition: product.condition,
            free_shipping: product.shipping.free_shipping,
            sold_quantity: product.sold_quantity,
            description: description.plain_text,
            categories,
          };

          const ssrData = {
            product: {
              author: {
                name: 'Sergio',
                lastname: 'Miranda',
              },
              item,
            },
          };

          res.locals.REACT_STATE = {
            ...res.locals.REACT_STATE,
            ...ssrData,
          };

          res.render('product');
        });
    });
};

export default {
  render,
};
