const route = require('express').Router();

const {
  updateUserProfile, updateUserAvatar, getUserMe, logout,
} = require('../controllers/users');

const { updateUserProfileValidation, updateUserAvatarValidation } = require('../middlewares/user-validation');

route.get('/users/me', getUserMe);
route.patch('/users/me', updateUserProfileValidation, updateUserProfile);
route.patch('/users/me/avatar', updateUserAvatarValidation, updateUserAvatar);
route.post('/logout', logout);

module.exports = route;
