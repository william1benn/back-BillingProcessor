const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
//const {check, validationResult } = require('express-validator/check');

router.post('/register', async (req,res,user)=>{

  const { name, email, password } = req.body;

  try{
    let user = await User.findOne({email:email});
    if(user){
      return res.status(400).json({msg:"User Email Already Exists"})
    }

    user = new User({
      name:name,
      email:email,
      password:password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password,salt);

    await user.save();

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

  }catch (error){

    res.json(error)

  }
});


module.exports = router;