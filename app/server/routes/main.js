const express = require('express');
const request = require('request');

const items = require('./handlers/items');


const {
  API,
} = TEST_MERCADOLIBRE;

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/items', items.default.render);

router.get('/:id', (req, res) => {
  res.render('items');
});

router.use('/api', (req, res) => {
  console.log(`${req.url}`);
  request({
    url: `${req.url}`,
    method: req.method,
    json: req.body,
    timeout: API.TIMEOUT,
    forever: true,
    headers: {
    },
  })
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(res);
});

module.exports = router;
