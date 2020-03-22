const route = require('express').Router();

const {
  returnAllcards, removeCardId, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

route.get('/cards', returnAllcards);
route.delete('/cards/:cardId', removeCardId);
route.post('/cards', createCard);
route.put('/cards/:cardId/likes', likeCard);
route.delete('/cards/:cardId/likes', dislikeCard);

module.exports = route;
