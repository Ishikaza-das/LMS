const express = require('express');
const { addLesson } = require('../controllers/lessons.controller');
const isAuthenticated = require('../middleware/authenticated');
const router = express.Router();

router.post('/post/:id',isAuthenticated, addLesson);

module.exports = router;