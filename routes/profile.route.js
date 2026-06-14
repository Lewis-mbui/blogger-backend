const {
  getProfileController,
  updateProfileController
} = require('../controllers/profile.controller');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const updateProfileSchema = require('../validators/profile.validator');
const express = require('express');
const router = express.Router();


router.get('/', auth, getProfileController);
router.patch('/', validate(updateProfileSchema), auth, updateProfileController);

module.exports = router;