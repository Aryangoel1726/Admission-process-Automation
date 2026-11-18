const jwt = require('jsonwebtoken');

/**
 * Generate a signed JWT for a given user ID
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'default_secret', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

module.exports = { generateToken };
