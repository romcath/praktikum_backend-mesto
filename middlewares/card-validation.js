const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const url = require('./url-validation');
const { VALIDATION_ERRORS, INCORRECT_ID } = require('../configuration/constants');

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages(VALIDATION_ERRORS),
    link: Joi.string().required().custom(url, 'url validation').messages(VALIDATION_ERRORS),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object({
    cardId: Joi.objectId().message(INCORRECT_ID),
  }),
});

module.exports = { cardValidation, cardIdValidation };
