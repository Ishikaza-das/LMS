const express = require('express');
const router = express.Router();
const {register, login, getMe, logout, updateProfile} = require('../controllers/user.controller');
const isAuthenticated = require('../middleware/authenticated');

router.post('/register',register);
router.post('/login',login);
router.get('/me',isAuthenticated,getMe);
router.get('/logout',logout);
router.put('/profile/update',isAuthenticated,updateProfile);

module.exports = router