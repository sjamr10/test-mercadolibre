const { Product } = require('app/server/api');


const getProducInfo = (id) =>
  Promise.all([Product.getProduct(id), Product.getDescription(id)]);

const render = (req, res) => {
  const id = req.path.split('/').pop();

  getProducInfo(id)
    .then((response) => {
      console.log(response[0].data);
      console.log(response[1].data);
    });

  res.render('product');
};

export default {
  render,
};
