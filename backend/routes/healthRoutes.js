const express = require('express');
const healthController = require('../controllers/healthController');

const router = express.Router();

router.get('/', healthController.checkDatabaseConnection);

module.exports = router;
