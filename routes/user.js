const express = require('express');
const { userListView, userNewView, userNewCreate, userUpdate, userEditView, userDelete } = require('../controllers/userController');
const { auth } = require('../middleware/auth')
const router = express.Router();

router.get('/', auth, userListView);
router.get('/new-user', auth, userNewView);
router.post('/new-user', auth, userNewCreate);
router.get('/edit-user/:id', auth, userEditView);
router.post('/edit-user/:id', auth, userUpdate);
router.post('/user-delete', auth, userDelete)

module.exports = router;
