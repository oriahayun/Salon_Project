const express = require('express');
const { dashboardView } = require('../controllers/dashboardController');
const { auth } = require('../middleware/auth')
const router = express.Router();

router.get('/', auth, dashboardView)

module.exports = router;
