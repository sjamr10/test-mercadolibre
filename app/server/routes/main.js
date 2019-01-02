const express = require('express');

const product = require('./handlers/product');

const items = require('app/server/lib/items');


const router = express.Router();

// PAGES

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/items', (req, res) => {
  res.render('items');
});

router.get('/items/:id', product.default.render);


// API

router.get('/api/search', (req, res) => {
  const { q } = req.query;

  items.default.getItems(q)
    .then((response) => {
      res.json(response);
    });
});

module.exports = router;
