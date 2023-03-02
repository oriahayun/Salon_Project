const express = require('express');
const { appointmentHistoryListView } = require('../controllers/appointmentController');
const { auth } = require('../middleware/auth')
const router = express.Router();

router.get('/', auth, appointmentHistoryListView)

module.exports = router;
