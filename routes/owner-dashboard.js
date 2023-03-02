const express = require('express');
const { ownerDashboardView } = require('../controllers/dashboardController');
const { auth } = require('../middleware/auth')
const router = express.Router();

router.get('/', auth, ownerDashboardView)

module.exports = router;
