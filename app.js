const express = require('express');
const path = require('path');

const routeCards = require('./routes/cards');
const routeUsers = require('./routes/users');
const routeErrorUrl = require('./routes/error');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', routeCards);
app.use('/users', routeUsers);
app.use('*', routeErrorUrl);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
