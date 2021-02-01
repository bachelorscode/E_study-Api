const express = require('express');
const Course = require('../models/course');

const router = new express.Router();


const form = `<form method="post" action="/category"> 
 <input name="categoryName" type="text" />
  <button> submit </button> </form>`

router.get('/', async (req, res) => {


    const data = await Course.find({}).populate('category')

    res.send(data)

})


router.post('/add/course', async (req, res) => {
    try {
        console.log(req.body)

        const result = await Course.create(req.body)

        res.send();
    } catch (error) {
        res.status(400).send(error.messsage);
    }
})

router.patch('/:courseId', async (req, res) => {

    try {
        // const subCourse = [{ title: "from api", videos: [{ title: "api video title", url: "api video url" }] }]
        const { subCourse } = req.body

        const course = await Course.findById(req.params.courseId)
        const sub = [...course.subCourse, ...subCourse]
        course.subCourse = sub
        await course.save()
        res.send(course)

    } catch (error) {
        res.status(400).send(error.messsage)
    }

})


router.post('/add/subCourse/:id', async (req, res) => {
    try {
        const { title } = req.body;
        let single = await Course.findById(req.params.id);
        let r = await single.genrateTitle(title);
        res.status(201).send(r);
    } catch (error) {
        res.send(error);
    }
})

// To get all course
router.get('/courseAll', async (req, res) => {
    console.log(req.body)
    try {
        const course = await Course.find({}).populate('category video')
        res.status(200).send(course);
    } catch (e) {
        res.status(400).send(e)
    }
});

// 

module.exports = router;