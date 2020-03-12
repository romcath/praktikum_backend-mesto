const route = require('express').Router();
const users = require('../data/users.json');

route.get('/users/:_id', (req, res) => {
  const { _id } = req.params;
  // eslint-disable-next-line no-underscore-dangle
  const user = users.find((item) => item._id === _id);

  if (!user) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  } else res.send(user);
});


route.get('/users', (req, res) => {
  res.send(users);
});

module.exports = route;
