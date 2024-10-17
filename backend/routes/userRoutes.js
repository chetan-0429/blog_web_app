const express = require('express');
const { createUser, login, checkToken } = require('../controllers/userControllers');
const { authentication } = require('../action');
const router = express.Router();


router.post('/signup',createUser);
router.post('/login',login);
router.get('/checkToken',authentication,checkToken);

router.get('/protected',authentication,(req,res)=>{
    console.log('protected',req.user);
    res.send('protected')
})

module.exports = router;