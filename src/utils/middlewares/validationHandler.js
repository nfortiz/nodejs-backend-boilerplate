const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');

function validationHandler(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest();
  }
  next();
}

module.exports = validationHandler;
