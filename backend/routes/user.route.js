const express = require('express');
const router = express.Router();
const {register, login, getMe, logout} = require('../controllers/user.controller');
const isAuthenticated = require('../middleware/authenticated');

router.post('/register',register);
router.post('/login',login);
router.get('/me',isAuthenticated,getMe);
router.get('/logout',logout);

module.exports = router