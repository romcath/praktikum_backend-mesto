const route = require('express').Router();
const users = require('../data/users.json');

const doesUserExist = (req, res, next) => {
  const { _id } = req.params;
  const user = users.find(item => item._id === _id);

  if (!user) {
    res.status(404).send({ "message": "Нет пользователя с таким id" });
    return;
  }
  next();
};

const sendUserId = (req, res) => {
  res.send({ "_id": req.params._id });
}

const sendUsers = (req, res) => {
  res.send(users);
};

route.get('/users/:_id', doesUserExist);
route.get('/users/:_id', sendUserId);
route.get('/users', sendUsers);

module.exports = route;