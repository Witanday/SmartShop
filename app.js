require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT= process.env.PORT ||8080;
//Import ROUTES

const userRoutes= require("./routes/user");



//DB
mongoose.connect(process.env.DB).then(()=>console.log("DB CONNECTED!!!"),
{
    useNewUrlParser:true
}).catch(err=>{console.log(err)})



//ROUTES middleware


app.use("/api",userRoutes);



app.listen(PORT, ()=>{
    console.log(`Server is up and running on Port ${PORT}`)
})
