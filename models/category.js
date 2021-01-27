const {model,Schema} = require('mongoose');


const schema  = new Schema({
    categoryName:{
        type:String,
        required:true
    }
});

const Category =  model('Category',schema);
module.exports = Category;