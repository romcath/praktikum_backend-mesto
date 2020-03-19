const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const routeCards = require('./routes/cards');
const routeUsers = require('./routes/users');
const routeErrorUrl = require('./routes/error');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', routeCards);
app.use('/users', routeUsers);
app.use('*', routeErrorUrl);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
