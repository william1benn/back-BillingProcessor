const jwt = require('jsonwebtoken');


module.exports = function(req,res,next){
//Get token from header
 const token = req.header('x-auth-token');

 //check in not token

 if(!token){
   return res.json({msg:'No Token, denied'});

 }

 try{
   const decoded = jwt.verify(token,"secretCode");

   req.user = decoded.user;

   next();
 }catch(error){
   res.json({msg:"No valid token found"});

 }
}
