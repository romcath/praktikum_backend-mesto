// Обработка несуществующего запроса
const error = (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
};

module.exports = { error };
