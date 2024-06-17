const express = require('express');
const router = express.Router();
const dropController = require('../controllers/home_controller');

router.get('/', dropController.drop);
router.use('/files', require('./file'));

module.exports = router