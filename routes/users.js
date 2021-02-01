const route = require('express').Router();

const {
  returnAllUsers, updateUserProfile, updateUserAvatar, getUserMe, logout,
} = require('../controllers/users');

const { updateUserProfileValidation, updateUserAvatarValidation, userIdValidation } = require('../middlewares/user-validation');

route.get('/users/me', getUserMe);
route.get('/users', returnAllUsers);
route.patch('/users/me', updateUserProfileValidation, updateUserProfile);
route.patch('/users/me/avatar', updateUserAvatarValidation, updateUserAvatar);
route.post('/logout', logout);

module.exports = route;
