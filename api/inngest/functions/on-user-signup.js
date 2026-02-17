const {inngest} =require( '../client.js');
const {User} =require ('../../model/User.js');
const { NonRetriableError } =require('inngest');
const { sendMail } =require( '../../utils/mailer');

exports.onUserSignUp=inngest.createFunction(
    {id: "on-user-Signup",retries:2},
    {event: "user/signup"},
    async({event,step})=>{
            const{email}=event.data;
            const user= await step.run("get-user-from-email",async()=>{
              const userDoc= await User.findOne({
                    email
                })
                if(!userDoc){
                    throw new NonRetriableError("User not found");
                }
                return userDoc;
            })
            await step.run("send-welcome-mail",async()=>{
                const subject="Welcome to the app";
                const text=`Hii, \n\n Thanks for signing up. We are glad to have you onboard`;
                const to=user.email;
                await sendMail(to,subject,text);
            })
            return{success:true};
    }
)