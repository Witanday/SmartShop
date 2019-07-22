const express = require("express");
const router = express.Router();

const {signup, signin, signout} = require("../controllers/user.js")
const {validate}= require("../validator")

router.post("/signup",validate('signup') ,signup);

router.post("/signin",validate('signin'), signin);

router.post("/signout", signout);


module.exports = router;