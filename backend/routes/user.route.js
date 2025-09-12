const express = require('express');
const router = express.Router();
const {register, login, getMe, logout, updateProfile} = require('../controllers/user.controller');
const isAuthenticated = require('../middleware/authenticated');
const {singleUpload} = require('../middleware/multer');

router.post('/register',singleUpload, register);
router.post('/login',login);
router.get('/me',isAuthenticated,getMe);
router.get('/logout',logout);
router.put('/profile/update',isAuthenticated,singleUpload,updateProfile);

module.exports = router