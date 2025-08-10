const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
    courseId:{type:mongoose.Schema.Types.ObjectId, ref:'Course', required:true},
    title:{type:String, required:true},
    status:{type:String, enum:["public","private"], default:"private"},
    videoUrl:{type:String, required:true},
    order:{type:Number},
    quiz:{type:mongoose.Schema.Types.ObjectId, ref:'Quiz',default:null}
},{timestamps:true});

module.exports = mongoose.model('Lessons',lessonSchema);