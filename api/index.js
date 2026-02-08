require('dotenv').config()
const mongoose=require('mongoose');
const express=require('express');
const app=express();

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
        console.log("MongoDb Connected");
        app.listen(8080)
})
.catch((err)=>{console.log("Mongo Db error :",err)});