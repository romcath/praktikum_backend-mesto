const Card = require('../models/card');

// Возвращает все карточки
const returnAllcards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Карточки не загружены', error: err.message }));
};

// Удаляет карточку по идентификатору
const removeCardId = (req, res) => {
  Card.findById(req.params.cardId)
    .then(card => {
      if (!card) {
        res.status(404).send({ message: `Нет карточки с id ${req.params.cardId}` });
        return;
      }
      if (!card.owner.equals(req.user._id)) {
        res.status(403).send({ message: 'Вы не можете удалить карточку, созданную другим пользователем' });
        return;
      }
      Card.deleteOne(card)
        .then(() => res.send({ data: card }));
    })
    .catch(err => res.status(500).send({ message: 'Карточка не найдена', error: err.message }));
};

// Создаёт карточку
const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.status(201).send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Карточка не создана', error: err.message }));
};

// Ставит лайк карточке
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then(card => {
      if (!card) {
        res.status(404).send({ message: `Нет карточки с id ${req.params.cardId}` });
        return;
      }
      res.send({ data: card });
    })
    .catch(err => res.status(500).send({ message: 'Лайк не поставлен', error: err.message }));
};

// Убирает лайк с карточки
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => {
      if (!card) {
        res.status(404).send({ message: `Нет карточки с id ${req.params.cardId}` });
        return;
      }
      res.send({ data: card });
    })
    .catch(err => res.status(500).send({ message: 'Лайк не убран', error: err.message }));
};

module.exports = {
  returnAllcards, removeCardId, createCard, likeCard, dislikeCard,
};
