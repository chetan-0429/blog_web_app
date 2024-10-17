const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
        name:String,
        description:String,
        images:String,
        likes:{
            type:Number,
            default:0
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users",
            // required:true
        },
        ownerName:{
            type:String,
            default:"Chetan"
        },
        createdAt: {
            type: Date,
            default: Date.now
          }
})

const blogModel = new mongoose.model('Blog',blogSchema);

module.exports = blogModel;