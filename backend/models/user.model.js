const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required: true},
    profilephoto:{type:String, default:''},
    role:{type:String, enum:['student','instructor'], required: true},
    enrolledCourses:{type:mongoose.Schema.Types.ObjectId, ref:'Course'}
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);