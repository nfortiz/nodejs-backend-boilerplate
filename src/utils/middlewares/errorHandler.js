/* eslint-disable no-unused-vars */
const boom = require('@hapi/boom');

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;

  res.status(statusCode);
  res.json(payload);
}

module.exports = {
  wrapErrors,
  errorHandler,
};
