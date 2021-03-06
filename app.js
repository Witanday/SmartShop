require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser= require("cookie-parser");
const expressValidator= require("express-validator");
const PORT= process.env.PORT ||8080;

//Import ROUTES

const authRoutes= require("./routes/auth");
const userRoutes= require("./routes/user");
const categoryRoutes= require("./routes/category");
const productRoutes= require("./routes/product");

//DB
mongoose.connect(process.env.DB).then(()=>console.log("DB CONNECTED!!!"),
{
    useNewUrlParser:true
}).catch(err=>{console.log(err)})


//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());


//ROUTES middleware
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);



app.listen(PORT, ()=>{
    console.log(`Server is up and running on Port ${PORT}`)
})
