const express = require("express");
const router = express.Router();

const {sayHi} = "../controllers/user.js"


router.get("/", sayHi);


module.exports = router;