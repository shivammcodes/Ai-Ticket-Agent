const mongoose=require('mongoose');
const{Schema,model}=mongoose;

const userSchema=new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: "user",
        enum: ["user","moderator","admin"]
    },
    skills:[String],
},
{timestamps:true}
)


model.exports=model("User",userSchema);