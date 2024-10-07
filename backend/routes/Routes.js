const express = require("express");
const { signUp, createEmployee } = require("../controller/userController");
const router = express.Router();
const upload = require('../controller/multerConfig');


router.post("/register", signUp);
router.post('/createEmployee', upload.single('f_Image'), createEmployee);

module.exports = router;
