const express = require('express');

const items = require('app/server/lib/items');
const product = require('app/server/lib/product');


const router = express.Router();

// PAGES

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/items', (req, res) => {
  res.render('items');
});

router.get('/items/:id', (req, res) => {
  res.render('product');
});


// API

router.get('/api/items', (req, res) => {
  const { q } = req.query;

  items.default.getItems(q)
    .then((response) => {
      res.json(response);
    });
});

router.get('/api/items/:id', (req, res) => {
  const id = req.path.split('/').pop();

  product.default.getProduct(id)
    .then((response) => {
      res.json(response);
    });
});

module.exports = router;
