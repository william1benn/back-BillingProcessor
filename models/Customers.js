const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const CustomerSchema = new Schema({
  custid:String,
  name:String,
  email:String,
  line1:String,
  city:String,
  state:String,
  country:String,
  postal_code:String,
  description:String,
  balance:Number,

}, {
  timestamps: true
});

const Customers = mongoose.model("Customers", CustomerSchema);

module.exports = Customers;