require('dotenv').config()
require('./utils/ai.js')
const mongoose=require('mongoose');
const express=require('express');
const app=express();
const controller=require('../api/controller/index.js');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const authentication=require('./auth/index.js');
const {auth}=authentication;
const{inngest}=require('./inngest/client.js');
const{serve}=require('inngest/express');
const{onTicketCreated}=require('./inngest/functions/on-ticket-created.js');
const{onUserSignUp}=require('./inngest/functions/on-user-signup.js');
// middlewares


app.use(express.json());
app.use(cors({origin: "http://localhost:5173", credentials:true}));
app.use(cookieParser());
app.use('api/inngest',serve({
        client: inngest,
        functions:[onTicketCreated,onUserSignUp]
}))

app.post('/signup',controller.userSignup);
app.post('/login',controller.userLogin);
app.post('/logout',auth,controller.userLogout);
app.post('/updateUser',auth,controller.updateUser);
app.get('/getUsers',auth,controller.getUsers);
app.post('/createTicket',auth,controller.createTicket);
app.get('/getTickets',auth,controller.getTickets);
app.get('/tickets/:id',auth,controller.getTicket);


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
        console.log("MongoDb Connected");
        app.listen(8080)
})
.catch((err)=>{console.log("Mongo Db error :",err)});

