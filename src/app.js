const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

require('./config/database');

const authApi = require('./components/user/userApi');

const {
  wrapErrors,
  errorHandler,
} = require('./utils/middlewares/errorHandler');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

//API
authApi(app);

//404 error
app.use(notFoundHandler);

//Error Handler
app.use(wrapErrors);
app.use(errorHandler);

module.exports = app;
