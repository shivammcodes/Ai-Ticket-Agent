require("dotenv").config();
const {createAgent,gemini} =require("@inngest/agent-kit");
const{ValidateRepsonse}= require('./validation');
exports.analyzeTicket= async(ticket)=>{
    const ticketAgent=createAgent({
        name: "Ai-Ticketing triage system",
        model: gemini({
            model: "gemini-2.5-flash",
            apiKey: process.env.GEMINI_API_KEY
        }),
        system: `You are an ai ticketing agent whose work is to process the ticket that the user will provide, the ticket will have info such as title and description your work is to -
        1.) Summarize the issue 
        2.) Estimate its priority
        3.) provide with the helpful notes
        4.) List the technical skills required

        Note- 
        1.) Make sure to respond in only raw json object
        2.) Do not include any markdown or fences
        3.) make sure the response is only in raw json i repeat only in raw json 
        4.) Dont include any extra space, formatting or any comments
        5.) Give response in this format -
        {
           response
        }
        
        Important Note-
        If the user enters some improper details or under sufficiant inforamtion you dont cross question and reply according your own wish
        `
    })

    const response =await ticketAgent.run(
        `
        You are an ai ticketing agent whose work is to process the ticket that the user will provide, the ticket will have info such as title and description your work is to -
        1.) Summarize the issue 
        2.) Estimate its priority
        3.) provide with the helpful notes
        4.) List the technical skills required

        Note- 
        1.) Make sure to respond in only raw json object
        2.) Do not include any markdown or fences
        3.) make sure the response is only in raw json i repeat only in raw json 
        4.) Dont include any extra space, formatting or any comments
        5.) Give response in this format -
        {
            summary: string,
            priority: low || medium || high,
            helpfulNotes: string,
            relatedSkills:[React,nodeJs etc]
        }
            generate response from - 
            title:${ticket.title}
            description:${ticket.description}
        `
    )
    let raw;
    try{
     raw=JSON.parse(response.output[0].content);
    }
    catch(error){
        throw new Error("Invalid Json Data from AI");
    }
    const aiResponse=ValidateRepsonse(raw);
    return aiResponse;
}