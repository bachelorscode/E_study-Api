const router = require('express').Router()
const Quiz =  require('../models/Quiz');


router.post('/',async(req,res) => {
    try{
        console.log(req.body);
        const result = await Quiz.create(req.body);
        if(!result){
            res.send('sala thik se bhejo');
        }
        res.status(201).send(result);
    }catch(e){
        res.status(400).send(e.message);
    }
});


router.patch('/:quizId',async(req,res) => {
    try {
        console.log(req.params);
        const {quizId} = req.params;
        const quiz =  await Quiz.findById(quizId);

        quiz.questions = [...quiz.questions, ...req.body.questions];

        await quiz.save()

        res.send(quiz)

    } catch (error) {
        res.send(error);        
    }
})

router.get('/',async(req,res) => {
    try{
        const result = await Quiz.find({});

        res.status(200).send(result);
    }catch(e){
        res.status(400).send(e.message);
    }
});

module.exports = router;