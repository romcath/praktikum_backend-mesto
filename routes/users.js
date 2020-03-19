const route = require('express').Router();

const { returnAllUsers, returnUserId, createUser } = require('../controllers/users');

route.get('/users', returnAllUsers);
route.get('/users/:userId', returnUserId);
route.post('/users', createUser);

module.exports = route;
