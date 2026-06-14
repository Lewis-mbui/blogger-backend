const mongoose = require('mongoose');
const connectDb = require('../../startup/connectDb');

const connectDatabase = async () => await connectDb();

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections)
    await collections[key].deleteMany({});
};

const closeDatabase = async () => await mongoose.connection.close();

module.exports = {
  connectDatabase,
  clearDatabase,
  closeDatabase
};