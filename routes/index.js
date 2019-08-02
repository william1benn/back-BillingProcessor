const express = require('express');
const router  = express.Router();
const Customers = require('../models/Customers');
const jwt     = require('jsonwebtoken');
const auth = require('../middleware/auth');
const stripe = require("stripe")("sk_test_j8s4CsAyn22jIGhbjmVG0tqh00XkCOAEFx");



router.get('/balance',auth,(req, res, next) => {

  stripe.balance.retrieve(function(err, balance) {
    res.json(balance)
})
})

router.post('/addCustomer',(req,res,next)=>{

  stripe.customers.create({ 

    name:req.body.name,
    email:req.body.email,
    description:req.body.description,
    address:{
      line1: req.body.line1,
       city: req.body.city,
       country: req.body.country,
       postal_code: req.body.postal_code,
       state: req.body.state,
    },
    balance:req.body.balance,
  
  }, function(err,call){
    //Database Creation
    if(call){
      console.log(call)
      Customers.create({
        custid:call.id,
        name:call.name,
        email:call.email,
        line1:call.address.line1,
        city:call.address.city,
        state:call.address.state,
        country:call.address.country,
        postal_code:call.address.postal_code,
        description:call.description,
        balance:call.balance,
    }).then((xx)=>{
      res.json("Success")

    }).catch((error)=>{
     console.log(error)
    })

    if(err){
      res.json(err)
    }
}
  })

})



//All customers
router.get('/allCustomers',(req,res,next)=>{

  stripe.customers.list(
    { limit: req.body.limit },
    function(err, customers) {
      if(customers){
        res.json(customers)
      }
      if(err){
        res.json(err)
      }
    }
  );
})


//Retreive a customer
router.get('/getCustomer',(req,res,next)=>{

stripe.customers.retrieve(

  req.body.customer,

  function(err, customer) {
    if(customer){
      res.json(customer)
    }
    if(err){
      res.json(err)
    }
  }
);
})

//Delete a customer
router.post('/delCustomer',(req,res,next)=>{

console.log(req.body.theCust)

  stripe.customers.del(req.body.theCust,function(err, confirmation) {
    if(confirmation){
      Customers.findOneAndDelete({
        custid:confirmation.id
      }).then((mess)=>{
        res.json("Customer Deleted")
      }).catch((error)=>{
        res.json(error)
    })
    if(err){
      res.json(err)
    }
    }
})
})

//Update a customer

router.post('/createInvoice',(req,res,next)=>{
stripe.invoices.create({
  customer: req.body.customer //needed form customer object
}, function(err, invoice) {
if(invoice){
  res.json(invoice)
}
if(err){
  res.json(err)
}
});
})



  






module.exports = router;
