const { NonRetriableError } = require("inngest");
const Ticket = require("../../model/Ticket.js");
const Inngest=require("../client.js");
const { analyzeTicket } = require("../../utils/ai.js");
const {inngest}=Inngest;
const User =require ('../../model/User.js');
const { sendMail } =require('../../utils/mailer.js');


exports.onTicketCreated=inngest.createFunction(
    {id:"On-Ticket-Creation",retries:2},
    {event: "ticket/created"},
    async({event,step})=>{
        const{_id}=event.data;
        const ticket=await step.run("fetch-ticket",async()=>{
            const ticketDoc=await Ticket.findOne({_id});
            if(!ticketDoc){
                throw new NonRetriableError("Ticket not found in our database");
            }
            return ticketDoc;
        })

        const aiResponse=await analyzeTicket(ticket);
        if(!aiResponse){
            throw new NonRetriableError("Ai response is in invalid format");
        }

        // updating the ticket info after getting the response from the Ai
          const relatedSkills= await step.run("ticket-processing",async()=>{
            await Ticket.findByIdAndUpdate(ticket._id,{
                priority: aiResponse.priority,
                relatedSkills: aiResponse.relatedSkills,
                helpfulNotes: aiResponse.helpfulNotes,
                status: "In-Progress", 
            })
            return aiResponse.relatedSkills;
        })

        // Ticket assignment to the moderator

         const moderator=await step.run("Assignment of the ticket to the moderator",async()=>{
            let user= await User.findOne({
                role:"moderator",
                skills:{
                    $elemMatch:{
                        $regex: relatedSkills.join('|'),
                        $options: 'i'
                    }
                }
            });
            if(!user){
                user =await User.findOne({
                    role: "admin",
                })
            }
             if (!user) {
                throw new NonRetriableError("No moderator or admin found for assignment");
            }
            await Ticket.findByIdAndUpdate(ticket._id,{
                assignedTo: user?._id || null
            })
            return user
         })

         // Send the mail to the moderator

         await step.run("send the mail to the moderator",async()=>{
            const finalTicket=await Ticket.findById(ticket._id);
            await sendMail(
                moderator.email,
                "A ticket is assigned to you",
                finalTicket.title,
            )
         })
         return {success:true};
    }
)