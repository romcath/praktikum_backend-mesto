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

const app = express();

const allowedCors = [
  'http://mesto.cf',
  'http://mesto.cf/auth.html',
  'http://api.mesto.cf',
  'http://localhost:8080'
];

app.use(function(req, res, next) {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

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
