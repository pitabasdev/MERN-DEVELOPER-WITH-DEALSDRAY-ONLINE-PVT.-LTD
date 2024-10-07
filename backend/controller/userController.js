const { model } = require("mongoose");
const User = require("../model/User");
const Employee = require("../model/Employee");
const upload = require("./multerConfig");

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ error: { message: "User already exists." } });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(200).json({ message: "Registration Successful" });
    console.log(newUser);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: { message: "Internal Server Error" } });
  }
};

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
};
