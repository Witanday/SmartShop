const User= require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check



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

exports.signin= async (req,res)=>{
    //find the user based on email
    const {email,password}= req.body
    try{
        User.findOne({email},(err,user)=>{
            if(err || !user){
                return res.status(400).json({
                    err:"User with that email does not exist. Please signup"
                });
            

            }
            //if user is found make sure the email and password match
            // create authenticate method in user model
           // console.log(user.password)
            const match= bcrypt.compareSync(password,user.password)
            if(match){

          
            //generate a signed token with user id and secret
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign({_id:user._id}, secret);

            //persist the token as 't' in cookie with expiry date

            res.cookie('t', token, {expire:new Date() + 2000})

            // return response with user and token to frontend client
            const {_id,name,email,role}= user
            return res.json({token,user:{_id,name,email,role}})
            }
            return res.status(401).json({error:"Invalid Password"})
        })
    }catch(err){
        console.log(err)
    }

    
}

