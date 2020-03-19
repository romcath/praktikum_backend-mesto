const User = require('../models/user');

// Возвращает всех пользователей
const returnAllUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Пользователи не загружены', error: err }));
};

// Возвращает пользователя по _id
const returnUserId = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Пользователь не найден', error: err }));
};

// Создаёт пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Пользователь не создан', error: err }));
};

module.exports = { returnAllUsers, returnUserId, createUser };
