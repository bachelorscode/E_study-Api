const express = require('express');
const Course =  require('../models/course');
const SubCourse = require('../models/SubCourse');

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
        if(req.files){
            const ver = Course.findById(req.params.id);
            if(ver){
                const {title} = req.body;
                req.files.videThumbNail.mv('./public/'+title+'thubNail.jpg');
                req.files.video.mv('./public/'+title+'vName.mp4');
                const tPath = 'public/'+title+'thubNail.jpg';
                const vPath = 'public/'+title+'vName.mp4';
                const subCourse = new SubCourse();
                subCourse.videThumbNail = tPath;
                subCourse.videoPath = vPath;
                subCourse.videoTitle = title;
                subCourse.courseId = req.params.id;
                await subCourse.save();
                res.status(200).send({subCourse});
            }else{
                res.status(404).send({msg:"Course Not Found"});
            }
        }
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

router.get('/getSubCourse/:id',async(req,res)=>{
    try {
        var res = await SubCourse.find({courseId:req.params.id});
        res.status(200).send({data:res});
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports = router;