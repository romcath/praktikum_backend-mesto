require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
// const cors = require('cors');

const errorHandler = require('./middlewares/error-handler');
const routes = require('./routes/index');
const { PORT, DATABASE } = require('./configuration/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('../middlewares/cors');

const app = express();

// app.use(cors(({
//   origin: [
//     'http://localhost:8080',
//     'http://mesto.cf/',
//     'http://api.mesto.cf',
//     'https://mesto.cf',
//     'https://romcath.github.io',
//   ],
//   methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
//   credentials: true,
// })));

app.use(cors);

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

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
