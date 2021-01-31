require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const routeError = require('./routes/error');
const { createUserValidation, loginUserValidation } = require('./middlewares/user-validation');
const { login, createUser } = require('./controllers/users');
const { PORT, DATABASE } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors(({
  origin: [
    'http://localhost:8080',
    'https://news-app.cf',
    'https://romcath.github.io',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
})));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginUserValidation, login);

app.use(auth);
app.use(routesUsers);
app.use(routesCards);
app.use(routeError);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
