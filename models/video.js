const {model,Schema} = require('mongoose');

const schema = new Schema({
    videoName:{
        type:String,
      
    },
    videoUrl:{
        type:String,
        
    },
},{
    timestamps:true
});

const Video  = model('Video',schema);
module.exports = Video;



