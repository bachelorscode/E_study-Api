const jwt =  require('jsonwebtoken');
const  User =  require('../models/user');
const {disconnect} =  require('mongoose');

module.exports =  async(req,res,next) => {
    try{
        const token =  req.header('Authorization').replace('Bearer ','')
        const decoded =  jwt.verify(token,'thisismyapp')
        
        const user = await User.findOne({
        _id:decoded._id,'tokens.token':token
        })

        if(!user){
            return res.status(404).send({
                error:"No user is  found"
            })
        }

        req.token =  token
        req.user = user
        next();
    }catch(err){
        res.status(401).send({error})
    }
}