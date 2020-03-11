const route = require('express').Router();

route.get('*', (req, res) => {
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
});

module.exports = route;