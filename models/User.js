const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const UserSchema = new Schema({

  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  //Api Key
  apiKey:String,
  apiSecret:String,

});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;