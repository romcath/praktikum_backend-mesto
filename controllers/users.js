const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET, LIFETIME_COOKIES } = require('../configuration/config');
const {
  USER_NOT_FOUND, USER_EMAIL_CONFLICT, USER_CAN_NOT_CREATE, LOGOUT,
} = require('../configuration/constants');

const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict');
const User = require('../models/user');

// Возвращает информацию о пользователе
const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch(next);
};

// Создаёт пользователя
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.clearCookie('jwt');
      res.status(201).send(user.omitPrivate());
    })
    .catch((err) => {
      res.clearCookie('jwt');
      if (err.errors.email) {
        next(new ConflictError(USER_EMAIL_CONFLICT));
        return;
      }
      next(new Error(USER_CAN_NOT_CREATE));
    });
};

// Обновляет профиль пользователя
const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((user) => res.send(user))
    .catch(next);
};

// Обновляет аватар пользователя
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .then((user) => res.send(user))
    .catch(next);
};

// Проверяет почту и пароль, создаёт JWT
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET);
      res.cookie('jwt', token, { maxAge: LIFETIME_COOKIES, httpOnly: true, sameSite: true }).end('{}');
    })
    .catch(next);
};

// Разлогинивает пользователя
// eslint-disable-next-line consistent-return
const logout = (req, res, next) => {
  try {
    res.cookie('jwt', '', { maxAge: 0, httpOnly: true }).send({ message: LOGOUT });
  } catch (err) {
    return next();
  }
};

module.exports = {
  createUser, updateUserProfile, updateUserAvatar, login, getUserMe, logout,
};
