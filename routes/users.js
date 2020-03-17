const route = require('express').Router();
const users = require('../data/users.json');

route.get('/me', (req, res) => {
  res.send(users[0]);
});

route.get('/:_id', (req, res) => {
  const { _id } = req.params;
  const user = users.find((item) => item._id === _id);

  if (!user) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  } else res.send(user);
});

route.get('/', (req, res) => {
  res.send(users);
});

module.exports = route;
