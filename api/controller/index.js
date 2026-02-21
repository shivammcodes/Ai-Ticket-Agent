const bcrypt=require('bcrypt');
const User=require('../model/User.js');
const jwt=require('jsonwebtoken');
const Inngest=require("../inngest/client.js");
const Ticket = require('../model/Ticket.js');
const {inngest}=Inngest;


exports.userSignup=async(req,res)=>{
    try{
     const{email,password}=req.body;
     if(!email || !password){
        return res.status(401).json({error:["Both the fields are required"]});
     }
     const saltRounds=10;
     const hashedPassword=await bcrypt.hash(password,saltRounds);
     const userDoc=await User.create({
        email,
        password:hashedPassword
     })
     await inngest.send({
        name: "user/signup",
        data: {
            email
        }
     })
     res.status(201).json({data:{_id:userDoc._id,email: userDoc.email},msg:["User Created Successfully"]}); 
    }


    catch(error){
        console.log(error);
        const err=[];
        if(error.name=="ValidationError"){
            for(let key in error.errors){
                err.push(error.errors[key].message);
            }
            return res.status(400).json({error:err});
        }
        else if(error.code==11000){
               err.push("User already present");
               return res.status(400).json({error:err});
        }
        else{
            err.push("Something went wrong");                    
            return res.status(400).json({error:err});

        }
    }
}



exports.userLogin=async(req,res)=>{
    try{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({error:["Both the fields are required"]});
    }
    const user=await User.findOne({email});
    if(!user){
       return  res.status(400).json({error:["User not found"]});
    }
    const isUser=await bcrypt.compare(password,user.password);
    if(!isUser){
      return res.status(400).json({error:["Invalid credentials entered"]});
    }
    jwt.sign({email,_id:user._id,role:user.role},process.env.JWT_SECRET,{},(err,token)=>{
        if(err){
            return res.status(400).json({error:["Cant create a token for user"]});
        }
        res.cookie('token',token).json({msg: ["User login successfull"],user:{email:user.email,_id:user._id}});
    });
    }
    catch(error){
         res.status(500).json({ error: ["Something went wrong"] });
    }
}

exports.checkUser=async(req,res)=>{
    try{
        const{email}=req.user;
        const user=await User.findOne({email});
        res.json({email:user.email,_id:user._id});
    }
    catch(error){
        res.status(400).json({error:["Something went wrong"]});
    }
}

exports.userLogout=async(req,res)=>{
    res.clearCookie("token").json({msg:["User successfully logged out"]});
}


exports.updateUser=async(req,res)=>{
    try{
        const {role}= req.user;
        const {skills}=req.body;
    if(role!=='admin'){
        return res.status(403).json({error:["only admin has the access"]});
    }
    const user= await User.findOne({
        email:req.body.email
    })
    if(!user){
        return res.status(404).json({error:["User not found"]});
    }
    const updatedUser=await User.updateOne({email:user.email},{
        role: req.body.role,
        skills: skills && skills.length>0 ? skills : user.skills 
    })
    res.json({msg:["User Successfully updated"]});
    }
    catch(error){
        res.status(500).json({error: ["User update failed"]});
    }
}


exports.getUsers=async(req,res)=>{
    try{
        const{role}=req.user;
        if(role!=='admin'){
            return res.status(403).json({error:["Only admins is alowed"]});
        }
        const users=await User.find().select("-password");
        res.json({users});
    }
    catch(error){
        res.status(500).json({error:["Failed to fetch users"]});
    }
}




exports.createTicket=async(req,res)=>{
    try{
        const{title,description}=req.body;
        if(!title || !description){
            return res.status(400).json({error:["Both the fields are required"]});
        }
        const ticketDoc=await Ticket.create({
            title,
            description,
            createdBy: req.user._id
        })
        const{_id}=ticketDoc
        await inngest.send({
            name: "ticket/created",
            data:{
                _id
            }
        })
        res.json({data:ticketDoc,msg:["Ticket successfully created"]});
    }
    catch(error){
        res.status(500).json({error:["Ticket Creation falied"]});
    }
}

exports.getTickets=async(req,res)=>{
    try{
        const{role,_id}=req.user;
        let tickets;
        if(role=="user"){
            tickets=await Ticket.find({createdBy:_id}).select("title description status createdAt").sort({createdAt: -1});
        }
        else{
            tickets =await Ticket.find().populate("assignedTo",["_id","email"]).sort({createdAt:-1});
        }
        if(tickets.length==0){
           return res.status(404).json({error:["No Tickets were found"]});
        }
        res.json({data: tickets});

    }
    catch(error){
        res.status(400).json({error:["Failed to load tickets"]});
    }
}


exports.getTicket=async(req,res)=>{
    try{
        const {id}=req.params;
        const {role}=req.user;
        let ticket;
        if(role=='user'){
            ticket = await Ticket.findOne({createdBy: req.user._id, _id: id}).select("title description status createdAt");
        }
        else{
            ticket= await Ticket.findById(id).populate("assignedTo",["_id","email"]);
        }
        if (!ticket) {
            return res.status(404).json({ error: ["Ticket not found"] });
        }
        res.json({data:ticket});
    }
    catch(error){
        res.status(500).json({error:["Failed to fetch the ticket"]});
    }
}