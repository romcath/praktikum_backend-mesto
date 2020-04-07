require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const routeError = require('./routes/error');
const { login, createUser } = require('./controllers/users');
const { PORT, DATABASE } = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use((req, res, next) => {
  req.user = { _id: '5e7481a2c7a9e507b868c0db' };
  next();
});
app.use(routesUsers);
app.use(routesCards);
app.use(routeError);


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
