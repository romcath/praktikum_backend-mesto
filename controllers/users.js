const bcrypt = require('bcryptjs');

const User = require('../models/user');

// Возвращает всех пользователей
const returnAllUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Пользователи не загружены', error: err.message }));
};

// Возвращает пользователя по _id
const returnUserId = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        res.status(404).send({ message: `Нет пользователя с id ${req.params.userId}` });
        return;
      }
      res.send({ data: user });
    })
    .catch(err => res.status(500).send({ message: `Произошла ошибка при получении пользователя с id ${req.params.userId}`, error: err.message }));
};

// Создаёт пользователя
const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(user => res.status(201).send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Пользователь не создан', error: err.message }));
};

// Обновляет профиль пользователя
const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Профиль пользователя не обновлён', error: err.message }));
};

// Обновляет аватар пользователя
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Аватар пользователя не обновлён', error: err.message }));
};

module.exports = {
  returnAllUsers, returnUserId, createUser, updateUserProfile, updateUserAvatar,
};
