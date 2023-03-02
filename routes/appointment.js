const express = require('express');
const { appointmentListView, appointmentApprove, appointmentDelete } = require('../controllers/appointmentController');
const { auth } = require('../middleware/auth')
const router = express.Router();

router.get('/', auth, appointmentListView)
router.post('/appointment-delete', auth, appointmentDelete)
router.post('/appointment-approve', auth, appointmentApprove)

module.exports = router;
