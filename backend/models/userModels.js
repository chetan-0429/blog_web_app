const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        name:String,
        email:String,
        username:String,
        password:String,
})

const userModel = new mongoose.model('User',userSchema);

module.exports = userModel;