const mongoose=require('mongoose');
const{Schema,model}=mongoose;

const ticketSchema=new Schema({
    title: String,
    description: String,
    status: {
        type: String,
        default: "TODO"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    assignedTo:{
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    priority: String,
    relatedSkills: [String],
    helpfulNotes: String
},{timestamps: true})


module.exports=model("Ticket",ticketSchema);