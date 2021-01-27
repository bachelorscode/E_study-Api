const Course  = require('./models/course')
const Category = require('./models/category')
const Video    = require('./models/video')

async function createCourse () {
  try {
    const course = await Course.create({})
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

createVideo();


 