const { Search } = require('app/server/api');

const loadSSRData = (search) =>
  Promise.all([Search.getItems(search)]);

const render = (req, res) => {
  const { search } = req.query;

  loadSSRData(search)
    .then((response) => {
      const { results } = response[0].data;

      const items = results.slice(0, 4).map((item) => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: 0,
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      }));

      const ssrData = {
        search,
        results: {
          author: {
            name: 'Sergio',
            lastname: 'Miranda',
          },
          categories: [],
          items,
        },
      };

      console.log(ssrData);

      res.locals.REACT_STATE = {
        ...res.locals.REACT_STATE,
        ...ssrData,
      };

      res.render('items');
    })
    .catch((err) => {
      res.status(500);
      res.locals.error = err;
    });
};

export default {
  render,
};
