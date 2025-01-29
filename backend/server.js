const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
app.use(cors());
const dbConnect = require('./database');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files


const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.TOKEN_SECRET);

dbConnect(); 

const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes')

app.use('/api',blogRouter);
app.use('/api/users',userRouter);




app.listen(5000,()=>{
    console.log('server started');
})