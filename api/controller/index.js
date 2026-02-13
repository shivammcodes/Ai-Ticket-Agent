const bcrypt=require('bcrypt');
const User=require('../model/User.js');
const jwt=require('jsonwebtoken');
const Inngest=require("../inngest/client.js");
const {inngest}=Inngest;


exports.userSignup=async(req,res)=>{
    try{
     const {email,password}=req.body;
     if(!email || !password){
        return res.status(401).json({error:["Both the fields are required"]});
     }
     const saltRounds=10;
     const hashedPassword=await bcrypt.hash(password,saltRounds);
     const userDoc=await User.create({
        email,
        password:hashedPassword
     })
     inngest.send({
        name: "user/signup",
        data: {
            email
        }
     })
     res.status(201).json({data:userDoc});
    }


    catch(error){
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
        res.cookie('token',token).json({msg: ["User login successfull"]});
    });
    }
    catch(error){
         res.status(500).json({ error: ["Something went wrong"] });
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


