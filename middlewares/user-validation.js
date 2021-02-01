const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const url = require('./url-validation');
const { VALIDATION_ERRORS } = require('../configuration/constants');

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages(VALIDATION_ERRORS),
    about: Joi.string().min(2).max(30)
      .messages(VALIDATION_ERRORS),
    avatar: Joi.string().custom(url, 'url validation').messages(VALIDATION_ERRORS),
    email: Joi.string().required().email().messages(VALIDATION_ERRORS),
    password: Joi.string().required().min(8).messages(VALIDATION_ERRORS),
  }),
});

const updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages(VALIDATION_ERRORS),
    about: Joi.string().required().min(2).max(30)
      .messages(VALIDATION_ERRORS),
  }),
});

const updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri().messages(VALIDATION_ERRORS),
  }),
});

const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages(VALIDATION_ERRORS),
    password: Joi.string().required().min(8).messages(VALIDATION_ERRORS),
  }),
});

module.exports = {
  createUserValidation,
  updateUserProfileValidation,
  updateUserAvatarValidation,
  loginUserValidation,
};
