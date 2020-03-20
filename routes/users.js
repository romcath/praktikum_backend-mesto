const route = require('express').Router();

const {
  returnAllUsers, returnUserId, createUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

route.get('/users', returnAllUsers);
route.get('/users/:userId', returnUserId);
route.post('/users', createUser);
route.patch('/users/me', updateUserProfile);
route.patch('/users/me/avatar', updateUserAvatar);

module.exports = route;
