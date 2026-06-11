const errorHandler = require('../middleware/errorHandler');
const users = require('../routes/users.route');
const health = require('../routes/health.route');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/health', health)
app.use('/api/users', users);
app.use(errorHandler);

module.exports = app;