const express = require('express');

const items = require('./handlers/items');


const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/items', items.default.render);

router.get('/:id', (req, res) => {
  res.render('items');
});

module.exports = router;
