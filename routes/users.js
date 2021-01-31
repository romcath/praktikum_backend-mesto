const route = require('express').Router();

const {
  returnAllUsers, returnUserId, updateUserProfile, updateUserAvatar, getUserMe,
} = require('../controllers/users');

const { updateUserProfileValidation, updateUserAvatarValidation, userIdValidation } = require('../middlewares/user-validation');

route.get('/users/me', getUserMe);
route.get('/users', returnAllUsers);
// route.get('/users/:userId', userIdValidation, returnUserId);
// route.patch('/users/me', updateUserProfileValidation, updateUserProfile);
route.patch('/users/me/avatar', updateUserAvatarValidation, updateUserAvatar);

module.exports = route;
