const Lesson = require("../models/lessons.model");
const Course = require("../models/course.model");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");

const addLesson = async (req, res) => {
  try {
    const { title } = req.body;
    const courseId = req.params.id;

    if (!title) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let lesson = await Lesson.findOne({ title });
    lesson = await Lesson.create({
      title,
      courseId
    });

    await Course.findByIdAndUpdate(courseId,
      {
        $push:{ lessons: lesson._id}
      }
    );

    return res.status(200).json({
      message:"Lesson created",
      success: true
    })
    
  } catch (error) {
    return res.status(400).json({
      message:error.message,
      success: false
    })
  }
};

const deleteLesson = async (req,res) => {
  try {
    const {lessonId} = req.body;
    const courseId = req.params.id;

    let lesson = await Lesson.findByIdAndDelete(lessonId);
    if(!lesson){
      return res.status(400).json({
        message:"Lesson not found",
        success: false
      })
    }
    
    await Course.findByIdAndUpdate(courseId,
      {
        $pull:{lessons: lesson._id}
      }
    )

    return res.status(200).json({
      message:"Lesson delete",
      success: true
    })

  } catch (error) {
    return res.status(400).json({
      message:error.message,
      success: false
    })
  }
}

const updateLesson = async (req,res) => {
  try {
    const {courseId, lessonId} = req.params;
    const file = req.file;
    const {title, status} = req.body;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const lesson = await Lesson.findByIdAndUpdate(lessonId,
      {
        title,
        status,
        videoUrl : cloudResponse.secure_url
      },{ new: true });

      await Course.findByIdAndUpdate(courseId,
        {
          status:"published"
        }
      )
      return res.status(200).json({
        message:"Lecture uploaded",
        lesson,
        success: true
      })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false
    })
  }
}

const getLessonCourse = async (req,res) => {
  try {
    const {courseId} = req.params;
    if(!courseId){
      return res.status(400).json({
        message:"Unable to fecth lesson",
        success: false
      })
    }
    const lesson = await Lesson.find({courseId: courseId});

    return res.status(200).json({
      lesson,
      success: true
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false
    })
  }
}

module.exports = {addLesson, deleteLesson, updateLesson, getLessonCourse}