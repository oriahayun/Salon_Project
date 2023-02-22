const express = require('express');
const { 
    registerView, register
} = require('../../controllers/auth/registerController');
const router = express.Router();

router.get('/', registerView);
router.post('/', register);

module.exports = router;