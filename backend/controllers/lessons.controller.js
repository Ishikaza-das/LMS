const Lesson = require("../models/lessons.model");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/datauri");

const addLesson = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files were uploaded",
        success: false
      });
    }

    const courseId = req.params.id;
    const uploadedLessons = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const status = req.body[`status${i}`] || 'private';

      try {
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
          resource_type: 'video'
        });

        const lesson = await Lesson.create({
          courseId,
          videoUrl: cloudResponse.secure_url,
          status,
          order: i + 1
        });

        uploadedLessons.push(lesson);
      } catch (uploadError) {
        console.error(`Error uploading file ${i}:`, uploadError);
      }
    }

    if (uploadedLessons.length === 0) {
      return res.status(400).json({
        message: "Failed to upload any lessons",
        success: false
      });
    }

    return res.status(200).json({
      message: `Successfully uploaded ${uploadedLessons.length} lessons`,
      lessons: uploadedLessons,
      success: true
    });

  } catch (error) {
    console.error('Lesson upload error:', error);
    return res.status(400).json({
      message: error.message || "Failed to add lesson",
      success: false
    });
  }
};

const courseLessons = async(req,res) => {
  try {
    const courseId = req.params.id;
    const lessons = await Lesson.find({courseId});
    if(!lessons){
      return res.status(400).json({
        message:"No Lesson for this course",
        success:false
      });
    }
    const lessonLength = lessons.length;
    return res.status(200).json({
      lessons,
      lessonLength,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message:"Unable to show lessons",
      success: false
    })
  }
}

module.exports = { addLesson, courseLessons };
