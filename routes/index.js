const route = require('express').Router();

const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { createUserValidation, loginUserValidation } = require('../middlewares/user-validation');
const routesUsers = require('./users');
const routesCards = require('./cards');
const routeError = require('./error');

route.post('/signup', createUserValidation, createUser);
route.post('/signin', loginUserValidation, login);

route.use(auth);
route.use(routesUsers);
route.use(routesCards);
route.use(routeError);

module.exports = route;
