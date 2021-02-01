const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');

const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict');
const User = require('../models/user');

// Возвращает всех пользователей
const returnAllUsers = (req, res, next) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(next);
};

// Возвращает информацию о пользователе
const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
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
    .then((user) => {
      res.clearCookie('jwt');
      res.status(201).send(user.omitPrivate());
    })
    .catch(err => {
      res.clearCookie('jwt');
      if (err.errors.email) {
        next(new ConflictError(`Почта ${email} уже используется`));
        return;
      }
      next(new Error('Ошибка при создании пользователя'));
    });
};

// Обновляет профиль пользователя
const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then(user => res.send(user))
    .catch(next);
};

// Обновляет аватар пользователя
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .then(user => res.send(user))
    .catch(next);
};

// Проверяет почту и пароль, создаёт JWT
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id }, SECRET);
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true }).end('{}');
    })
    .catch(next);
};

// Разлогинивает пользователя
const logout = (req, res, next) => {
  try {
    res.cookie('jwt', '', { maxAge: 0, httpOnly: true }).send({ message: 'Вы вышли из системы' });
  } catch (err) {
    return next();
  }
};

module.exports = {
  returnAllUsers, createUser, updateUserProfile, updateUserAvatar, login, getUserMe, logout,
};
