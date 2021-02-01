const { isURL } = require('validator');

const { INCORRECT_URL } = require('../configuration/constants');

module.exports = (value, helpers) => {
  if (!isURL(value)) {
    // eslint-disable-next-line no-useless-escape
    return helpers.message(`${INCORRECT_URL} ${helpers.state.path}`);
  }
  return value;
};
