const express = require("express");
const router = express.Router();

const {signup, signin} = require("../controllers/user.js")
const {validate}= require("../validator")

router.post("/signup",validate('signup') ,signup);

router.post("/signin",signin);


module.exports = router;