const { body } = require('express-validator');
const validationHandler = require('../../utils/middlewares/validationHandler');

const validateUser = [
  body('username').isAlphanumeric().not().isEmpty().trim().escape(),
  body('email').isEmail(),
  body('password')
    .notEmpty()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    ),
  validationHandler,
];

module.exports = validateUser;
