const { getProfileController } = require('../controllers/profile.controller');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();


router.get('/', auth, getProfileController);

module.exports = router;