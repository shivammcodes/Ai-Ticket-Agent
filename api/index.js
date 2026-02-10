require('dotenv').config()
const mongoose=require('mongoose');
const express=require('express');
const app=express();
const controller=require('../api/controller/index.js');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const authentication=require('./auth/index.js');
const {auth}=authentication;


// middlewares


app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.post('/signup',controller.userSignup);
app.post('/login',controller.userLogin);
app.post('/logout',auth,controller.userLogout);


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
        console.log("MongoDb Connected");
        app.listen(8080)
})
.catch((err)=>{console.log("Mongo Db error :",err)});