const {
  NODE_ENV, PORT = 3000, DATABASE = 'mongodb://localhost:27017/mestodb', JWT_SECRET,
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  DATABASE,
  JWT_SECRET,
};
