const express = require('express');
const request = require('request');

const {
  API,
} = TEST_MERCADOLIBRE;

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
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
      'API-TOKEN': API.TOKEN,
    },
  })
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(res);
});

router.get('/:id', (req, res) => {
  res.render('home');
});

module.exports = router;
