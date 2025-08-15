const express = require('express');
const { login, registerUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);

module.exports = router;
