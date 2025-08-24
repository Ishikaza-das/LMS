const express = require('express');
const { addLesson, deleteLesson, updateLesson, getLessonCourse } = require('../controllers/lessons.controller');
const isAuthenticated = require('../middleware/authenticated');
const { singleUpload } = require('../middleware/multer');
const router = express.Router();

router.post('/post/:id',isAuthenticated, addLesson);
router.delete('/delete/:id',isAuthenticated, deleteLesson);
router.put('/course/:id/lesson/:id',isAuthenticated, singleUpload, updateLesson);
router.get('/course/lesson/:id',isAuthenticated, getLessonCourse);

module.exports = router;