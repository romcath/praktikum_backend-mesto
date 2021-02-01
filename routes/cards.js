const route = require('express').Router();

const {
  returnAllcards, removeCardId, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { cardValidation, cardIdValidation } = require('../middlewares/card-validation');

route.get('/cards', returnAllcards);
route.delete('/cards/:cardId', cardIdValidation, removeCardId);
route.post('/cards', cardValidation, createCard);
route.put('/cards/like/:cardId', cardIdValidation, likeCard);
route.delete('/cards/like/:cardId', cardIdValidation, dislikeCard);

module.exports = route;
