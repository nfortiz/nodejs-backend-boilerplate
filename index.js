const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const debug = require('debug')('app:index:');

const config = require('./config');
require('./config/database');

const authApi = require('./routes/auth');

const {
    wrapErrors,
    errorHandler
} = require('./utils/middlewares/errorHandler');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

//API
authApi(app);

//404 error
app.use(notFoundHandler);

//Error Handler
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
    debug('listen on port:', config.port);
});