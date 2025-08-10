const Lesson = require("../models/lessons.model");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/datauri");

const addLesson = async (req, res) => {
  try {
    const courseId = req.params.id;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded",
        success: false,
      });
    }

    let uploadedLessons = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const status = req.body[`status${i}`] || "private";

      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "video",
      });

      const lesson = await Lesson.create({
        courseId,
        videoUrl: cloudResponse.secure_url,
        status,
        order: i + 1,
      });

      uploadedLessons.push(lesson);
    }

    return res.status(200).json({
      message: `Added ${uploadedLessons.length} lessons`,
      lessons: uploadedLessons,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Failed to add lessons",
      success: false,
    });
    // console.log(error);
  }
};

const courseLessons = async (req, res) => {
  try {
    const courseId = req.params.id;
    const lessons = await Lesson.find({ courseId });
    if (!lessons) {
      return res.status(400).json({
        message: "No Lesson for this course",
        success: false,
      });
    }
    const lessonLength = lessons.length;
    return res.status(200).json({
      lessons,
      lessonLength,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Unable to show lessons",
      success: false,
    });
  }
};

module.exports = { addLesson, courseLessons };
