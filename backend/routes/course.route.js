const express = require('express');
const router = express.Router();

const {createCourse, getAllCourse, getInstructorCourse, updateCourse, deleteCourse} = require('../controllers/course.controller');
const isAuthenticated = require('../middleware/authenticated');
const checkRole = require('../middleware/checkRole');

router.post('/createcourse',isAuthenticated,checkRole(['instructor']), createCourse);
router.get('/get',isAuthenticated,checkRole(['student']),getAllCourse);
router.get('/get/instructorcourse/:id',isAuthenticated,checkRole(['instructor']),getInstructorCourse);
router.put('/update/:id',isAuthenticated,checkRole(['instructor']),updateCourse);
router.delete('/delete/:id',isAuthenticated,checkRole(['instructor']),deleteCourse);

module.exports = router;