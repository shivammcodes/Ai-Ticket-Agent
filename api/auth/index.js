const jwt=require('jsonwebtoken');

exports.auth=(req,res,next)=>{
    const{token}=req.cookies;
    if(!token){
       return res.status(401).json({error:["You are not autohrized"]});
    }
    jwt.verify(token,process.env.JWT_SECRET,(error,decoded)=>{
        if(error){
        return res.status(401).json({error:["Cant verify the cookie"]});
        }
        req.user=decoded;
        next();
    })
}