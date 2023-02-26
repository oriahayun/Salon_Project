const express = require('express');
const { salonListView, salonNewView } = require('../controllers/salonController');
const { auth } = require('../middleware/auth')
const router = express.Router();

router.get('/', auth, salonListView)
router.get('/new-salon', auth, salonNewView)

module.exports = router;
