const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const Card = require('../models/card');

// Возвращает все карточки
const returnAllcards = (req, res, next) => {
  Card.find({})
    .then(card => res.send(card))
    .catch(next);
};

// Удаляет карточку по идентификатору
const removeCardId = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError(`Нет карточки с id ${req.params.cardId}`))
    .then(card => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Вы не можете удалить карточку, созданную другим пользователем');
      }
      return Card.deleteOne(card)
        .then(() => res.send(card));
    })
    .catch(next);
};

// Создаёт карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.status(201).send(card))
    .catch(next);
};

// Ставит лайк карточке
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(`Нет карточки с id ${req.params.cardId}`))
    .then(card => res.send(card))
    .catch(next);
};

// Убирает лайк с карточки
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(`Нет карточки с id ${req.params.cardId}`))
    .then(card => res.send(card))
    .catch(next);
};

module.exports = {
  returnAllcards, removeCardId, createCard, likeCard, dislikeCard,
};
