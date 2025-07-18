const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    questions:[
        {
            question:{type:String, required:true},
            options:{
                type:[String],
                required: true,
                validate:{
                    validator: function(arr) {
                        return arr.length >= 2;
                    }
                }
            },
            correctAnswer:{
                type:String, 
                required:true,
                validate:{
                    validator: function(val){
                        return this.options.includes(val);
                    }
                }
            }
        }
    ]
});

module.exports = mongoose.model('Quizzes', quizSchema);