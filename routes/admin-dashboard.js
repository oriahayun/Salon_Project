const express = require('express');
const { adminDashboardView } = require('../controllers/dashboardController');
const { auth } = require('../middleware/auth')
const router = express.Router();

router.get('/', auth, adminDashboardView)

module.exports = router;
