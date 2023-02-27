const express = require('express');
const { salonListView, salonNewView, salonNewCreate, salonNewDelete, salonEditView, salonUpdate } = require('../controllers/salonController');
const { auth } = require('../middleware/auth')
const router = express.Router();

router.get('/', auth, salonListView)
router.get('/new-salon', auth, salonNewView)
router.get('/edit-salon/:id', auth, salonEditView)
router.post('/edit-salon/:id', auth, salonUpdate)
router.post('/new-salon', auth, salonNewCreate)
router.post('/salon-delete', auth, salonNewDelete)

module.exports = router;
