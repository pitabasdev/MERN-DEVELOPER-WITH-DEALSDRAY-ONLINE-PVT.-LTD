const { model } = require("mongoose");
const User = require("../model/User");
const Employee = require("../model/Employee");
const upload = require("./multerConfig");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res
        .status(400)
        .json({ error: { message: "User already exists." } });
    }
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(200).json({ message: "Registration Successful" });
    console.log(newUser);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: { message: "Internal Server Error" } });
  }
};
const signIn = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      
      if (!user) {
        return res.status(400).json({ error: { message: "Invalid username or password." } });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: { message: "Invalid username or password." } });
      }
      const tokenExist = req.cookies.token;
      if (tokenExist) {
        return res.status(400).json({ message: "You are already logged in" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      console.log(token)
      res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); 
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: { message: "Internal Server Error" } });
    }
  };
  const logOut = async (req, resp) => {
    try {
        const tokenExist = req.cookies.token;
        if (!tokenExist) {
            return resp.status(400).json({ message: "Login Required" })
        }
        resp.clearCookie("token");
        resp.status(200).json({ message: "Logout Successfully" });
    } catch (error) {
        resp.status(500).json({ error: error })
    }
}

const createEmployee = async (req, res) => {
  try {
    const {
      f_Id,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
    } = req.body;

    let f_Image = null;
    if (req.file) {
      f_Image = req.file.path;
    }

    const newEmployee = new Employee({
      f_Id,
      f_Image,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Createdate: new Date(),
    });
    await newEmployee.save();
    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating employee",
      error: error.message,
    });
  }
};

module.exports = {
  signUp,
  createEmployee,
  signIn,
  logOut
};
