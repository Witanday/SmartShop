const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const uuidv1= require("uuid/v1");

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
       unique:true,
    },
    password:{
        type:String,
       
        
    },
    
    about:{
        type:String,
        trim:true,
   
      
    },
    salt:String,
    role:{
        type:Number,
        default:0

    },
    history:{
        type:Array,
        default:[],
    },
    
},{timestamps:true}
);



module.exports= mongoose.model("User", userSchema)
