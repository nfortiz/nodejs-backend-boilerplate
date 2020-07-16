const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongo = new MongoMemoryServer();

async function connect() {
  const uri = await mongo.getConnectionString();

  const mongooseOptions = {
    useNewUrlParser: true,
  };

  await mongoose.connect(uri, mongooseOptions);
}

async function closeDatabase() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
}

async function clearDatabase() {
  const collections = mongoose.connection.collections;
  const collectionsDeleted = Object.keys(collections).map((collection) => {
    return collections[collection].deleteMany();
  });

  await Promise.all(collectionsDeleted);
}

module.exports = {
  connect,
  clearDatabase,
  closeDatabase,
};
