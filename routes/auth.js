const express = require("express");
const router = express.Router();

const {signup, signin, signout, requireSignin} = require("../controllers/auth")
const {validate}= require("../validator")

router.post("/signup",validate('signup') ,signup);

router.post("/signin",validate('signin'), signin);

router.get("/signout", signout);
router.get("/welcome", requireSignin, (req,res)=>{
    res.send("hello there")
});


module.exports = router;