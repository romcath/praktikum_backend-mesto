const {
  NODE_ENV, PORT = 3000, DATABASE = 'mongodb://localhost:27017/mestodb', JWT_SECRET, SECRET = 'dev-secret',
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  DATABASE,
  JWT_SECRET,
  SECRET,
};
