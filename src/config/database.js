const mongoose = require('mongoose');
const debug = require('debug')('app:database:'),
  error = require('debug')('app:error');

const config = require('./index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;

//Conection Database
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => debug('DB is connected'))
  .catch((err) => error(err));

// Create Schemas and models
require('../components/user/user');
