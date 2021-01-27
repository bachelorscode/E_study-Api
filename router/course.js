const express = require('express');
const Course =  require('../models/course');

const router = new express.Router();

router.post('/add/course',async(req,res)=>{
    try {
        const result = await Course.create(req.body);
        res.send(result);
    } catch (error) {
        res.status(400).send('err');
    }
})

router.post('/add/subCourse/:id',async(req,res)=>{
    try {
        const {title} = req.body;
        let single = await Course.findById(req.params.id);
        let r =await single.genrateTitle(title);
        res.status(201).send(r);
    } catch (error) {
        res.send(error);
    }
})

// To get all course
router.get('/courseAll/',async(req,res) => {
    console.log(req.body)
    try{
        const course =  await Course.find({}).populate('category video')
        res.status(200).send(course);
    }catch(e){
        res.status(400).send(e)
    }
});

// 

module.exports = router;