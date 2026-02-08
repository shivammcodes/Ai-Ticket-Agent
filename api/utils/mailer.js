require('dotenv').config()
const nodemailer=require('nodemailer');
export const sendMail=async (to,subject,text)=>{
  try{
    const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_SMTP_HOST,
  port: process.env.MAILTRAP_SMTP_PORT,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.MAILTRAP_SMTP_USER,
    pass: process.env.MAILTRAP_SMTP_PASS,
  },
});

const info= await transporter.sendMail({
    from: "Ai-Assign",
    to,
    subject,
    text,
  });
  }
  catch(err){
    console.log(err);
    throw err;
  }
}