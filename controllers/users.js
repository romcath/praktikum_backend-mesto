const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = require('../config');

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

// Проверяет почту и пароль, создаёт JWT
const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).end();
    })
    .catch(err => res.status(401).send({ message: err.message }));
};

module.exports = {
  returnAllUsers, returnUserId, createUser, updateUserProfile, updateUserAvatar, login,
};
