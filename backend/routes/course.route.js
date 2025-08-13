const express = require('express');
const router = express.Router();

const {createCourse, getAllCourse, getInstructorCourse, updateCourse, deleteCourse, getCourseById} = require('../controllers/course.controller');
const isAuthenticated = require('../middleware/authenticated');
const {singleUpload} = require('../middleware/multer');

router.post('/createcourse',isAuthenticated, singleUpload,createCourse);
router.get('/get',isAuthenticated,getAllCourse);
router.get('/get/instructorcourse/:id',isAuthenticated,getInstructorCourse);
router.get('/get/course/:id',isAuthenticated,getCourseById);
router.put('/update/:id',isAuthenticated,singleUpload,updateCourse);
router.delete('/delete/:id',isAuthenticated,deleteCourse);

module.exports = router;