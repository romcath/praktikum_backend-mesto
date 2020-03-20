const Card = require('../models/card');

// Возвращает все карточки
const returnAllcards = (req, res) => {
  Card.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Карточки не загружены', error: err }));
};

// Удаляет карточку по идентификатору
const removeCardId = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Карточка не найдена', error: err }));
};

// Создаёт карточку
const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Карточка не создана', error: err }));
};

module.exports = { returnAllcards, removeCardId, createCard };
