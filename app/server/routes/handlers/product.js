
const render = (req, res) => {
  const id = req.path.split('/').pop();
  console.log(id);

  res.render('product');
};

export default {
  render,
};
