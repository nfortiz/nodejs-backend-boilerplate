const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const UserService = require('./userService');
const config = require('../config');

// Basic Authentication
require('../../utils/auth/strategies/basic');

function authApi(app) {
  const userService = new UserService();
  const router = express.Router();

  app.use('/api/auth', router);

  router.post('/sing-in', async function (req, res, next) {
    passport.authenticate('basic', function (error, user) {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }

        req.login(user, { session: false }, async function (err) {
          if (err) {
            next(err);
          }
          const { _id: id, username, email } = user;
          const payload = {
            sub: id,
            name: username,
            email,
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m',
          });

          res.cookie('token', token, {
            httpOnly: !config.isDev,
            secure: !config.isDev,
          });

          return res.status(200).json({ user: { id, username, email } });
        });
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  });

  router.post('/sing-up', async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const existsUser = await userService.getUser({ email });
      if (existsUser) {
        next(boom.unauthorized());
      }
      const user = await userService.createUser({
        user: { username, password, email },
      });
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = authApi;
