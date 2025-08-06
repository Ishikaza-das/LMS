const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/authenticated');
const {multipleUpload} = require('../middleware/multer');
const {addLesson, courseLessons} = require("../controllers/lessons.controller");
 
router.post("/add/:id",isAuthenticated,multipleUpload,addLesson);
router.get("/get/:id",isAuthenticated,courseLessons);

module.exports = router