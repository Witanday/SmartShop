const User= require("../models/user");
const bcrypt = require('bcryptjs');
const {errorHandler}= require("../helpers/dbErrorHandler")




exports.signup= async(req,res)=>{
    let {password, email, name}=  req.body
    const { validationResult } = require('express-validator/check');
   try{  
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;}
    password = await bcrypt.hashSync(password, 8);
    const user= new User({ email, password, name})
    user.save((error,user)=>{
        if(error){
            return res.status(400).json({error :errorHandler(error)})
        }
            return res.json("User successfully created")
        
    })
    
   }catch(err){
    console.log(err)
   }
   
  
}