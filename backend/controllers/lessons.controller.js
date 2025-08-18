const Lesson = require("../models/lessons.model");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/datauri");
const Course = require("../models/course.model");

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
      const title = req.body[`title${i}`] || `Lesson ${i + 1}`;

      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "video",
      });

      const lesson = await Lesson.create({
        courseId,
        title, 
        videoUrl: cloudResponse.secure_url,
        status,
        order: i + 1,
      });

      uploadedLessons.push(lesson);

      await Course.findByIdAndUpdate(courseId, { $push: { lessons: lesson._id } });
      await Course.findByIdAndUpdate(courseId, {status: "published"});
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
  }
};

const deleteLesson = async (req,res) => {
  try {
    const lessonId = req.params.id;
    const lesson = await Lesson.findByIdAndDelete(lessonId)
    if(!lesson){
      return res.status(400).json({
        message:"Lesson not found",
        success: false
      })
    }
    await Course.findByIdAndUpdate(lesson.courseId, {
      $pull :{lessons: lesson._id}
    })
    return res.status(200).json({
      message:"Lesson Deleted",
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message:error.message,
      success: false
    })
  }
}


module.exports = { addLesson, deleteLesson};
