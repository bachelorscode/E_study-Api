const express = require('express');
const mongoose = require('mongoose');
const cors =  require('cors');
const upload = require('express-fileupload');
const app =  express();

app.use(upload());
app.use(cors());
app.use(express.json());
app.use('/public',express.static('public'));
const port =  process.env.PORT || 3000;
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost/E_study';


// database connection
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

const db =  mongoose.connection

db.on('error',console.error.bind(console, 'connection error:'));
db.once('open',function(){
    console.log('database connected');
})

// routers
const userRouter = require('./router/user')
const categoryRouter =  require('./router/category');
const courseRouter = require('./router/course');

app.use('/category',categoryRouter);
app.use('/users',userRouter);
app.use('/course',courseRouter);


const Course  = require('./models/course')
const Category = require('./models/category')
const Video    = require('./models/video')

async function createCourse () {
  try {
      const course = await Course.create({ courseName: "gaurav course", description: "pankaj course is going on", author: "gaurav one", authorImage: "fucking iamge", thumbnail: "sfds", subCourse: [{ title: "something title", videos: [{ video: "60104e4f6a400b28c43bfd31" }]},{
        title:"another one",videos:[
          {
            video:"60104e4f6a400b28c43bfd31"
          }
        ]
      }], category: "60104e7bcc4ea738682c226e" })
    console.log(course)
  } catch (error) {
  }
} 

const createCategory = async () => {
  try {
    const category = await  Category.create({categoryName: 'pankaj'})
    console.log(category)
  } catch (error) {
    console.log(error.message)
  }
}

const createVideo = async () => {
  try {
    const video = await Video.create({videoName: "first video", videoUrl: "https://www.youtube.com/watch?v=1SYU1GorO6Y&t=1148s"})
    console.log(video)
  } catch (error) {
    console.log(video)
  }
}



app.get('/test', async (req,res) => {
    
    try{
      const result =  await Course.findOne({category:"60104e7bcc4ea738682c226e"});
      res.send(result);
    }catch(e){
      console.log(e);
    }
    
   

})




// createCourse();
app.listen(port,() => {
    console.log(`${port} port is running`);
})