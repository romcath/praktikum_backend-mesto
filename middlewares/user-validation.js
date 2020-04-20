const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const url = require('./url-validation');

const message = {
  name: {
    'string.empty': 'Поле `name` не может быть пустым',
    'string.min': 'Поле `name` не может быть меньше 2 символов',
    'string.max': 'Поле `name` не может быть больше 30 символов',
    'any.required': 'Отсутствует обязательное поле `name`',
  },
  about: {
    'string.empty': 'Поле `about` не может быть пустым',
    'string.min': 'Поле `about` не может быть меньше 2 символов',
    'string.max': 'Поле `about` не может быть больше 30 символов',
    'any.required': 'Отсутствует обязательное поле `about`',
  },
  avatar: {
    'string.empty': 'Поле `avatar` не может быть пустым',
    'any.required': 'Отсутствует обязательное поле `avatar`',
  },
  email: {
    'string.empty': 'Поле `email` не может быть пустым',
    'string.email': 'Некорректный формат поля `email`',
    'any.required': 'Отсутствует обязательное поле `email`',
  },
  password: {
    'string.empty': 'Поле `password` не может быть пустым',
    'string.min': 'Поле `password` не может быть меньше 8 символов',
    'any.required': 'Отсутствует обязательное поле `password`',
  },
};

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages(message.name),
    about: Joi.string().required().min(2).max(30)
      .messages(message.about),
    avatar: Joi.string().required().custom(url, 'url validation').messages(message.avatar),
    email: Joi.string().required().email().messages(message.email),
    password: Joi.string().required().min(8).messages(message.password),
  }),
});

const updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages(message.name),
    about: Joi.string().required().min(2).max(30)
      .messages(message.about),
  }),
});

const updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri().messages(message.avatar),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object({
    userId: Joi.objectId().message('`userId` не может быть меньше 24 символов'),
  }),
});

const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages(message.email),
    password: Joi.string().required().min(8).messages(message.password),
  }),
});

module.exports = {
  createUserValidation,
  updateUserProfileValidation,
  updateUserAvatarValidation,
  userIdValidation,
  loginUserValidation,
};
