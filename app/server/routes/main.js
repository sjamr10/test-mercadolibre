const express = require('express');

const items = require('./handlers/items');
const product = require('./handlers/product');


const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/items', items.default.render);

router.get('/items/:id', product.default.render);

module.exports = router;
