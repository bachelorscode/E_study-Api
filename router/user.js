const {Router} =  require('express');
const User =  require('../models/user');
const isAuthenticated =  require('../middleware/isAuth')

const router =  new Router();

// For creating new user
router.post('/',async(req,res) => {
    const user = new User(req.body);
    console.log(req.body);
    try{
        
        await user.save()
        const token =  await user.generateAuthToken();
        console.log(user);
        res.status(201).send({user,token})
    }catch(err){
        res.status(400).send(err)
        console.log(err)
    }
})



// For login user 

router.post('/login',async(req,res) => {
    try{
        console.log(req.body);
        const user =  await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({
            user,token
        })
    }catch(err){
        console.log(err);
        res.status(400).send('err occur')
    }
})

router.post('/logout',isAuthenticated,async(req,res) => {
    try{
        req.user.token =  req.user.tokens.filter(token => {
            return token.token !== req.token
        })

        await req.usere.save();
        res.send({msg:"Successfully logout"})
    }catch(err){
        res.status(500).send()
    }
})

module.exports =  router;