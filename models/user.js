const {model,Schema} =  require('mongoose');
const bcrypt =  require('bcrypt');
const jwt =  require('jsonwebtoken');


const schema =  new Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        minlength:5,
        trim:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    
},{
    timestamps:true
});


schema.methods.toJSON =  function(){
    const user =  this;
    const userObject =  user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject;
}

// Generate auth tokens
schema.methods.generateAuthToken =  async function(){
    const user = this
    const token =  jwt.sign({_id:user._id.toString()},'thisismyapp')
    user.tokens = user.tokens.concat({token})

    await user.save()
console.log('inside this method')
    return token;

}


// Finding user by email and password
schema.statics.findByCredentials =  async(email,password) => {
    const user = await User.findOne({email});

    if(!user){
        console.log('Not found');
        throw new Error('unable to login')
    }

    const isMatch =  await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('unble to login');
    }

    return user;

}

// Hashing the password

schema.pre('save',async function(next){
    const user =  this;
    if(user.isModified('password')){
        user.password =  await bcrypt.hash(user.password,8)
    }
    next();
})

const User = model('User',schema);

module.exports =  User;
