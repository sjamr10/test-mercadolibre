const { Search } = require('app/server/api');

const loadSSRData = (search) =>
  Promise.all([Search.getInfo(search)]);

const handleSSRData = (search, items) => ({
  search,
  items,
});

const render = (req, res) => {
  const { search } = req.query;

  console.log('search', search);

  res.render('items');

  // loadSSRData(search)
  //   .then((response) => {
  //     const ssrData = handleSSRData(search, response[0].data.response);

  //     res.locals.REACT_STATE = {
  //       ...res.locals.REACT_STATE,
  //       ...ssrData,
  //     };
  //     res.render('items');
  //   })
  //   .catch((err) => {
  //     res.status(500);
  //     res.locals.error = err;
  //   });
};

export default {
  render,
};
