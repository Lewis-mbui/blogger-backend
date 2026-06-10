const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());
app.get('/health', (req, res) => {
  res.send({status: 'ok'});
});

mongoose.connect(config.get('db'))
  .then(() => console.log('connected to db...'))
  .catch((err) => console.error(err.message));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});