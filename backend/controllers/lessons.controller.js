const Lesson = require("../models/lessons.model");
const Course = require("../models/course.model");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");

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
      courseId,
    });

    await Course.findByIdAndUpdate(courseId, {
      $push: { lessons: lesson._id },
    });

    return res.status(200).json({
      message: "Lesson created",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const courseId = req.params.id;

    let lesson = await Lesson.findByIdAndDelete(lessonId);
    if (!lesson) {
      return res.status(400).json({
        message: "Lesson not found",
        success: false,
      });
    }

    await Course.findByIdAndUpdate(courseId, {
      $pull: { lessons: lesson._id },
    });

    return res.status(200).json({
      message: "Lesson delete",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

// const updateLesson = async (req, res) => {
//   try {
//     const { courseId, lessonId } = req.params;
//     const file = req.file;
//     const { title, status } = req.body;

//     let updateData = {};
//     if (title) updateData.title = title;
//     if (status) updateData.status = status;
//     if (file) {
//       const fileUri = getDataUri(file);
//       const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
//         resource_type: "video",
//       });
//       updateData.videoUrl = cloudResponse.secure_url;
//     }

//     const lesson = await Lesson.findByIdAndUpdate(lessonId, updateData, {
//       new: true,
//     });

//     if (file) {
//       await Course.findByIdAndUpdate(courseId, {
//         status: "published",
//       });
//     }

//     console.log("REQ BODY:", req.body);
//     console.log("REQ FILE:", req.file);
//     console.log("PARAMS:", req.params);
//     console.log("UPDATE DATA", updateData)

//     return res.status(200).json({
//       message: "Lecture uploaded",
//       lesson,
//       success: true,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

const updateLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const file = req.file;
    const { title, status } = req.body;

    let updateData = {};
    if (title) updateData.title = title;
    if (status) updateData.status = status;

    if (file) {
      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "video" }, 
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          streamifier.createReadStream(file.buffer).pipe(stream);
        });
      };

      const cloudResponse = await uploadToCloudinary();
      updateData.videoUrl = cloudResponse.secure_url;
    }

    const lesson = await Lesson.findByIdAndUpdate(lessonId, updateData, {
      new: true,
    });

    if (file) {
      await Course.findByIdAndUpdate(courseId, { status: "published" });
    }

    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file?.originalname);
    console.log("PARAMS:", req.params);
    console.log("UPDATE DATA", updateData);

    return res.status(200).json({
      message: "Lecture uploaded",
      lesson,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getLessonCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    if (!courseId) {
      return res.status(400).json({
        message: "Unable to fecth lesson",
        success: false,
      });
    }
    const lesson = await Lesson.find({ courseId: courseId });

    return res.status(200).json({
      lesson,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getLessonById = async (req, res) => {
  try {
    const lessonId = req.params.id;
    if (!lessonId) {
      return res.status(400).json({
        message: "No Lesson found",
        success: false,
      });
    }
    const singleLesson = await Lesson.findById(lessonId);
    return res.status(200).json({
      message: "Lesson found",
      singleLesson,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Unable to fetch lesson",
      success: false,
    });
  }
};

module.exports = {
  addLesson,
  deleteLesson,
  updateLesson,
  getLessonCourse,
  getLessonById,
};
