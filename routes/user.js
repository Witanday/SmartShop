const express = require("express");
const router = express.Router();

const {signup} = "../controllers/user.js"


router.signup("/signup", signup);


module.exports = router;