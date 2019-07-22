const express = require("express");
const router = express.Router();

const {signup} = require("../controllers/user.js")
const {validate}= require("../validator")

router.post("/signup",validate('signup') ,signup);


module.exports = router;