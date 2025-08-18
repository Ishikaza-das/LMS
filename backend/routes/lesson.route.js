const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/authenticated');
const {multipleUpload} = require('../middleware/multer');
const {addLesson, deleteLesson} = require("../controllers/lessons.controller");
 
router.post("/add/:id",isAuthenticated,multipleUpload,addLesson);
router.delete("/delete/:id",isAuthenticated,deleteLesson);

module.exports = router