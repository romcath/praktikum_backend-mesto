const route = require('express').Router();

const { returnAllcards, removeCardId, createCard } = require('../controllers/cards');

route.get('/cards', returnAllcards);
route.delete('/cards/:cardId', removeCardId);
route.post('/cards', createCard);

module.exports = route;
