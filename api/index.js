require('dotenv').config()
const mongoose=require('mongoose');
const express=require('express');
const app=express();
const controller=require('../api/controller/index.js');
const cors=require('cors');

// middlewares
app.use(express.json());
app.use(cors());


app.post('/signup',controller.userSignup)

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
        console.log("MongoDb Connected");
        app.listen(8080)
})
.catch((err)=>{console.log("Mongo Db error :",err)});