const config = require('config');
const mongoose = require('mongoose');

module.exports = async () => {
  let db;

  if (process.env.NODE_ENV === "test") {
    db = config.get('testDb');
  } else db = config.get('db');

  await mongoose.connect(db);
  console.log(`Connected to ${db}...`);
}