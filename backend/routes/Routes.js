const express = require("express");
const { signUp, createEmployee, signIn,logOut } = require("../controller/userController");
const router = express.Router();
const upload = require('../controller/multerConfig');


router.post("/register", signUp);
router.post('/createEmployee', upload.single('f_Image'), createEmployee);
router.post("/login",signIn)
router.get("/logOut", logOut)

module.exports = router;
