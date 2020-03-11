const route = require('express').Router();
const cards = require('../data/cards.json');

route.get('/cards', (req, res) => {
  res.send(cards);
});

module.exports = route;