const User = require('../models/userModels')
const {createToken} = require('../action');

async function createUser(req,res,next) {
    const {name,username,email,password} = req.body;
    console.log(req.body);
    try{
        const userPresent = await User.findOne({username})
        if(userPresent){
            return res.json({success:false,message:"user already present with this username"});
        }
        const newUser = new User({
            name,
            username,
            email,
            password,
        })
        const saved = await newUser.save();
        const user = {id:saved._id,username:saved.username};
        const token = createToken(user);
     res.status(201).json({success:true,token,message:"user created",saved});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false})
    }
}

async function login(req,res,next) {
    const {username,email,password} = req.body;
    console.log(req.body);
    try{
        const user =await User.findOne({username,password});
        if(!user) return res.status(401).json({success:false,message:"user not present"});
        const token = createToken({id:user._id,username:user.username});
        const userInfo = {username:user.username,name:user.name,email:user.email,images:user.images}
        res.status(200).json({success:true,token,user:userInfo});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,})
    }
}
async function checkToken(req,res,next) {
    console.log('check for token')
    const {id} = req.user;
    try{
        const user =await User.findOne({_id:id});
        console.log('user: ',user)
        if(!user){
            return res.status(400).json({success:false});
        }
        const userInfo = {name:user.name,username:user.username,email:user.email};
        res.status(200).json({success:true,message:"valid token",user:userInfo});
    }catch(err){
        
    }
}

module.exports = {createUser,login,checkToken};