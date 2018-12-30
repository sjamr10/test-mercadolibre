const { Search } = require('app/server/api');

const loadSSRData = (search) =>
  Promise.all([Search.getItems(search)]);

const render = (req, res) => {
  const { search } = req.query;

  loadSSRData(search)
    .then((response) => {
      const ssrData = {
        search,
        items: response[0].data.results,
      };

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
