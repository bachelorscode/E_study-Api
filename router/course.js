const express = require('express');
const Course =  require('../models/course');

const router = new express.Router();

router.post('/add/course',async(req,res)=>{
    try {
        if(req.files){
            const thumbnail = Date.now()+'imageA.jpg';
            const authImage = Date.now()+'imageB.jpg';
            req.files.thumbnail.mv('./public/'+thumbnail);
            req.files.autherImage.mv('./public/'+authImage);
            const thumbPath = 'public/'+thumbnail;
            const autherPath = 'public/'+authImage;
            req.body.authorImage = autherPath;
            req.body.thumbnail = thumbPath;
            const result = await Course.create(req.body);
            res.send(result);
        }
    } catch (error) {
        res.status(400).send(error);
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