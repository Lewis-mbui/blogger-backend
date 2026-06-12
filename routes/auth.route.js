const validate = require('../middleware/validate');
const authSchema = require('../validators/auth.validator');
const {login} = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.post('/', validate(authSchema), login);

module.exports = router;