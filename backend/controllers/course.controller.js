const Course = require('../models/course.model');

const createCourse = async (req,res) => {
    try {
    const {title, description, price, category, level, thumbnail} = req.body;
    const userId = req.id;

    if(!title || !description || !price || !category || !level){
        return res.status(400).json({
            message:"Something is missing",
            success: false
        })
    }

    let course = await Course.findOne ({title: title});
    if(course){
        return res.status(400).json({
            message:"You can't register same course",
            success: false
        })
    }

    course = await Course.create({
        title,
        description,
        price,
        category,
        level,
        thumbnail,
        instructor: userId
    }) 
    return res.status(201).json({
        message:"New course created successfully",
        course,
        success: true
    })  
    } catch (error) {
        return res.status(400).json({
            message:error.message,
            success:false
        });
    }
}

const getAllCourse = async (req,res) => {
    try {
        const course = await Course.find().populate({
            path:"instructor",
            select:"fullname"
        }).sort({createdAt: -1});
        if(!course){
            return res.status(400).json({
                message:"Course not found"
            })
        }
        return res.status(200).json({
            course,
            success:true
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message,
            success: false
        })
    }
}

const getInstructorCourse = async (req,res) => {
    try {
        const userId = req.id;
        const course = await Course.find({instructor: userId})
        if(!course || course.length === 0){
            return res.status(400).json({
                message:"No courses found for this instructor"
            });
        }
        return res.status(200).json({
            course,
            success:true
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message,
            success: false
        })
    }
}

const getCourseById = async (req,res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId).populate({
            path:"lessons",
            path:"studentsEnrolled"
        })
        if(!course){
            return res.status(400).json({
                message:"Course not found",
                success:false
            })
        }
        return res.status(200).json({
            course,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message:error,message,
            success:false
        })
    }
}

const updateCourse = async (req,res) =>{
    try {
        const {title, description, price, category, level, thumbnail} = req.body;
        
        const update = {title, description, price, category, level, thumbnail};
        const course = await Course.findByIdAndUpdate(req.params.id,update,{new: true});

        if(!course){
            return res.status(400).json({
                message: "Course not found",
                success:true
            })
        }
        return res.status(200).json({
            message:"Course updated.",
            course,
            success: false
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message,
            success:false
        })
    }
}

const deleteCourse = async (req,res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findByIdAndDelete(courseId);
        if(!course){
            return res.status(400).json({
                message:"Course not found",
                success:true
            })
        } 
        return res.status(200).json({
            message:"Course Deleted successfully",
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

module.exports = {createCourse, getAllCourse, getInstructorCourse, getCourseById, updateCourse, deleteCourse};