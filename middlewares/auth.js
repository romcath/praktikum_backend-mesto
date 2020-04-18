const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');
const UnauthorizedError = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
