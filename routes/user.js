const express = require("express");
const router = express.Router();

const {signup} = "../controllers/user.js"


router.post("/signup", signup);


module.exports = router;