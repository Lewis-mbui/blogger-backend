const errorHandler = require('../middleware/errorHandler');
const users = require('../routes/users.route');
const auth = require('../routes/auth.route');
const health = require('../routes/health.route');
const profile = require('../routes/profile.route');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/health', health)
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use(errorHandler);

module.exports = app;