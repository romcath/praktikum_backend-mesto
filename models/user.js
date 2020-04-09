const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: [validator.isURL, 'Некорректный формат ссылки для аватара пользователя'],
  },
  email: {
    type: String,
    required: true,
    unique: 'Электронная почта ({VALUE}) уже используется',
    lowercase: true,
    validate: [validator.isEmail, 'Некорректный формат для электронной почты'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then(user => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then(matched => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

userSchema.plugin(beautifyUnique);

module.exports = mongoose.model('user', userSchema);
