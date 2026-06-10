const validate = require('../middleware/validate');
const registerUserSchema = require('../validators/users.validator');
const register = require('../controllers/users.controller');
const express = require('express');
const router = express.Router();

router.post('/', validate(registerUserSchema), register);

module.exports = router;