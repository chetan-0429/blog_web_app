const mongoose = require('mongoose');

const uri = 'mongodb+srv://cc11:cartel123@cluster0.n89ptag.mongodb.net/blogs_db?retryWrites=true&w=majority&appName=Cluster0/blogs_db'

const dbConnect = async()=>{
    try{
        await mongoose.connect(uri);
        console.log('connected to db');
    }
    catch(err){
        console.log('error in db conecting',err);
    }
}

module.exports = dbConnect;