const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');
//const {check, validationResult } = require('express-validator/check');


//Testing for token and correct user

router.get('/',auth,async(req,res,next)=>{
  try{
const user = await User.findById(req.user.id).select('-password')//removes password form res
res.json(user);

}catch (error){
  res.json({msg:"Re-Check configs Error auth"})

  }
});



router.post('/login', async (req,res,next)=>{

const {email, password} = req.body;

try{
  let user = await User.findOne({email});

  if(!user){
    return res.json({msg:"Invalid"})
  }

  const isMatch = await bcrypt.compare(password,user.password);

  if(!isMatch){
    return res.json({msg:"Incorrect Password"});
  }

  const payload = {
    user:{
      id:user.id
    }
  }

  jwt.sign(payload,"secretCode",{
    expiresIn: 3600
  },(err,token)=>{
    if(err) throw err
     
    res.json({token})

  });

}catch(error){
res.json(error)
}

});

router.post("/",(req,res,next)=>{
  res.send('logged in')
})


module.exports = router;

