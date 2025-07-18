const mongoose = require('mongoose');

const progressSchema = mongoose.Schema({
   userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required: true},
   courseId:{type:mongoose.Schema.Types.ObjectId, ref:'Course', required:true},
   completedLessons:[{type:mongoose.Schema.Types.ObjectId, ref:'Lesson'}]
},{timestamps:true});

module.exports = mongoose.model('Progress',progressSchema);