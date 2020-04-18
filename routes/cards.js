const route = require('express').Router();

const {
  returnAllcards, removeCardId, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { cardValidation, cardIdValidation } = require('../middlewares/cardValidation');

route.get('/cards', returnAllcards);
route.delete('/cards/:cardId', cardIdValidation, removeCardId);
route.post('/cards', cardValidation, createCard);
route.put('/cards/:cardId/likes', cardIdValidation, likeCard);
route.delete('/cards/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = route;
