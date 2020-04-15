const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = require('../config');

const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized');
const BadRequestError = require('../errors/bad-request');
const User = require('../models/user');

// Возвращает всех пользователей
const returnAllUsers = (req, res, next) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(next);
};

// Возвращает пользователя по _id
const returnUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        throw new NotFoundError(`Нет пользователя с id ${req.params.userId}`);
      }
      res.send({ data: user });
    })
    .catch(next);
};

// Создаёт пользователя
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(user => res.status(201).send(user.omitPrivate()))
    .catch(() => next(new BadRequestError(`Почта ${email} уже используется`)));
};

// Обновляет профиль пользователя
const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then(user => res.send({ data: user }))
    .catch(next);
};

// Обновляет аватар пользователя
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .then(user => res.send({ data: user }))
    .catch(next);
};

// Проверяет почту и пароль, создаёт JWT
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).end();
    })
    .catch(() => next(new UnauthorizedError('Неправильные почта или пароль')));
};

module.exports = {
  returnAllUsers, returnUserId, createUser, updateUserProfile, updateUserAvatar, login,
};
