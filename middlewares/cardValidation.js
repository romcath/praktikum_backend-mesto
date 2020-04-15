const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const message = {
  name: {
    'string.empty': 'Поле `name` не может быть пустым',
    'string.min': 'Поле `name` не может быть меньше 2 символов',
    'string.max': 'Поле `name` не может быть больше 30 символов',
    'any.required': 'Отсутствует обязательное поле `name`',
  },
  link: {
    'string.empty': 'Поле `link` не может быть пустым',
    'string.uri': 'Некорректный формат для поля `link`',
    'any.required': 'Отсутствует обязательное поле `link`',
  },
};

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages(message.name),
    link: Joi.string().required().uri().messages(message.link),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object({
    cardId: Joi.objectId().message('`cardId` не может быть меньше 24 символов'),
  }),
});

module.exports = { cardValidation, cardIdValidation };
