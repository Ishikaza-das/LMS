const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:String, required: true},
    level:{type:String, enum:['beginner','intermediate','advance'],required:true},
    thumbnail:{type:String, default:''},
    instructor:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    lessons:[{type:mongoose.Schema.Types.ObjectId, ref:'Lessons'}],
    studentsEnrolled:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}]
},{timestamps:true});

module.exports = mongoose.model('Course',courseSchema);