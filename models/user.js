const mongoose = require('mongoose');

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
    validate: {
      validator: link => /(http|https):\/\/_?[a-zA-Z]+\.(_?[a-zA-Z]+\.)?[a-zA-Z]{2,}(\/[A-Za-z0-9\-\S]*)?#?/.test(link),
      message: props => `${props.value} неправильная ссылка`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
