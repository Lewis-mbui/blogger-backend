const {login} = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.post('/', login);

module.exports = router;