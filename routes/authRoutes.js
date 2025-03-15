const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


// task 6

router.post("/register", authController.registerUser);


//task 7

router.post("/login", authController.loginUser);



module.exports = router;
