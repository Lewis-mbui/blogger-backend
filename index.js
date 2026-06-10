const users = require('./routes/users.route');
const health = require('./routes/health.route');
const errorHandler = require('./middleware/errorHandler');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/health', health)
app.use('/api/users', users);
app.use(errorHandler);


mongoose.connect(config.get('db'))
  .then(() => console.log('connected to db...'))
  .catch((err) => console.error(err.message));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});