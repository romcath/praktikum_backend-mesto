module.exports = (req, res, next) => {
  const { password } = req.body;

  if (req.body.password === undefined) {
    res.status(400).send({ message: 'В теле запроса нет поля с паролем' });
    return;
  }
  if (password.length < 8) {
    res.status(400).send({ message: 'Пароль не может быть меньше 8 символов' });
    return;
  }

  next();
};
