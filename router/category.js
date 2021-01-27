const express = require('express');

const Category =  require('../models/category');

const router =  new express.Router();


// For creating the category

router.post('/',async(req,res) =>{
    try{
        console.log(req.body);
        const category =  new Category(req.body);
        await category.save();
        res.status(201).send(category);
    }catch(e){
        res.status(400).send(e);
    }
});


// To get all category

router.get('/allCategory',async(req,res) => {
    try{
        const allCategory = await Category.find({});
        res.send(allCategory);

    }catch(e){
        res.send(e);
    }
})

// To get Category by id

router.get('/:id',async(req,res) => {
    const id =  req.params.id;
    try{
        const category =  await Category.findOne({_id:id})
        res.send(category);
  
    }catch(e){
        res.status(400).send('err')
    }
})

// To delete the single category

router.delete('/:id',async(req,res) => {
    const id =  req.params.id;
    try{
        const category =  await Category.findOneAndDelete({_id:id});
        if(!category){
            res.status(400).send('invalid id');
        }
        res.status(200).send(category)
    }catch(e){
        res.status(400).send('err')
    }
})



module.exports =  router;

