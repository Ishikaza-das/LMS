const Lesson = require("../models/lessons.model");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/datauri");

const addLesson = async (req, res) => {
  try {
    const {status} = req.body;
    courseId = req.params.id;
    let videoUrl = [];
    for (const files of req.files) {
      const fileUri = getDataUri(files);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      videoUrl.push(cloudResponse.secure_url);
    }
    let lesson = await Lesson.create({
      videoUrl: cloudResponse.secure_url,
      status,
      courseId,
    });

    return res.status(200).json({
      message: "Lesson Added",
      lesson,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to add lesson",
      success: false,
    });
  }
};

module.exports = { addLesson };
