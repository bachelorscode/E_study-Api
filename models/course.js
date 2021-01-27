const {model,Schema} =require('mongoose');
const mongoose = require('mongoose')

const CourseSchmea = new Schema({
    courseName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true,
    },
    authorImage:{
        type:String
    },
    thumbnail:{
        type:String
    },
    subCourse: [{
            title: {
                type: String,
                required:true
            },

            // videos: [
            //     {
            //         videoTitle:String,
            //         video: {type: mongoose.Schema.Types.ObjectId, ref:"Video"}
            //     }
            // ]
        }],
    
        
   category : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
},{
    timestamps:true
});
CourseSchmea.methods.genrateTitle = async function (title){
    const single = this;
    single.subCourse = single.subCourse.concat({title});
    return single;
}
const Course =  model('Course',CourseSchmea);

module.exports = Course;
