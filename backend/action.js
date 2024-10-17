const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function createToken(user){
  const token =  jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn:'2h'})
  return token;
}

function authentication(req,res,next){
    const authHeader = req.headers['authorization'];
    if(!authHeader) res.status(401).json({success:false,message:"not authenticate"});
    const token = authHeader.split(' ')[1];
    jwt.verify(token,process.env.TOKEN_SECRET,(err,user)=>{
        if(err) return res.status(401).json({success:false,message:"not authenticate"});
        req.user = user;
        console.log('req.user : ',user);
        next();
    });
}

module.exports = {createToken,authentication}