const allowedCors = [
  'http://mesto.cf/',
  'https://mesto.cf/',
  'http://api.mesto.cf',
  'http://localhost:8080'
];

module.exports = (req, res, next) => {
    const { origin } = req.headers;

    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }

    next();
}