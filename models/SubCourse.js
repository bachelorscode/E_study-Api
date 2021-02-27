const mongoose = require('mongoose');

const SubCourseSchema = mongoose.Schema({
    courseId:{
        type:String
    },
    videoTitle:{
        type:String
    },
    videThumbNail:{
        type:String
    },
    videoPath:{
        type:String
    },
    videoDuration:{
        type:String,
    },
})

const SubCourse = mongoose.model('SubCourse',SubCourseSchema);
module.exports = SubCourse;