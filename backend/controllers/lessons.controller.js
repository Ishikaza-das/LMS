const Lesson = require("../models/lessons.model");
const Course = require("../models/course.model");

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


module.exports = {addLesson}